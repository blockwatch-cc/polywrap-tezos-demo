import { client } from './client'
import { TEZOS_DOMAINS_PLUGIN_JS } from './client'


export const getAcquisitionInfo = async (network, domain, days=365) => {
    
    
    return client.query({
        uri: TEZOS_DOMAINS_PLUGIN_JS,
        query: `
            query {
                getAcquisitionInfo(
                    network: $network, 
                    domain: $domain 
                    duration: $days 
                )
            },
        `,
        variables: {
            network,
            domain,
            days
        }
    })
    
}