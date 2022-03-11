import { client, TEZOS_PLUGIN_JS, TEZOS_QUIPUSWAP_WRAPPER_URI } from "./client"
import add from "date-fns/add"

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

export const addOperator = (network, payload) => {

  return client.query({
    uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
    query: `
        mutation {
          addOperator (
              network: hangzhounet,
              params: $params
          )
        },
    `,
    variables: {
      params: {
        owner: "tz1ZuBvvtrS9JroGs5e4B3qg2PLntxhj1h8Z",
        tokenId: 0,
        operator: "KT1Ni6JpXqGyZKXhJCPQJZ9x5x5bd7tXPNPC"
      }
    }
  })

}


export const swapDirect = (network, payload) => {

  return client.query({
    uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
    query: `
        mutation {
          swapDirect(
            network: hangzhounet,
            params: $params,
            sendParams: $sendParams
          )
        },
    `,
    variables: {
      params: {
        pairId: 14,
        direction: `b_to_a`,
        swapParams: {
          amountIn: "1",
          minAmountOut: "26288",
          deadline: add(new Date(), { minutes: 10 }).toISOString(),
          receiver:  "tz1ZuBvvtrS9JroGs5e4B3qg2PLntxhj1h8Z"
        }
      },
      sendParams: {
        to: "",
        amount: 0,
        mutez: true
      }
    }
  })
  
}


export const removeOperator = (network, payload) => {

  return client.query({
    uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
    query: `
        mutation {
          removeOperator (
              network: hangzhounet,
              params: $params
          )
        },
    `,
    variables: {
        network,
        params: {
          owner: "tz1ZuBvvtrS9JroGs5e4B3qg2PLntxhj1h8Z",
          tokenId: 0,
          operator: "KT1Ni6JpXqGyZKXhJCPQJZ9x5x5bd7tXPNPC"
        }
    }
  })
  
}

export const batchContractCalls = (payload) => {

  return client.query({
    uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
    query: `
        mutation {
          batchContractCalls (
            params: $params
          )
        },
    `,
    variables: {
      params: [addQuipuResponse.data?.addOperator, swapResponse.data?.swapDirect, removeQuipuResponse.data?.removeOperator]
    }
  })
  
}