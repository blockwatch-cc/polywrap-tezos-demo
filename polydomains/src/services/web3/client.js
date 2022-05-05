import { Web3ApiClient } from "@web3api/client-js"
import { tezosDomainsPlugin } from "@blockwatch-cc/tezos-domains-plugin-js"
import { tezosPlugin } from "@blockwatch-cc/tezos-plugin-js"

export const TEZOS_PLUGIN_JS = 'w3://ens/tezos.web3api.eth'
export const TEZOS_DOMAINS_WRAPPER_URI = 'w3://ipfs/QmeYu6r6L9YPn3EhPzSqgyCEWPU4KvnwLCWTMPjvGYid7k'
export const TEZOS_DOMAINS_PLUGIN_JS = 'w3://ens/tezosDomainsPlugin.web3api.eth'


export const TezosConnections = {
  ithacanet: {
    provider: "https://rpc.ithaca.tzstats.com",
    supportedTLDs: ['ith']
  },
  hangzhounet: {
    provider: "https://rpc.hangzhou.tzstats.com",
    supportedTLDs: ['han']
  },
  mainnet: {
    provider: "https://rpc.tzstats.com",
    supportedTLDs: ['tez']
  },
}

export const client = new Web3ApiClient({
  plugins: [
    {
      uri: TEZOS_PLUGIN_JS,
      plugin: tezosPlugin({
        networks: {
          mainnet: {
              provider: "https://rpc.tzstats.com"
          },  
          hangzhounet: {
              provider: "https://rpc.hangzhou.tzstats.com",
          },
          ithacanet: {
              provider: "https://rpc.ithaca.tzstats.com",
          }
        },
        defaultNetwork: "ithacanet"
      })
    },
    {
      uri: TEZOS_DOMAINS_PLUGIN_JS,
      plugin: tezosDomainsPlugin({
          defaultNetwork: "ithacanet"
      })
    }
  ]
})