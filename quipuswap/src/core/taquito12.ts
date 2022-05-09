
// import {
//     TezosToolkit
// } from "@taquito/taquito";

import {
    TezosToolkit
} from "taquito-taquito-newest";

import {
    getNetwork
} from "./state";

const Tezos = new TezosToolkit(getNetwork().rpcBaseURL)


export const Tezos12 = new TezosToolkit(getNetwork().rpcBaseURL)

export async function getBalanceExample(assetID, accountPkh) {
    const response = await Tezos.contract
    .at(assetID)
    .then((contract) => {
        return contract.views.getBalance(accountPkh).read();
    })
    .then((response) => {
        return response;
    })
    .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));

    console.log(response);
    return response;
}