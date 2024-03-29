<template>
  <div class="max-w-xl mx-auto">
    <NavTabs class="mb-6" />

    <Form :style="swapping && 'pointer-events:none'">
      <!-- :subLabelName="inputBalance ? 'Balance: ' : undefined" -->
      <!-- :subLabelValue="inputBalance || undefined" -->
      <FormField
        placeholder="0.0"
        label="Input"
        v-model="inputAmount"
        :subLabelName="inputBalance ? 'Balance: ' : undefined"
        :subLabelValue="inputBalance || undefined"
        :isLoading="inputLoading"
        @input="(e) => handleInputAmountChange(e.target.value)"
        @selectToken="handleInputSelect"
        :selectedToken="inputToken"
      />

      <FormIcon :style="'padding-top: 0.25rem; padding-bottom: 0.25rem;'">
        <button
          class="p-2 transition duration-300 ease-in-out rounded-full hover:bg-alphawhite focus:outline-none rotate-when-hover"
          @click="changeDirections"
        >
          <img
            src="@/assets/arrow-down.png"
            style="width: 17px; height: 17px;"
          />
        </button>
      </FormIcon>

      <!-- :subLabelName="outputBalance ? `Balance: ${outputBalance}` : undefined" -->
      <FormField
        placeholder="0.0"
        label="Output"
        v-model="outputAmount"
        :subLabelName="outputBalance ? `Balance: ${outputBalance}` : undefined"
        :isLoading="outputLoading"
        @input="(e) => handleOutputAmountChange(e.target.value)"
        @selectToken="handleOutputSelect"
        :selectedToken="outputToken"
      />

      <template v-if="send">
        <FormIcon>
          <img class="inline" src="@/assets/arrow-down.png" />
        </FormIcon>

        <FormField
          label="Recipient Address"
          placeholder="tz1v7h3s..."
          :withSelect="false"
          v-model="recipientAddress"
          @input="(e) => (recipientAddress = e.target.value)"
          :spellcheck="false"
        />
      </template>

      <FormInfo class="overflow-x-auto whitespace-no-wrap text-primary">
        <template v-if="notWhitelistedPair">
          <div class="mb-4">
            <div class="p-4 bg-redalpha rounded text-white whitespace-normal font-medium">
              Attention! One of the tokens you’re trying to exchange is not whitelisted.
              <br />
              You can interact with them at your own risk.
            </div>
          </div>
        </template>

        <div class="flex justify-between mb-1">
          <span class="mr-2">Input Dex contract</span>
          <span class="font-mono text-gray-400">{{
            inputDexAddress || "-"
          }}</span>
        </div>

        <div class="flex justify-between mb-1">
          <span class="mr-2">Output Dex contract</span>
          <span class="font-mono text-gray-400">{{
            outputDexAddress || "-"
          }}</span>
        </div>

        <div class="flex justify-between mb-1">
          <span class="mr-2">Fee</span>
          <span>{{ fee || "-" }}</span>
        </div>

        <div class="flex justify-between mb-1">
          <span class="mr-2">Exchange rate</span>
          <span>{{ exchangeRate || "-" }}</span>
        </div>

        <div class="flex mb-1">
          <span class="mr-2">Slippage tolerance</span>
          <span class="flex-1"></span>
          <button
            v-for="percentage in slippagePercentages"
            :key="percentage"
            class="px-2 py-px ml-2 text-xs rounded-md shadow-xs focus:outline-none"
            :class="
              activeSlippagePercentage === percentage ? 'bg-alphawhite' : ''
            "
            v-on:click="setActiveSlippagePercentage(percentage)"
          >
            {{ percentage }}
            <span class="opacity-75">%</span>
          </button>

          <div
            class="px-2 py-2 ml-2 text-xs font-light leading-tight rounded-md shadow-xs focus:outline-none"
            :class="
              slippagePercentages.includes(activeSlippagePercentage)
                ? ''
                : 'bg-alphawhite'
            "
          >
            <input
              class="w-12 text-right bg-transparent outline-none"
              v-bind:placeholder="activeSlippagePercentage"
              v-model="customSlippagePercentage"
              @input="e => handleCustomSlippageChange(e.target.value)"
            />
            %
          </div>
        </div>

        <div class="flex justify-between mb-1">
          <span class="mr-2">Minimum received</span>
          <span>
            {{
              minimumReceived ? `${minimumReceived} ${outputToken.name}` : "-"
            }}
          </span>
        </div>
      </FormInfo>
    </Form>

    <div class="flex justify-center mt-8 text-center align-center">
      <SubmitBtn :disabled="!canSwap" @click="swap">
        <template v-if="!swapping">{{ swapStatus }}</template>
        <template v-if="swapping">
          <Loader size="large" />
        </template>
      </SubmitBtn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import NavTabs from "@/components/NavTabs.vue";
import Form, { FormIcon, FormField, FormInfo } from "@/components/Form";
import SubmitBtn from "@/components/SubmitBtn.vue";
import Loader from "@/components/Loader.vue";

import BigNumber from "bignumber.js";
import { OpKind, WalletOperation } from "@taquito/taquito";
import store, { getAccount, useWallet, getTokenPairsID, connectTempleWalletWrapper } from "@/store";
import {
  FEE_RATE,
  XTZ_TOKEN,
  QSAsset,
  isAddressValid,
  toValidAmount,
  getBalance,
  estimateTezToToken,
  estimateTezToTokenInverse,
  estimateTokenToTez,
  estimateTokenToTezInverse,
  tzToMutez,
  clearMem,
  approveToken,
  toNat,
  deapproveFA2,
  isUnsafeAllowanceChangeError,
  toAssetSlug,
  isTokenWhitelisted,
  getDexStorage,
  findTezDex,
  confirmOperation,
  getNetwork
} from "@/core";

import { notifyConfirm, notifyError } from "../toast";
import add from "date-fns/add";
import { swapDirect, removeOperator, addOperator, transfer, transferFrom, batchContractCalls,} from "../services/web3/mutation";

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

@Component({
  components: {
    NavTabs,
    Form,
    FormIcon,
    FormField,
    FormInfo,
    SubmitBtn,
    Loader,
  },
})
export default class SwapOrSend extends Vue {
  @Prop({ default: false }) send?: boolean;

  inputAmount = "";
  inputBalance: string | null = null;
  inputLoading = false;

  outputAmount = "";
  outputBalance: string | null = null;
  outputLoading = false;

  recipientAddress: string = "";

  slippagePercentages = [0.5, 1, 3];
  activeSlippagePercentage: number | undefined = 0.5;
  lastValidCustomSlippagePercentage: string = "";
  customSlippagePercentage: string = "";
  fee: string | null = null;
  inputDexAddress: string | null = null;
  outputDexAddress: string | null = null;

  inputTokenAddress: string | null = null;
  outputTokenAddress: string | null = null;

  swapping = false;
  swapStatus = this.defaultSwapStatus;

  get defaultSwapStatus() {
    return this.send ? "Send" : "Swap";
  }

  get account() {
    return getAccount();
  }

  get inputToken() {
    const { from } = this.$route.query;
    if (from === "tez") {
      return XTZ_TOKEN;
    }
    return (
      store.state.tokens.find((t) => toAssetSlug(t) === from) ?? null
    );
  }

  set inputToken(val: QSAsset | null) {
    const usp = new URLSearchParams(this.$route.query as any);
    if (val) {
      usp.set("from", toAssetSlug(val));
    } else {
      usp.delete("from");
    }
    this.$router.replace(`${this.$route.path}?${usp}`);
  }

  get outputToken() {
    const { to } = this.$route.query;
    if (to === "tez") {
      return XTZ_TOKEN;
    }
    return (
      store.state.tokens.find((t) => toAssetSlug(t) === to) ?? null
    );
  }

  set outputToken(val: QSAsset | null) {
    const usp = new URLSearchParams(this.$route.query as any);
    if (val) {
      usp.set("to", toAssetSlug(val));
    } else {
      usp.delete("to");
    }
    this.$router.replace(`${this.$route.path}?${usp}`);
  }

  get notWhitelistedPair() {
    return [this.inputToken, this.outputToken].some((t) =>
      t ? !isTokenWhitelisted(t) : false
    );
  }

  get exchangeRate() {

    if (
      !this.inputToken ||
      !this.outputToken ||
      !this.inputAmount ||
      !this.outputAmount
    ) {
      return null;
    }

    const price = new BigNumber(this.inputAmount)
      .div(this.outputAmount)
      .toFormat(this.inputToken.decimals, BigNumber.ROUND_DOWN);
    return `1 ${this.outputToken.name} = ${price} ${this.inputToken.name}`;
  }

  get minimumReceived() {
    if (!this.outputToken || !this.outputAmount) return null;
    const base = new BigNumber(100)
      .minus(this.activeSlippagePercentage || 0)
      .div(100)
      .times(this.outputAmount);

    return base.toFixed(this.outputToken.decimals, BigNumber.ROUND_DOWN);
  }

  get canSwap() {
    const inAndOutValid =
      this.inputToken &&
      this.outputToken &&
      [
        this.inputAmount,
        this.outputAmount,
        this.minimumReceived,
      ].every(a => a && +a > 0) &&
      this.activeSlippagePercentage! < 100;
    return this.send
      ? inAndOutValid && isAddressValid(this.recipientAddress)
      : inAndOutValid;
  }

  get tokens() {
    return store.state.tokens;
  }

  created() {
    this.loadInputBalance();
    this.loadFee();
  }

  @Watch("inputToken")
  onInputTokenChange() {
    this.loadInputTezDex();
    this.loadInputBalance();
  }

  @Watch("outputToken")
  onOutputTokenChange() {
    this.loadOutputTezDex();
    this.loadOutputBalance();
  }

  @Watch("account")
  onAccountChange() {
    this.loadInputBalance();
    this.loadOutputBalance();
  }

  @Watch("tokens")
  onTokensChange() {
    this.loadFee();
  }

  async loadInputTezDex() {
    this.inputDexAddress = null;
    this.inputTokenAddress = null;

    if (this.inputToken && this.inputToken.type === "token") {
      this.inputLoading = true;
      const dex = await findTezDex(this.inputToken);
      
      this.inputTokenAddress = this.inputToken.id;
      if (dex) this.inputDexAddress = dex.address;
      this.inputLoading = false;
    }

    this.calcOutputAmount();
  }

  async loadOutputTezDex() {
    this.outputDexAddress = null;
    this.outputTokenAddress = null;

    if (this.outputToken && this.outputToken.type === "token") {
      this.outputLoading = true;
      const dex = await findTezDex(this.outputToken);

      this.outputTokenAddress = this.outputToken.id;
      if (dex) this.outputDexAddress = dex.address;
      this.outputLoading = false;
    }

    this.calcOutputAmount();
  }

  async loadInputBalance() {
    this.inputBalance = null;
    try {
      if (this.inputToken && this.account.pkh) {
        const balance = await getBalance(this.account.pkh, this.inputToken);
        this.inputBalance = balance.toFixed();
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
    }
  }

  async loadOutputBalance() {
    this.outputBalance = null;
    try {
      if (this.outputToken && this.account.pkh) {
        const balance = await getBalance(this.account.pkh, this.outputToken);
        this.outputBalance = balance.toFixed();
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
    }
  }

  async loadFee() {
    this.fee = null;
    try {
      const token = store.state.tokens[0];
      if (token) {
        const feeBn = new BigNumber(1).div(FEE_RATE).times(100);
        this.fee = `${+feeBn.toFixed(2)}%`;
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
    }
  }

  handleInputSelect(token: QSAsset) {
    this.inputToken = token;

    if (this.outputToken && toAssetSlug(token) === toAssetSlug(this.outputToken)) {
      this.outputToken = null;
      this.outputAmount = "";
    }
  }

  handleOutputSelect(token: QSAsset) {
    this.outputToken = token;

    if (this.inputToken) {
      if (toAssetSlug(token) === toAssetSlug(this.inputToken)) {
        this.inputToken = null;
      } else if (!this.inputAmount) {
        this.inputAmount = "1";
      }
    }
  }

  setActiveSlippagePercentage(percentage: number) {
    this.activeSlippagePercentage = percentage;
    this.customSlippagePercentage = "";
    this.lastValidCustomSlippagePercentage = "";
  }

  handleInputAmountChange(amount: string) {
    this.inputAmount = amount;
    const isNum = /^[0-9.]*$/g.test(amount);
    if (isNum) {
      this.calcOutputAmount();
    } else {
      this.outputAmount = "";
    }
  }

  handleOutputAmountChange(amount: string) {
    this.outputAmount = amount;
    const isNum = /^[0-9.]*$/g.test(amount);
    if (isNum) {
      this.calcInputAmount();
    } else {
      this.inputAmount = "";
    }
  }

  handleCustomSlippageChange(amount: string) {
    const numAmount = amount ? Number(amount) : undefined;
    const shouldRevertChange =
      numAmount !== undefined && (numAmount < 0 || numAmount > 30);

    if (
      numAmount !== undefined &&
      !Number.isNaN(numAmount) &&
      !shouldRevertChange
    ) {
      this.activeSlippagePercentage = numAmount;
    }

    if (shouldRevertChange) {
      this.customSlippagePercentage = this.lastValidCustomSlippagePercentage;
    } else {
      this.lastValidCustomSlippagePercentage = amount;
    }
  }

  async calcOutputAmount() {
    if (!this.inputToken || !this.outputToken) return;

    const inType = this.inputToken.type;
    const outType = this.outputToken.type;

    let amount: BigNumber | undefined;
    switch (true) {
      case inType === "xtz" && outType === "token":
        if (this.outputDexAddress) {
          amount = estimateTezToToken(
            this.inputAmount,
            await getDexStorage(this.outputDexAddress),
            this.outputToken
          );
        }
        break;

      case inType === "token" && outType === "xtz":
        if (this.inputDexAddress) {
          amount = estimateTokenToTez(
            this.inputAmount,
            await getDexStorage(this.inputDexAddress),
            this.inputToken
          );
        }
        break;

      case inType === "token" && outType === "token":

        if (this.inputDexAddress && this.outputDexAddress) {
          amount = estimateTezToToken(
            estimateTokenToTez(
              this.inputAmount,
              await getDexStorage(this.inputDexAddress),
              this.inputToken
            ),
            await getDexStorage(this.outputDexAddress),
            this.outputToken
          );
        }
        break;
      default:
        break;
    }

    this.outputAmount = toValidAmount(amount);
  }

  async calcInputAmount() {
    if (!this.inputToken || !this.outputToken) return;

    const inType = this.inputToken.type;
    const outType = this.outputToken.type;

    let amount: BigNumber | undefined;
    switch (true) {
      case inType === "xtz" && outType === "token":
        if (this.outputDexAddress) {
          amount = estimateTezToTokenInverse(
            this.outputAmount,
            await getDexStorage(this.outputDexAddress),
            this.outputToken
          );
        }
        break;

      case inType === "token" && outType === "xtz":
        if (this.inputDexAddress) {
          amount = estimateTokenToTezInverse(
            this.outputAmount,
            await getDexStorage(this.inputDexAddress),
            this.inputToken
          );
        }
        break;

      case inType === "token" && outType === "token":
        if (this.inputDexAddress && this.outputDexAddress) {
          amount = estimateTokenToTezInverse(
            estimateTezToTokenInverse(
              this.outputAmount,
              await getDexStorage(this.outputDexAddress),
              this.outputToken
            ),
            await getDexStorage(this.inputDexAddress),
            this.inputToken
          );
        }
        break;

      default:
        break;
    }

    this.inputAmount = toValidAmount(amount);
  }

  changeDirections() {
    let newInputToken;
    let newOutputToken;
    let newInputAmount;

    if (this.inputToken) {
      newOutputToken = this.inputToken;
    }
    if (this.outputToken) {
      newInputToken = this.outputToken;
      if (this.outputAmount) {
        newInputAmount = this.outputAmount;
      }
    }

    this.inputAmount = "";
    this.outputAmount = "";

    this.inputToken = newInputToken ?? null;
    this.outputToken = newOutputToken ?? null;

    // const inputDexAddress = this.inputDexAddress;
    // this.inputDexAddress = this.outputDexAddress;
    // this.outputDexAddress = inputDexAddress;

    if (newInputToken && newOutputToken && newInputAmount) {
      this.inputAmount = newInputAmount;
     // this.calcOutputAmount();
    }
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async swap() {

    if (this.swapping) return;
    this.swapping = true;


    let payload_batch = null;

    await connectTempleWalletWrapper();
    
    const me = getAccount().pkh
    const recipient = this.send ? this.recipientAddress : me;

    const inTk = this.inputToken!;
    const outTk = this.outputToken!;
    const inTkAddress = this.inputTokenAddress != undefined ? this.inputTokenAddress : 'KT1SaouedthKUtAujiBD232mZYGtKwpZ6mFD';
    const outTkAddress = this.outputTokenAddress != undefined ? this.outputTokenAddress : 'KT1SaouedthKUtAujiBD232mZYGtKwpZ6mFD';
    const inpAmn = this.inputAmount!;
    const minOut = this.minimumReceived!;
    const corminOut = new BigNumber(this.minimumReceived!);

    const inpAmnNat = toNat(inpAmn, inTk).toFixed();
  

    // @ts-ignore: Object is possibly 'null'.
    const minOutNat = tzToMutez(corminOut).c[0];

    let firemessage: any = {};


    let listTokenPairs:any = localStorage.getItem("listTokenPairs"); 
    let pairDetails:any = await getTokenPairsID(inTkAddress,outTkAddress);

    if(pairDetails == undefined){

      let msg:any = null;
      let msgtitle:any = null;

      if(listTokenPairs == undefined){
        msgtitle = 'Hey,';
        msg = 'Setting up environment. Please try again in 10 seconds.';
      }else{
        msgtitle = 'Unavailable Pool';
        msg = 'There\'s no direct liquidity pool for the selected token pair.';
      }
      
      firemessage = {
        title: msgtitle,
        html: msg,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Done!',
        onClose: this.reloadpage
      }

      this.$fire(firemessage);

      this.swapping = false;
      this.swapStatus = this.defaultSwapStatus;
      
      return
    }


    let pairId = pairDetails.pairID;
    

    const net = getNetwork();
    let response: any;

    if(this.send){

      let payload_swap = {
        params: {
          pairId: parseInt(pairId, 10),
          direction: pairDetails.pairDirection,
          swapParams: {
            amountIn: inpAmnNat.toString(),
            minAmountOut: minOutNat.toString(),
            deadline: add(new Date(), { minutes: 10 }).toISOString(),
            receiver: recipient
          }
        },
        sendParams: {
          to: "",
          amount: 0,
          mutez: true
        }
      }


      response = await swapDirect(net.id, payload_swap);
      console.log("## Send Transfer ##");
      console.log(response);

      // @ts-ignore: Object is possibly 'null'.
      payload_batch = response.data?.swapDirect;

    }else{


      let payload_swap = {
        params: {
          pairId: parseInt(pairId, 10),
          direction: pairDetails.pairDirection,
          swapParams: {
            amountIn: inpAmnNat.toString(),
            minAmountOut:  minOutNat.toString(),
            deadline: add(new Date(), { minutes: 10 }).toISOString(),
            receiver:  me
          }
        },
        sendParams: {
          to: "",
          amount: 0,
          mutez: true
        }
      };


      response = await swapDirect(net.id, payload_swap);
      console.log("## swapDirect ##");
      console.log(response);
      payload_batch = response.data?.swapDirect;
    }

    const response_batchcalls = await batchContractCalls(payload_batch);
    console.log("## Batch Calls ##");
    const response_batch:any = response_batchcalls.data?.batchWalletContractCalls;
    console.log(response_batchcalls);
    console.log(response_batch);
    

    if(response_batch != undefined){
      firemessage = {
        title: 'Successful',
        html:
          'Transaction ' +
          '<a href="https://ithaca.tzstats.com/'+response_batch+'" target="_blank"><b style="color: green;">...'+response_batch?.substring(response_batch?.length - 10)+'</b></a> ' +
          ' was sent. Please check for confirmations..',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Done!',
        onClose: this.reloadpage
      }
    }else{
      firemessage = {
        title: 'Unsuccessful',
        html:
          'Operation was unsuccessful',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Done!',
        onClose: this.reloadpage
      }
    }

    this.$fire(firemessage);


    this.swapping = false;
    this.swapStatus = this.defaultSwapStatus;
    
    

  }

  reloadpage(){
    this.refresh();
    window.location.reload();
  }


  // async swap() {
  //   if (this.swapping) return;
  //   this.swapping = true;

  //   try {
  //     const tezos = await useWallet();
  //     const me = await tezos.wallet.pkh();

  //     const recipient = this.send ? this.recipientAddress : me;

  //     const inTk = this.inputToken!;
  //     const outTk = this.outputToken!;
  //     const inpAmn = new BigNumber(this.inputAmount!);
  //     const minOut = new BigNumber(this.minimumReceived!);

  //     let bal: BigNumber | undefined;
  //     try {
  //       bal = await getBalance(me, inTk);
  //     } catch (_err) {}
  //     if (bal && bal.isLessThan(inpAmn)) {
  //       throw new Error("Not Enough Funds");
  //     }

  //     let operation: WalletOperation;
  //     if (inTk.type === "xtz" && outTk.type === "token" && this.outputDexAddress) {
  //       const contract = await tezos.wallet.at(this.outputDexAddress);

  //       operation = await contract.methods
  //         .use("tezToTokenPayment", toNat(minOut, outTk).toFixed(), recipient)
  //         .send({ amount: inpAmn as any });
  //     } else if (inTk.type === "token" && outTk.type === "xtz" && this.inputDexAddress) {
  //       const [tokenContract, dexContract] = await Promise.all([
  //         tezos.wallet.at(inTk.id),
  //         tezos.wallet.at(this.inputDexAddress),
  //       ]);

  //       const tokenAmountNat = toNat(inpAmn, inTk).toFixed();

  //       let withAllowanceReset = false;
  //       try {
  //         await tezos.estimate.batch([
  //           {
  //             kind: OpKind.TRANSACTION,
  //             ...approveToken(
  //               inTk,
  //               tokenContract,
  //               me,
  //               this.inputDexAddress,
  //               tokenAmountNat
  //             ).toTransferParams(),
  //           },
  //           {
  //             kind: OpKind.TRANSACTION,
  //             ...dexContract.methods
  //               .use(
  //                 "tokenToTezPayment",
  //                 tokenAmountNat,
  //                 tzToMutez(minOut),
  //                 recipient
  //               )
  //               .toTransferParams(),
  //           },
  //         ]);
  //       } catch (err) {
  //         if (isUnsafeAllowanceChangeError(err)) {
  //           withAllowanceReset = true;
  //         } else {
  //           console.error(err);
  //         }
  //       }

  //       let batch = tezos.wallet.batch([]);

  //       if (withAllowanceReset) {
  //         batch = batch.withTransfer(
  //           approveToken(
  //             inTk,
  //             tokenContract,
  //             me,
  //             this.inputDexAddress,
  //             0
  //           ).toTransferParams()
  //         );
  //       }

  //       batch = batch
  //         .withTransfer(
  //           approveToken(
  //             inTk,
  //             tokenContract,
  //             me,
  //             this.inputDexAddress,
  //             tokenAmountNat
  //           ).toTransferParams()
  //         )
  //         .withTransfer(
  //           dexContract.methods
  //             .use(
  //               "tokenToTezPayment",
  //               tokenAmountNat,
  //               tzToMutez(minOut),
  //               recipient
  //             )
  //             .toTransferParams()
  //         );

  //       deapproveFA2(
  //         batch,
  //         inTk,
  //         tokenContract,
  //         me,
  //         this.inputDexAddress,
  //       );

  //       operation = await batch.send();
  //     } else if (inTk.type === "token" && outTk.type === "token" && this.inputDexAddress && this.outputDexAddress) {
  //       const [
  //         inTokenContract,
  //         inDexContract,
  //         outDexContract,
  //       ] = await Promise.all([
  //         tezos.wallet.at(inTk.id),
  //         tezos.wallet.at(this.inputDexAddress),
  //         tezos.wallet.at(this.outputDexAddress),
  //       ]);

  //       const tezAmount = estimateTokenToTez(
  //         this.inputAmount,
  //         await getDexStorage(this.inputDexAddress),
  //         inTk
  //       );

  //       const inpAmnNat = toNat(inpAmn, inTk).toFixed();

  //       let withAllowanceReset = false;
  //       try {
  //         await tezos.estimate.batch([
  //           {
  //             kind: OpKind.TRANSACTION,
  //             ...approveToken(
  //               inTk,
  //               inTokenContract,
  //               me,
  //               this.inputDexAddress,
  //               inpAmnNat
  //             ).toTransferParams(),
  //           },
  //           {
  //             kind: OpKind.TRANSACTION,
  //             ...inDexContract.methods
  //               .use(
  //                 "tokenToTezPayment",
  //                 inpAmnNat,
  //                 tzToMutez(tezAmount)
  //                   .integerValue(BigNumber.ROUND_DOWN)
  //                   .toFixed(),
  //                 me
  //               )
  //               .toTransferParams(),
  //           },
  //           {
  //             kind: OpKind.TRANSACTION,
  //             ...outDexContract.methods
  //               .use("tezToTokenPayment", toNat(minOut, outTk), recipient)
  //               .toTransferParams({ amount: tezAmount.toFixed() as any }),
  //           },
  //         ]);
  //       } catch (err) {
  //         if (isUnsafeAllowanceChangeError(err)) {
  //           withAllowanceReset = true;
  //         } else {
  //           console.error(err);
  //         }
  //       }

  //       let batch = tezos.wallet.batch([]);

  //       if (withAllowanceReset) {
  //         batch = batch.withTransfer(
  //           approveToken(
  //             inTk,
  //             inTokenContract,
  //             me,
  //             this.inputDexAddress,
  //             0
  //           ).toTransferParams()
  //         );
  //       }

  //       batch = batch
  //         .withTransfer(
  //           approveToken(
  //             inTk,
  //             inTokenContract,
  //             me,
  //             this.inputDexAddress,
  //             inpAmnNat
  //           ).toTransferParams()
  //         )
  //         .withTransfer(
  //           inDexContract.methods
  //             .use(
  //               "tokenToTezPayment",
  //               inpAmnNat,
  //               tzToMutez(tezAmount)
  //                 .integerValue(BigNumber.ROUND_DOWN)
  //                 .toFixed(),
  //               me
  //             )
  //             .toTransferParams()
  //         )
  //         .withTransfer(
  //           outDexContract.methods
  //             .use("tezToTokenPayment", toNat(minOut, outTk), recipient)
  //             .toTransferParams({ amount: tezAmount.toFixed() as any })
  //         );

  //       deapproveFA2(
  //         batch,
  //         inTk,
  //         inTokenContract,
  //         me,
  //         this.inputDexAddress,
  //       );

  //       operation = await batch.send();
  //     }

  //     notifyConfirm(
  //        confirmOperation(tezos, operation!.opHash)
  //         .finally(() => this.refresh())
  //     );
  //   } catch (err) {
  //     console.error(err);
  //     notifyError(err);

  //     const msg = err.message;
  //     this.swapStatus =
  //       msg && msg.length < 30
  //         ? msg.startsWith("Dex/")
  //           ? msg.replace("Dex/", "")
  //           : msg
  //         : "Something went wrong";
  //   }
  //   this.swapping = false;

  //   await new Promise((res) => setTimeout(res, 5000));
  //   this.swapStatus = this.defaultSwapStatus;
  // }

  refresh() {
    console.log("refresh was called");
    clearMem();
    this.loadInputBalance();
    this.calcOutputAmount();
  }
  
}
</script>
