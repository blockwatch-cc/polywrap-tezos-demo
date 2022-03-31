import BigNumber from "bignumber.js";
import { tzToMutez, mutezToTz } from "./helpers";
import { QSAsset } from "./types";
import {
  getStorage
} from "@/core";

const PENNY = 0.000001;

export function estimateToken2Token(
  pool: any,
  inputToken: QSAsset,
  outputToken: QSAsset,
  amount: BigNumber.Value
) {
  if (!amount) return new BigNumber(0);

  console.info(pool, inputToken, outputToken, amount);

  const tezInWithFee = toNat(amount, inputToken).times(997);
  const numerator = tezInWithFee.times(pool.token_b_pool);
  const denominator = new BigNumber(pool.token_a_pool)
    .times(1000)
    .plus(tezInWithFee);
  const tokensOut = numerator.idiv(denominator);

  return fromNat(tokensOut, outputToken);
}

export function estimateToken2Token2(
  poolTokenA: any,
  poolTokenB: any,
  inputToken: QSAsset,
  outputToken: QSAsset,
  amount: BigNumber.Value
) {
  if (!amount) return new BigNumber(0);

  console.info(poolTokenA, poolTokenB, inputToken, outputToken, amount);

  const tezInWithFee = toNat(amount, inputToken).times(997);
  const numerator = tezInWithFee.times(poolTokenA);
  const denominator = new BigNumber(poolTokenB)
    .times(1000)
    .plus(tezInWithFee);
  const tokensOut = numerator.idiv(denominator);

  return fromNat(tokensOut, outputToken);
}

export function estimateTezToToken(
  tezAmount: any,
  dexStorage: any,
  token: QSAsset
) {
  if (!tezAmount) return new BigNumber(0);

  const mutezAmount = tzToMutez(tezAmount);

  const tezInWithFee = mutezAmount.times(997);
  const numerator = tezInWithFee.times(dexStorage.tokenPool);
  const denominator = new BigNumber(dexStorage.tezPool)
    .times(1000)
    .plus(tezInWithFee);
  const tokensOut = numerator.idiv(denominator);

  return fromNat(tokensOut, token);
}

export function estimateTokenToTez(
  tokenAmount: any,
  dexStorage: any,
  token: QSAsset
) {
  if (!tokenAmount) return new BigNumber(0);

  const tokensIn = toNat(tokenAmount, token);

  const tokenInWithFee = tokensIn.times(997);
  const numerator = tokenInWithFee.times(dexStorage.tezPool);
  const denominator = new BigNumber(dexStorage.tokenPool)
    .times(1000)
    .plus(tokenInWithFee);
  const mutezOut = numerator.idiv(denominator);

  return mutezToTz(mutezOut);
}

export function estimateTezToTokenInverse(
  tokenAmount: any,
  dexStorage: any,
  token: QSAsset
) {
  if (!tokenAmount) return new BigNumber(0);

  const tokensOut = toNat(tokenAmount, token);

  const numerator = new BigNumber(dexStorage.tezPool)
    .times(1000)
    .times(tokensOut);
  const denominator = new BigNumber(dexStorage.tokenPool)
    .minus(tokensOut)
    .times(997);
  const mutezIn = numerator.idiv(denominator).plus(1);

  return mutezToTz(mutezIn);
}

export function estimateTokenToTezInverse(
  tezAmount: any,
  dexStorage: any,
  token: QSAsset
) {
  if (!tezAmount) return new BigNumber(0);

  const mutezOut = tzToMutez(tezAmount);

  const numerator = new BigNumber(dexStorage.tokenPool)
    .times(1000)
    .times(mutezOut);
  const denominator = new BigNumber(dexStorage.tezPool)
    .minus(mutezOut)
    .times(997);
  const tokensIn = numerator.idiv(denominator).plus(1);

  return fromNat(tokensIn, token);
}

export function estimateShares(tezAmount: any, dexStorage: any) {
  if (!tezAmount) return new BigNumber(0);

  return tzToMutez(tezAmount)
    .integerValue(BigNumber.ROUND_DOWN)
    .times(dexStorage.totalSupply)
    .div(dexStorage.tezPool)
    .integerValue(BigNumber.ROUND_DOWN);
}

export function estimateSharesInverse(
  tokenAmount: any,
  dexStorage: any,
  token: QSAsset
) {
  if (!tokenAmount) return new BigNumber(0);

  return toNat(tokenAmount, token)
    .integerValue(BigNumber.ROUND_DOWN)
    .times(dexStorage.totalSupply)
    .div(dexStorage.tokenPool)
    .integerValue(BigNumber.ROUND_DOWN);
}

export function estimateInTezos(shares: any, dexStorage: any) {
  if (!shares) return new BigNumber(0);

  return mutezToTz(
    new BigNumber(shares)
      .times(dexStorage.tezPool)
      .div(dexStorage.totalSupply)
      .integerValue(BigNumber.ROUND_DOWN)
  );
}

export function estimateInTokens(shares: any, dexStorage: any, token: QSAsset) {
  if (!shares) return new BigNumber(0);

  let nat = new BigNumber(shares)
    .times(dexStorage.tokenPool)
    .div(dexStorage.totalSupply)
    .integerValue(BigNumber.ROUND_DOWN);

  if (
    new BigNumber(shares)
      .times(dexStorage.tokenPool)
      .isGreaterThan(nat.times(dexStorage.totalSupply))
  ) {
    nat = nat.plus(1);
  }

  return fromNat(nat, token);
}

export function estimateToTezos(
  tokenAmount: any,
  dexStorage: any,
  token: QSAsset
) {
  if (!tokenAmount) return new BigNumber(0);

  const shares = estimateSharesInverse(tokenAmount, dexStorage, token);
  let tezAmount = estimateInTezos(shares, dexStorage);

  while (!toTokens(tezAmount, dexStorage, token).isEqualTo(tokenAmount)) {
    tezAmount = tezAmount.plus(PENNY);
  }
  return tezAmount;
}

export function fromNat(amount: any, token: QSAsset) {
  return new BigNumber(amount).div(10 ** token.decimals);
}

export function toNat(amount: any, token: QSAsset) {
  return new BigNumber(amount)
    .times(10 ** token.decimals)
    .integerValue(BigNumber.ROUND_DOWN);
}

function toTokens(tezAmount: any, dexStorage: any, token: QSAsset) {
  const shares = estimateShares(tezAmount, dexStorage);
  return estimateInTokens(shares, dexStorage, token);
}


export async function sharesTokenAinTokenBin(
  pairId: any,
  tokenAmount: any,
  selTk_A: any,
  sharesToRemove: any
) {

  var pairStorage = await getStorage('KT1Ni6JpXqGyZKXhJCPQJZ9x5x5bd7tXPNPC');
  var pairStorageLQ = await pairStorage.storage.pairs.get(pairId);
  
  const token_a_pool = pairStorageLQ.token_a_pool.toNumber();
  const token_b_pool = pairStorageLQ.token_b_pool.toNumber();
  const total_supply = pairStorageLQ.total_supply.toNumber();
  
  var lpShares: any = null;
  var lpShares_not_rounded: any = null;
  
  if(sharesToRemove == undefined){
    const amountTknA = parseFloat(tokenAmount);
    lpShares_not_rounded = ((total_supply * amountTknA) / token_a_pool) * Math.pow(10, selTk_A.decimals);
    lpShares = Math.round(lpShares_not_rounded);
  }else{
    console.log("remove token");
    lpShares = sharesToRemove;
    lpShares_not_rounded = sharesToRemove;
  }
  

  var lpRatio = lpShares_not_rounded/total_supply;
  

  const token_a_in = Math.ceil(token_a_pool * lpRatio);
  const token_b_in = Math.ceil(token_b_pool * lpRatio);

  return {
    lpShares: lpShares,
    token_a_in: token_a_in,
    token_b_in: token_b_in
  }

}


export async function minTokenOut(
  tokenAmount: any,
  selTk: any,
  slippage
) {

  const amountTkn = parseFloat(tokenAmount);
  const minAmount =  amountTkn - (amountTkn * slippage.toNumber());
  
  // console.log("amountTkn //////  ");
  // console.log(amountTkn);
  // console.log(slippage.toNumber());
  // console.log(amountTkn * slippage.toNumber());
  // console.log(minAmount);


  return minAmount * Math.pow(10, selTk.decimals);

}


export async function lpDetails(
  pairId: any
) {

  var pairStorage = await getStorage('KT1Ni6JpXqGyZKXhJCPQJZ9x5x5bd7tXPNPC');
  var pairStorageLQ = await pairStorage.storage.pairs.get(pairId);
  
  const token_a_pool = pairStorageLQ.token_a_pool.toNumber();
  const token_b_pool = pairStorageLQ.token_b_pool.toNumber();
  const total_supply = pairStorageLQ.total_supply.toNumber();

  return {
    token_a_pool: token_a_pool,
    token_b_pool: token_b_pool,
    total_supply: total_supply
  }
}