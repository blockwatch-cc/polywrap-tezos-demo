import { toast } from "react-toastify";

export const assertWalletConnected = (account) => {
  let isConnected = false
  if (!!account) {
    isConnected = account.pkh && account.balance
  }
  if (!isConnected) {
    toast.info('Connect Wallet')
  }
  
  return isConnected
} 

export const generateNonce = () => {
  const MAX_32_BIT_INTEGER = 2147483648;
  return Math.floor(Math.random() * MAX_32_BIT_INTEGER)
}

export const getDomainWithoutTLD = (domain) => {
  const names = domain.split('.')
  if (names.length === 0) {
    return ''
  }
  return names[0]
}

export const getTezValue = (mu) => (mu * Math.pow(10, -6));