# Quipuswap

[Quipuswap](https://quipuswap.com/) is a decentralised exchange on the Tezos blockchain. 

## Project Setup

#### Install dependencies

```bash
yarn install
```

#### Start Application
```
yarn start
```
NB: For node v17+ due to upgrade of [openssl to v3.0.0](https://github.com/nodejs/node/releases/tag/v17.7.2). To start application run

```bash
NODE_OPTIONS=--openssl-legacy-provider yarn start
```