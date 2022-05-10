import { createContext } from "react"

export const WalletContext = createContext({
    app: {
        network: 'ithacanet',
        account: null
    },
    setApp: () => {}
})