import { client } from './client'
import { TEZOS_QUIPUSWAP_WRAPPER_URI } from './client'


export const listTokenPairs = async (network) => {
    
    return client.query({
        uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
        query: `
            query {
              listTokenPairs(
                network: ithacanet
              )
            }
        `,
        variables: {
            network,
        }
    })
    
}

export const getTokenSupply = async (network, pairId) => {
    
  return client.query({
      uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
      query: `
          query {
            getTokenSupply(
              pairId: $pairId,
              network: ithacanet
            )
          }
      `,
      variables: {
        pairId: pairId
      }
  })
  
}