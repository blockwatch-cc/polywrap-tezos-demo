import { client } from './client'

const HARBINGER_URI = 'w3://ipfs/QmPWL3GnEDCA32Ui6ufiZyXbyNeUbveewAsJ9z2BgEUFRu'

export const getAssetData = async (assetCode, network) => {
    return await client.query({
            uri: HARBINGER_URI,
            query: `
                query {
                    getAssetData(
                        network: $network,
                        assetCode: $assetCode,
                        providerAddress: "KT1Jr5t9UvGiqkvvsuUbPJHaYx24NzdUwNW9"
                    )
                }`,
            variables: {
                assetCode,
                network
            }
    });
}