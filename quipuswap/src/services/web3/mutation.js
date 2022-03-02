import { client, TEZOS_PLUGIN_JS } from "./client"

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
          network
        }
    }
  })
}
