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
      params: payload
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
      params: payload.params,
      sendParams: payload.sendParams
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
        params: payload
    }
  })
  
}


export const transfer = (network, payload) => {

  return client.query({
    uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
    query: `
      mutation {
        transfer(
          network: hangzhounet,
          params: $params,
          sendParams: $sendParams
        )
      }
    `,
    variables: {
      params: payload.params,
      sendParams: payload.sendParams
    }
  })
  
}


export const transferFrom = (network, payload) => {

  return client.query({
    uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
    query: `
      mutation {
        transferFrom(
          network: hangzhounet,
          from: $from,
          params: $params,
          sendParams: $sendParams
        )
      }
    `,
    variables: {
      from: payload.from,
      params: payload.params,
      sendParams: payload.sendParams
    }
  })
  
}

export const invest = (network, payload) => {

  return client.query({
    uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
    query: `
      mutation {
        invest(
          network: hangzhounet,
          params: $params,
          sendParams: $sendParams
        )
      }
    `,
    variables: {
      params: payload.params,
      sendParams: payload.sendParams    
    }
  })
  
}

export const divest = (network, payload) => {

  return client.query({
    uri: TEZOS_QUIPUSWAP_WRAPPER_URI,
    query: `
      mutation {
        divest(
          network: hangzhounet,
          params: $params,
          sendParams: $sendParams
        )
      }
    `,
    variables: {
      params: payload.params,
      sendParams: payload.sendParams
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