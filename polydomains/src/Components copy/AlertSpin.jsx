import {
    Flex,
    Box,
    Alert,
    AlertIcon,
    CircularProgress
} from '@chakra-ui/react'


export const AlertSpin = ({ type, message, spin }) => {

    return (
        <Flex justifyContent="space-between" mt="3" >
            <Box style={{margin: "0 auto"}}>
                {type === 'error' &&
                    <Alert borderRadius="md" status='error' >
                        {spin ?
                            <CircularProgress size="5" isIndeterminate color='red.300' mr="3" />
                        :
                            <AlertIcon />
                        }
                        {message}
                    </Alert>
                }
                {type === 'success' &&
                    <Alert borderRadius="md" status='success' >
                        {spin ?
                            <CircularProgress size="5" isIndeterminate color='green.300' mr="3" />
                        :
                            <AlertIcon />
                        }
                        {message}
                    </Alert>
                }
                {type === 'warning' &&
                    <Alert borderRadius="md" status='warning'>
                        {spin ?
                            <CircularProgress size="5" isIndeterminate color='yellow.300' mr="3" />
                        :
                            <AlertIcon />
                        }
                        {message}
                    </Alert>
                }
                {type === 'info' &&
                    <Alert borderRadius="md" status='info'>
                        {spin ?
                            <CircularProgress size="5" isIndeterminate color='blue.300' mr="3" />
                        :
                            <AlertIcon />
                        }
                        {message}
                    </Alert>
                }
            </Box>
        </Flex>
    )
}