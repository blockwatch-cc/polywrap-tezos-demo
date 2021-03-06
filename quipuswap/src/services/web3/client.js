import { Web3ApiClient } from "@web3api/client-js";
import { tezosPlugin } from "@blockwatch-cc/tezos-plugin-js";

export const TEZOS_QUIPUSWAP_WRAPPER_URI =
  "w3://ipfs/QmfXgYfxG7Uw7RCGLsAYFCuPcr7xqRePhTgMJVCdGiRMcZ";
export const TEZOS_PLUGIN_JS = "w3://ens/tezos.web3api.eth";

export const client = new Web3ApiClient({
  plugins: [
    {
      uri: TEZOS_PLUGIN_JS,
      plugin: tezosPlugin({
        networks: {
          mainnet: {
            provider: "https://rpc.tzstats.com",
          },
          hangzhounet: {
            provider: "https://rpc.hangzhou.tzstats.com",
          },
          ithacanet: {
            provider: "https://rpc.ithaca.tzstats.com",
          },
        },
        defaultNetwork: "ithacanet",
      }),
    },
  ],
});
