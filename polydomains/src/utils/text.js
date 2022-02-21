export const shortenAddress = (address) => {
    return address.substring(0,4) + "..." + address.substring(address.length-3)
}

export const extractErrorMessage = (errors, defaultMessage) => {
    let message
    if(errors.length > 0 && errors[0]) {
        const matches = errors[0].message.match(/(?<=exception: ).*/) 
        if (!!matches && matches.length > 0) {
            message = matches[0]
        }
    }
    if(!message && defaultMessage) {
        message = defaultMessage
    }
    if(!message) {
        message = 'failed to get information'
    }
    return message
}

export const getTLD = (domain) => {
    const domainSplit = domain.split('.')
    const domainLen =  domainSplit.length
    return domainSplit[domainLen-1]
}