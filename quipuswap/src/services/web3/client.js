import { Web3ApiClient } from "@web3api/client-js"
import { tezosPlugin } from "@web3api/tezos-plugin-js"


// export const TEZOS_QUIPUSWAP_WRAPPER_URI = 'w3://ipfs/QmSySUvrC6At5GcZN8yJwPAKAcfzhLq5T33Qu6rWLKw3eG'
export const TEZOS_QUIPUSWAP_WRAPPER_URI = 'w3://ipfs/QmYSJ3dHJuNWygFtBThKHNB7Na1mSq7uSCLYE4991CQkZY'
export const TEZOS_PLUGIN_JS = 'w3://ens/tezos.web3api.eth'

export const TezosConnections = {
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
          }
        },
        defaultNetwork: "hangzhounet"
      })
    }
  ]
})