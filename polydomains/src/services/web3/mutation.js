import { client, TEZOS_DOMAINS_WRAPPER_URI, TEZOS_PLUGIN_JS } from "./client"

export const connectTempleWallet = (network) => {
  return client.query({
    uri: TEZOS_PLUGIN_JS,
    query: `
        mutation {
          connectTempleWallet(
              appName: "polydomains", 
              network: $network,
              connection: $connection
          )
        },
    `,
    variables: {
        network,
        connection: {
          networkNameOrChainId: network
        }
    }
  })
}

export const commitDomain = (network, payload) => {
  const { commitParams } = payload
  return client.query({
    uri: TEZOS_DOMAINS_WRAPPER_URI,
    query: `
        mutation {
          commit (
              network: $network,
              params: $params
          )
        },
    `,
    variables: {
        network,
        params: commitParams
    }
  })
}

export const buyDomain = (network, payload) => {
  const { buyParams, sendParams } = payload
  return client.query({
    uri: TEZOS_DOMAINS_WRAPPER_URI,
    query: `
        mutation {
          buy (
            network: $network,
            params: $params,
            sendParams: $sendParams
          )
        },
    `,
    variables: {
        network,
        params: {
          label: buyParams.label,
          owner: buyParams.owner,
          address: buyParams.owner,
          nonce: buyParams.nonce,
          duration: buyParams.duration,
          data: JSON.stringify(buyParams.metadata)
        },
        sendParams: sendParams
    }
  })
}