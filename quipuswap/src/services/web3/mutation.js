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
              network: ithacanet,
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
            network: ithacanet,
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
              network: ithacanet,
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
          network: ithacanet,
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
          network: ithacanet,
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
          network: ithacanet,
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
          network: ithacanet,
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
    uri: TEZOS_PLUGIN_JS,
    query: `
        mutation {
          batchWalletContractCalls (
            params: $params
          )
        },
    `,
    variables: {
      params: payload
    }
  })
  
}