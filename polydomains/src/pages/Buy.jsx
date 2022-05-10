import {
  Grid,
  Box, 
  Heading,
  Button,
  Text,
  Flex,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Input
} from '@chakra-ui/react'
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { Header } from "../components/Header";
import { AlertSpin } from "../components/AlertSpin";
import { WalletContext } from '../context/wallet';
import { extractErrorMessage } from '../utils/text';
import { buyDomain, commitDomain } from '../services/web3/mutation';
import { assertWalletConnected, generateNonce, getDomainWithoutTLD } from '../utils/helpers';
import { TEZOS_PLUGIN_JS, client } from '../services/web3/client';

import { getTezValue } from '../utils/helpers';
import { TezSign } from '../components/TezSign';
import { CalendarIcon } from "@chakra-ui/icons";
import { getAcquisitionInfo } from "../services/web3/query"
import { EditIcon, CheckIcon, PlusSquareIcon } from "@chakra-ui/icons";

function Buy() {
  const { name: domainName } = useParams()
  const [name, setName] = useState('')
  const [buystate, setBuystate] = useState('1')
  const [duration, setDuration] = useState({
    price: '1000000',
    years: '1',
    days: '365'
  })
  const [nonce, setNonce] = useState(0)
  const [alertstate, setAlertstate] = useState({
    show: false,
    type: '',
    message: '',
    spin: false
  })
  const { app } = useContext(WalletContext)

  const handleSetDuration = (e) => {
    let years = e.target.value;
    let days = 365 * parseInt(years);
    setDuration({
      price: duration.price,
      years: years,
      days: days.toString() 
    });
    getPriceOnDurationChange(years, days);
  }
  
  const getPriceOnDurationChange = async (years, days) => {
    setAlertstate({
      show: true,
      type: 'info',
      message: 'Getting price for ' + years + ' years',
      spin: true
    })
    const response = await getAcquisitionInfo(app.network, domainName, days);
    if (response.errors) {
        const message = extractErrorMessage(response.errors, 'failed to get domain avaialable. Please try again.')
        toast.error(message)
        setAlertstate({
          show: true,
          type: 'error',
          message: message,
          spin: false
        })
        return
    }
    if(response.data.getAcquisitionInfo?.state) {
      setDuration({
        price: response.data.getAcquisitionInfo?.cost.toString() ,
        years: years,
        days: days.toString() 
      });
      setAlertstate({
        show: false,
        type: '',
        message: '',
        spin: false
      });
    }
  }

  const changeBuyState = async (state) => {
    setBuystate(state);
  }

  const requestBuy = async () => {
    
    if (!assertWalletConnected(app.account)) {
      return
    }
    const newNonce = generateNonce() 
    setNonce(newNonce)
    setAlertstate({
      show: true,
      type: 'info',
      message: 'Confirm the operation in your wallet to proceed.',
      spin: true
    })
    const commitResponse = await commitDomain(app.network, { 
      commitParams: {
        label: name,
        owner: app.account.pkh,
        nonce: newNonce
      }
    })
    if (commitResponse.errors) {
      const message = extractErrorMessage(commitResponse.errors, 'Failed to commit domain. Please try again.')
      toast.error(message)
      setAlertstate({
        show: true,
        type: 'error',
        message: message,
        spin: false
      })
      return
    }
    setAlertstate({
      show: true,
      type: 'info',
      message: 'Waiting for the operation to be included on the blockchain...',
      spin: true
    })
    const getSubscription = client.subscribe({
      uri: TEZOS_PLUGIN_JS,
      query: `
        query {
          getOperationStatus (
            hash: $hash
            network: $network
          )
        }
      `,
      variables: {
        hash: commitResponse.data?.commit,
        network: app.network
      },
      frequency: { ms: 6000 },
    });
    for await (let query of getSubscription) {
      if (query.errors) {
        continue
      }
      const operationStatus = query.data?.getOperationStatus;
      if (operationStatus !== undefined) {
        if (operationStatus.confirmations > 3) {
          break
        }
      }
    }
    setAlertstate({
      show: true,
      type: 'success',
      message: 'Done registering the domain',
      spin: false
    })

    setTimeout(
      function() {
        setAlertstate({
          show: false,
          type: '',
          message: '',
          spin: false
        });
        changeBuyState('2');
      }
      .bind(this),
      2000
    );
  }

  const registerDomainName = async (activeNonce) => {
    if (!assertWalletConnected(app.account)) {
      return
    }
    setAlertstate({
      show: true,
      type: 'info',
      message: 'Waiting for the buy operation to complete...',
      spin: true
    })
    const response = await buyDomain(app.network, { 
      buyParams: {
        label: name,
        owner: app.account.pkh,
        duration: parseInt(duration.days),
        metadata: {
          isMichelsonMap: true,
          values: []
        },
        nonce: activeNonce
      },
      sendParams: {
        amount: getTezValue(parseInt(duration.price))
      }
    })
    if (response.errors) {
      const message = extractErrorMessage(response.errors, 'Failed to buy domain. Please try again.')
      toast.error(message)
      setAlertstate({
        show: true,
        type: 'error',
        message: message,
        spin: false
      })
      return
    }
    if (response.data.buy) {
      toast.success(`domain '${name}' bought`)
    }
    setAlertstate({
      show: true,
      type: 'success',
      message: 'Done registering the domain',
      spin: false
    })
    setTimeout(
      function() {
        setAlertstate({
          show: false,
          type: '',
          message: '',
          spin: false
        });
        changeBuyState('3');
      }
      .bind(this),
      2000
    );
  }


  useEffect(() => {
    if (!name && domainName) {
      setName(getDomainWithoutTLD(domainName))
    }
  }, [])

  return (
    <Box minHeight="100vh" >
      <Header showSearch={true} />
      <Box d="block">
        <Box d="flex" mt="10" justifyContent="center">
          <Box d="flex" width="80vw" borderRadius="10">            
            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                <Box w='100%' p={8} d='flex' >
                  <Flex width="75vw" justifyContent="space-between">
                    <Box mr={2}>
                      <Heading letterSpacing="wide" size="2xl" textAlign="center">{domainName}</Heading>
                    </Box>
                    <Box mr={2}>
                      
                    </Box>
                  </Flex>
                </Box>
            </Grid>
          </Box>
        </Box>

        <Box d="flex"  justifyContent="center">
          <Box d="flex" width="80vw" borderRadius="10" boxShadow='xl'>            
            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                <Box w='100%' p={8} d='flex' >
                  <Flex width="75vw" justifyContent="space-between" direction="vertical">
                    <Box>
                      <Box d="flex" flexDirection="row">
                        <Heading letterSpacing="wide" size="md" textAlign="left">This domain is available! Register it now for {getTezValue(duration.price)}</Heading>
                        <TezSign />
                      </Box>
                      <Text bgClip="text" fontSize="md" mt="2" color="black">Complete the following steps to register your domain:</Text>
                      <Box>
                        <Heading letterSpacing="wide" size="sm" mt="10" textAlign="left"> 
                          <PlusSquareIcon color="teal" mr="2"/>
                          Request
                        </Heading>
                        {buystate === '1' &&
                          <Box align='center'>
                            { alertstate.show &&
                              <AlertSpin type={alertstate.type} message={alertstate.message} spin={alertstate.spin} />
                            }
                            <Text bgClip="text" fontSize="md" mt="5" color="black">First, we need to publish your intent to buy this domain. This protects your domain from being taken by an adversary. Click 'Request' and your wallet will open. You will then be asked to confirm the operation.</Text>
                            <Button 
                              colorScheme='teal' 
                              onClick={requestBuy} 
                              variant='solid' 
                              size='md' 
                              mt="5"
                              width="30vw" 
                              > Request
                            </Button>
                          </Box> }
                      </Box>
                      <Box>
                        <Heading letterSpacing="wide" size="sm" mt="10" textAlign="left" color= {buystate === '2' || buystate === '3'  ? ('teal'):('gray.300')}> 
                          <EditIcon mr="2"/>
                          Register
                        </Heading>
                        {buystate === '2' &&
                          <Box>
                            {alertstate.show &&
                              <AlertSpin type={alertstate.type} message={alertstate.message} spin={alertstate.spin} />
                            }
                            <Text bgClip="text" fontSize="md" mt="5" color="black">Select a registration period and click 'Register'. Your wallet will re-open so that you can confirm the operation. Once confirmed the domain is yours.</Text>
                            <Box border='1px' borderColor='gray.200' borderRadius="md" mt="5" p="2" textAlign="left">                
                              <Box d="flex" flexDirection="row">
                                <Heading letterSpacing="wide" size="md" textAlign="left"> Price : {getTezValue(duration.price)}</Heading>
                                <TezSign />
                              </Box>

                              <Box d="flex" flexDirection="row">
                                <Text bgClip="text" fontSize="md" mt="5" color="black">Domain points to: </Text>
                                <Heading letterSpacing="wide" size="sm" mt="6" ml="2" textAlign="left"> {app.account ? `${app.account.pkh}` : 'Connect Wallet'} </Heading>
                              </Box>
                              <Box d="flex" flexDirection="column">
                                <Text bgClip="text" fontSize="md" mt="5" color="black">Registration Period: </Text>
                                <InputGroup mt="2" mb="2" width="50%" height="50%">
                                  <InputLeftAddon bg="white">
                                    <CalendarIcon color="gray.300" />
                                  </InputLeftAddon>
                                  <Input 
                                    variant="outline" 
                                    colorScheme="whiteAlpha"  
                                    placeholder="Years" 
                                    type="number"
                                    onChange={handleSetDuration}
                                    value={duration.years}
                                    bg="white" 
                                    size="md" 
                                    mr={0}  
                                  />
                                  <InputRightAddon children='years' />
                                </InputGroup>
                              </Box>
                            </Box>
                            <Box w="100%" align='center'>
                              <Button 
                                colorScheme='teal' 
                                onClick={() => registerDomainName(nonce)} 
                                variant='solid' 
                                size='md' 
                                mt="5"
                                width="30vw" 
                                > Request
                              </Button>
                            </Box>
                          </Box>
                        }
                      </Box>

                      <Box>
                        <Heading letterSpacing="wide" size="sm" mt="10" textAlign="left" color={buystate === '3' ? ('teal'):('gray.300')} > 
                          <CheckIcon mr="2"/>
                          Done. It's yours!
                        </Heading>
                        {buystate === '3' &&
                          <Box align='center'>
                            <Text bgClip="text" fontSize="md" mt="5" color="black">Congratulations! Your domain was successfully registered.</Text>
                            <Link to={{
                                pathname: '/search',
                                search: `?domain=${domainName}`
                              }} >
                              <Button 
                                colorScheme='teal' 
                                variant='solid' 
                                size='md' 
                                mt="5"
                                width="30vw" 
                                > Manage Domain
                              </Button>
                            </Link>
                          </Box>
                        }
                      </Box>
                    </Box>      
                  </Flex>
                </Box>
            </Grid>
          </Box>
        </Box>


      </Box>
    </Box>
  );
}

export default Buy;
