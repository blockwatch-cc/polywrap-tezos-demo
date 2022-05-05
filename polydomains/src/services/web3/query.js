import { client } from './client'
import { TEZOS_DOMAINS_WRAPPER_URI, TEZOS_DOMAINS_PLUGIN_JS } from './client'

export const resolveDomainRecords = async (network, domain) => {
    return client.query({
        uri: TEZOS_DOMAINS_WRAPPER_URI,
        query: `
            query {
                resolveDomain(
                    network: $network, 
                    domain: $domain 
                )
            }
        `,
        variables: {
            network,
            domain
        }
    })
}

export const getAcquisitionInfo = async (network, domain, days = 365) => {
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