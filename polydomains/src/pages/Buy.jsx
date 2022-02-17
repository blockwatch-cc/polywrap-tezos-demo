import {
  List,
  ListItem,
  Grid,
  GridItem,
  Box, 
  Heading,
  Button,
} from '@chakra-ui/react'
import { toast } from "react-toastify"
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';

import { Header } from "../components/Header";
import { WalletContext } from '../context/wallet';
import { extractErrorMessage } from '../utils/text';
import { buyDomain, commitDomain } from '../services/web3/mutation';
import { assertWalletConnected, generateNonce, getDomainWithoutTLD } from '../utils/helpers';
import { TEZOS_PLUGIN_JS, client } from '../services/web3/client';

function Buy() {
  const { name: domainName } = useParams()
  const [name, setName] = useState('')
  const { app } = useContext(WalletContext)
  
  const buy = async () => {
    const nonce = generateNonce()
    if (!assertWalletConnected(app.account)) {
      return
    }
    const commitResponse = await commitDomain(app.network, { 
      commitParams: {
        label: name,
        owner: app.account.pkh,
        nonce
      }
    })
    if (commitResponse.errors) {
      const message = extractErrorMessage(commitResponse.errors, 'Failed to commit domain')
      toast.error(message)
      return
    }
    const getSubscription = client.subscribe({
      uri: TEZOS_PLUGIN_JS,
      query: `
        query {
          getOperationStatus (
            hash: $hash
            network: hangzhounet
          )
        }
      `,
      variables: {
        hash: commitResponse.data?.commit,
      },
      frequency: { ms: 6000 },
    });
    for await (let query of getSubscription) {
      if (query.errors) {
        continue
      }
      const operationStatus = query.data?.getOperationStatus;
      if (operationStatus !== undefined) {
        if (operationStatus.confirmations > 15) {
          break
        }
      }
    }
    const response = await buyDomain(app.network, { 
      buyParams: {
        label: name,
        owner: app.account.pkh,
        duration: 365,
        metadata: {
          isMichelsonMap: true,
          values: []
        },
        nonce
      },
      sendParams: {
        amount: 1
      }
    })
    if (response.errors) {
      const message = extractErrorMessage(response.errors, 'Failed to buy domain')
      toast.error(message)
      return
    }
    if (response.data.buy) {
      toast.success(`domain '${name}' bought`)
    }
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
          <Box d="flex" width="80vw" borderRadius="10" boxShadow='xl'>            
              <Grid>
                <GridItem rowSpan={2}>
                    <List spacing={3}>
                        <ListItem mt="5"   p="8" pb="10" >
                            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                <Box w='100%' h='10'>
                                    <Heading letterSpacing="wide" size="2xl" textAlign="center">{domainName}</Heading>
                                </Box>
                            </Grid>
                        </ListItem>
                    </List>
                </GridItem>
                <GridItem rowSpan={2} p={4}>
                  <Box pb={2}>
                    WRITE TEXT TALKING ABOUT THE IMPORTANCE OF MAKING A COMMITMENT
                  </Box> 
                  <Button 
                    colorScheme='teal' 
                    onClick={buy} 
                    variant='solid' 
                    size='md' 
                    ml={2}> Buy </Button>
                </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Buy;
