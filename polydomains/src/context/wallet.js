import { createContext } from "react"

export const WalletContext = createContext({
    app: {
        network: 'mainnet',
        account: null
    },
    setApp: () => {}
})