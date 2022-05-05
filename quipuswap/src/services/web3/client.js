import { Web3ApiClient } from "@web3api/client-js"
import { tezosPlugin } from "@blockwatch-cc/tezos-plugin-js"
import { ipfsPlugin } from "@web3api/ipfs-plugin-js"


export const TEZOS_QUIPUSWAP_WRAPPER_URI = 'w3://ipfs/QmQsnEa1dB92uWDYB4grpC9YC4x9BsHscmWXPKUU4Uor8z'
export const TEZOS_PLUGIN_JS = 'w3://ens/tezos.web3api.eth'

export const TezosConnections = {
  hangzhounet: {
    provider: "https://rpc.hangzhou.tzstats.com",
    supportedTLDs: ['han']
  },
  ithacanet: {
    provider: "https://rpc.ithaca.tzstats.com",
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
      uri: 'w3://ens/ipfs.web3api.eth',
      plugin: ipfsPlugin({
        provider: 'https://gateway.pinata.cloud'
      })
    }
  ]
})