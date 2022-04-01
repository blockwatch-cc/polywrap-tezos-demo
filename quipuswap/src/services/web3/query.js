import { client } from './client'
import { TEZOS_QUIPUSWAP_WRAPPER_URI } from './client'


export const listTokenPairs = async (network) => {
    
    return client.query({
        uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
        query: `
            query {
              listTokenPairs(
                network: hangzhounet
              )
            }
        `,
        variables: {
            network,
        }
    })
    
}