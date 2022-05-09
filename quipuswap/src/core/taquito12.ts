
import {
    TezosToolkit
} from "@taquito/taquito";

import {
    getNetwork
} from "./state";

const Tezos = new TezosToolkit(getNetwork().rpcBaseURL)


export const Tezos12 = new TezosToolkit(getNetwork().rpcBaseURL)

export async function getBalanceExample() {
    Tezos.contract
    .at('KT1BRxbKjhRabGSB6saqK6QrBenaSvFJSgHu')
    .then((contract) => {
        return contract.views.getBalance('tz1dUru8MXTpHoXLmcHQrs2iPWmDP1Y9rDEY').read();
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
}