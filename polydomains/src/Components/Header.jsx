import {
    Flex,
    Input, 
    Box, 
    Button, 
    InputGroup, 
    InputLeftAddon, 
    Heading,
    Stack,
    Select
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { ViewIcon, Search2Icon } from "@chakra-ui/icons";

import { WalletContext } from '../context/wallet';
import { TezosConnections } from "../services/web3/client"
import { connectTempleWallet } from '../services/web3/mutation'
import { extractErrorMessage } from '../utils/text';

export const Header = ({ showSearch }) => {
    const [domain, setDomain] = useState('')
    const { app, setApp } = useContext(WalletContext)
    const handleDomainInputChange = (e) => {
        setDomain(e.target.value)
    }

    const handleChangeNetwork = (e) => {
        setApp((a) => ({ ...a, network: e.target.value }))
    }

    const connectWallet = async () => {
        const response = await connectTempleWallet(app.network)
        if (response.errors) {
            const message = extractErrorMessage(response.errors, 'Failed to connect to temple wallet')
            toast.error(message)
            return
        }
        if (response.data.connectTempleWallet) {
            setApp((a) => ({ ...a, account: response.data.connectTempleWallet }))
            toast.success('Wallet connected')
            return
        }
        toast.error('Failed to connect to temple wallet')
    }

    return (
        <Flex justifyContent="space-between" mx={40}>
            <Box>
                <Link to={{
                    pathname: "/"
                }}>
                    <Heading letterSpacing="wide" size="1xl" pt="5" textAlign="center">PolyDomains</Heading>
                </Link>
            </Box>
            {showSearch ?
                <Box d="flex" mt="5">
                    <InputGroup>
                    <InputLeftAddon py="1rem" px="1rem" bg="white">
                        <Search2Icon color="gray.300" />
                    </InputLeftAddon>
                    <Input 
                        colorScheme="whiteAlpha"  
                        p="1rem" 
                        variant="outline" 
                        placeholder="Search for Tezos domain" 
                        bg="white" 
                        size="md"
                        onChange={handleDomainInputChange}
                        mr={0} 
                    />
                    </InputGroup>
                    <Link to={{ pathname: '/search', search: `?domain=${domain}` }}>
                        <Button p="1rem" colorScheme='teal' borderRadius={0}>Search</Button>
                    </Link>
                </Box> : null}
            <Box d="flex" mt={5}>
                <Stack spacing={3}>
                    <Select size='sm' value={app.network} onChange={handleChangeNetwork}>
                        {Object.keys(TezosConnections).map((network, idx) => (
                            <option value={network} key={`${network}-${idx}`}>{network}</option>
                        ))}
                    </Select>
                </Stack>
                <Box ml={4}>
                    <Button 
                        colorScheme='teal' 
                        size='sm' 
                        onClick={connectWallet} 
                        disabled={app.account} 
                        leftIcon={app.account ? <ViewIcon color="gray.300" /> : null}
                    >
                        {app.account ? `${app.account.pkh.substring(0, 4)}...${app.account.pkh.substring(app.account.pkh.length-4)}` : 'Connect Wallet'}
                    </Button>
                </Box>
            </Box>
        </Flex>
    )
}