<template>
  <div class="max-w-xl mx-auto">
    <NavTabs class="mb-6" />

    <Form :style="processing && 'pointer-events:none'">
      <NavInvest />

      <FormField
        placeholder="0.0"
        label="Shares to remove"
        :showSelect="false"
        :withTezos="false"
        :subLabelName="myShares ? 'Your shares: ' : undefined"
        :subLabelValue="myShares || undefined"
        :isLoading="tokenLoading"
        v-model="sharesToRemove"
        @input="(e) => handleSharesToRemoveChange(e.target.value)"
        @selectToken="handleTokenSelect"
        :selectedToken="selectedToken"
      />

      <FormIcon>
        <img :src="require('@/assets/arrow-down.png')" />
      </FormIcon>

      <FormField
        placeholder="0.0"
        label="Token Deposit"
        :isReadonly="true"
        :withTezos="false"
        :onlyTezos="false"
        :subLabelName="tezBalance ? 'Balance: ' : undefined"
        :subLabelValue="tezBalance || undefined"
        :isLoading="tezLoading"
        v-model="tezAmount"
        @input="(e) => handleTezAmountChange(e.target.value)"
        @selectToken="handleInputSelect"
        :selectedToken="tezToken"
      />

      <FormIcon>
        <img :src="require('@/assets/plus.png')" />
      </FormIcon>

      <FormField
        placeholder="0.0"
        label="Token Deposit"
        :isReadonly="true"
        :withTezos="false"
        :subLabelName="tokenBalance ? 'Balance: ' : undefined"
        :subLabelValue="tokenBalance || undefined"
        :isLoading="tokenLoading"
        v-model="tokenAmount"
        @input="(e) => handleTokenAmountChange(e.target.value)"
        @selectToken="handleTokenSelect"
        :selectedToken="selectedToken"
      />

      <FormIcon>
        <img :src="require('@/assets/arrow-down.png')" />
      </FormIcon>

      <!-- <div class="-mx-3 shadow-lg xs:-mx-4">
        <div class="relative field rounded-3px">
          <div class="flex flex-col justify-start flex-1 py-6">
            <div class="w-full mb-1 font-light label xs:mb-2 sm:text-lg">
              Output
              <span class="text-sm">(estimated)</span>
            </div>

            <div v-if="inTokens" class="flex flex-col fieldval">
              <div class="mb-1">
                <span class="mr-1 opacity-75">+</span>
                <span class="tracking-wide">
                  {{ formatNum(inTokens.tezos, 6) }}
                </span>
                <span class="ml-1 text-sm opacity-90">XTZ</span>
              </div>

              <div class="mb-1">
                <span class="mr-1 opacity-75">+</span>
                <span class="tracking-wide">
                  {{ formatNum(inTokens.token, selectedToken.decimals) }}
                </span>
                <span class="ml-1 text-sm opacity-90">{{
                  selectedToken.name
                }}</span>
              </div>
            </div>

            <div v-else>-</div>
          </div>
        </div>
      </div> -->

      <FormInfo class="overflow-x-auto whitespace-no-wrap">
        <!-- <div class="flex justify-between mb-1">
          <span class="mr-2">Dex contract</span>
          <span class="font-mono text-gray-400">{{ dexAddress || "-" }}</span>
        </div>

        <div class="flex justify-between mb-1">
          <span class="mr-2">Exchange rate</span>
          <span>{{ exchangeRate || "-" }}</span>
        </div>

        <div class="flex justify-between mb-1">
          <span class="mr-2">Pooled Tokens</span>
          <span>{{ poolMeta ? poolMeta.tokenFull : "-" }}</span>
        </div>

        <div class="flex justify-between mb-1">
          <span class="mr-2">Pooled XTZ</span>
          <span>{{ poolMeta ? poolMeta.tezFull : "-" }}</span>
        </div>

        <div class="flex justify-between mb-1">
          <span class="mr-2">Your pool tokens</span>
          <span>{{ poolMeta ? poolMeta.myTokens : "-" }}</span>
        </div>

        <div class="flex justify-between mb-1">
          <span class="mr-2">Your pool share</span>
          <span>{{ poolMeta ? poolMeta.myShare : "-" }}</span>
        </div> -->

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
      </FormInfo>
    </Form>

    <div
      class="mx-auto mt-8 mb-8 text-sm font-normal text-center text-lightgray"
    ></div>
    <div class="flex justify-center text-center">
      <SubmitBtn @click="removeLiquidity" :disabled="!valid">
        <template v-if="!processing">{{ remLiqStatus }}</template>
        <template v-if="processing">
          <Loader size="large" />
        </template>
      </SubmitBtn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import NavTabs from "@/components/NavTabs.vue";
import NavInvest from "@/components/NavInvest.vue";
import Loader from "@/components/Loader.vue";
import Form, { FormField, FormIcon, FormInfo } from "@/components/Form";
import SubmitBtn from "@/components/SubmitBtn.vue";

import BigNumber from "bignumber.js";
import store, { getAccount, useWallet, connectTempleWalletWrapper, getTokenPairsID } from "@/store";
import {
  QSAsset,
  isAddressValid,
  toValidAmount,
  getBalance,
  getDexStorage,
  getDexShares,
  getContract,
  estimateInTokens,
  estimateInTezos,
  tzToMutez,
  mutezToTz,
  clearMem,
  toNat,
  fromNat,
  sharesFromNat,
  sharesToNat,
  toAssetSlug,
  findTezDex,
  confirmOperation,
  getNetwork,
  minTokenOut,
  estimateShares,
  estimateSharesInverse,
  lpDetails
} from "@/core";
import { XTZ_TOKEN } from "@/core/defaults";
import { notifyConfirm, notifyError } from "../toast";



import add from "date-fns/add";
import { divest, batchContractCalls } from "../services/web3/mutation";


type InTokens = {
  tezos: string;
  token: string;
};

type PoolMeta = {
  tezFull: string;
  tokenFull: string;
  myShare: string;
  myTokens: string;
};

@Component({
  components: {
    NavTabs,
    NavInvest,
    Form,
    FormField,
    FormIcon,
    FormInfo,
    SubmitBtn,
    Loader,
  },
})
export default class RemoveLiquidity extends Vue {
  sharesToRemove = "";

  tezToken: QSAsset | null = null;
  myShares: string | null = null;

  tezAmount = "";
  inputToken: any | null = null;

  tokenAmount = "";
  tokenLoading = false;

  tezBalance: string | null = null;
  tezLoading = false;

  tokenBalance: string | null = null;


  inTokens: InTokens | null = null;
  poolMeta: PoolMeta | null = null;
  dexAddress: string | null = null;

  processing = false;
  remLiqStatus = this.defaultRemLiqStatus;

  slippagePercentages = [0.5, 1, 3];
  activeSlippagePercentage: number | undefined = 0.5;
  lastValidCustomSlippagePercentage: string = "";
  customSlippagePercentage: string = "";

  get selectedToken(): QSAsset | null {
    const tokenSlug = this.$route.params.token;
    return (
      store.state.tokens.find((t) => toAssetSlug(t) === tokenSlug) || null
    );
  }

  get defaultRemLiqStatus() {
    return "Remove Liquidity";
  }

  get account() {
    return getAccount();
  }

  get valid() {
    return (
      this.selectedToken &&
      this.tezAmount &&
      this.tokenAmount &&
      this.sharesToRemove &&
      +this.sharesToRemove > 0 
    );
  }

  get exchangeRate() {
    if (!this.selectedToken || !this.inTokens) {
      return null;
    }

    const price = new BigNumber(this.inTokens.tezos)
      .div(this.inTokens.token)
      .toFormat(6);

    return `1 ${this.selectedToken.name} = ${price} XTZ`;
  }

  formatNum(val: string, dec: number) {
    return new BigNumber(val).toFormat(dec);
  }

  @Watch("selectedToken")
  onSelectedTokenChange() {
    this.loadDex();
  }

  @Watch("dexAddress")
  onDexAddressChange() {
    this.loadPoolMetadata();
    this.loadMyShares();
  }

  @Watch("account")
  onAccountChange() {
    this.loadPoolMetadata();
    this.loadMyShares();
  }

  setActiveSlippagePercentage(percentage: number) {
    this.activeSlippagePercentage = percentage;
    this.customSlippagePercentage = "";
    this.lastValidCustomSlippagePercentage = "";
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

  async loadMyShares() {
    this.myShares = null;

    try {
      if (this.selectedToken && this.dexAddress && this.account.pkh) {
        const shares = await getDexShares(
          this.account.pkh,
          this.dexAddress
        );
        if (!shares) {
          this.myShares = "0";
        } else {
          this.myShares = sharesFromNat(shares.unfrozen).toFixed();
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
    }
  }

  async loadDex() {
    this.dexAddress = null;

    if (this.selectedToken) {
      this.tokenLoading = true;
      const dex = await findTezDex(this.selectedToken);
      if (dex) {
        this.dexAddress = dex.address;
      }
      this.tokenLoading = false;

      this.calcInTokens();
    }
  }

  async loadPoolMetadata() {
    this.poolMeta = null;

    if (this.selectedToken && this.dexAddress && this.account.pkh) {
      const myShares = await getDexShares(
        this.account.pkh,
        this.dexAddress
      );
      const dexStorage = await getDexStorage(this.dexAddress);

      const myShare =
        myShares &&
        new BigNumber(myShares.unfrozen).div(dexStorage.totalSupply);
      const myTokens =
        myShare &&
        fromNat(
          new BigNumber(dexStorage.tokenPool)
            .times(myShare)
            .integerValue(BigNumber.ROUND_DOWN),
          this.selectedToken
        );

      this.poolMeta = {
        tezFull: `${mutezToTz(dexStorage.tezPool)} XTZ`,
        tokenFull: `${fromNat(dexStorage.tokenPool, this.selectedToken)} ${
          this.selectedToken.name
        }`,
        myShare: myShare && !myShare.isNaN() ? `${myShare.times(100).toFormat(2)}%` : "-",
        myTokens: myTokens && !myTokens.isNaN() ? `${myTokens} ${this.selectedToken.name}` : "-",
      };
    }
  }

  async handleTokenSelect(token: QSAsset) {
    this.$router.replace(`/invest/remove-liquidity/${toAssetSlug(token)}`);

    if (!this.sharesToRemove) {
      this.sharesToRemove = "1";
    }
    this.calcTokenNTokenAmountByLP();
  }


  async handleInputSelect(token: QSAsset) {
    this.inputToken = token;

    if (this.tezToken && toAssetSlug(token) === toAssetSlug(this.tezToken)) {
      this.tezToken = null;
      this.tezAmount = "";
    }
    this.calcTokenNTokenAmountByLP();
  }

  handleSharesToRemoveChange(amount: string) {
    this.sharesToRemove = amount;
    const isNum = /^[0-9.]*$/g.test(amount);
    if (isNum) {
      // this.calcInTokens();
      this.calcTokenNTokenAmountByLP();
    } else {
      this.inTokens = null;
    }
  }

  handleTezAmountChange(amount: string) {
    this.tezAmount = amount;
    const isNum = /^[0-9.]*$/g.test(amount);
    if (isNum) {
      // this.calcTokenAmount();
      this.calcTokenNTokenAmountByLP();
    } else {
      this.tokenAmount = "";
    }
  }

  handleTokenAmountChange(amount: string) {
    this.tokenAmount = amount;
    const isNum = /^[0-9.]*$/g.test(amount);
    if (isNum) {
      // setTimeout(() => this.calcTezAmount(), 0);
      this.calcTokenNTokenAmountByLP();
    } else {
      this.tezAmount = "";
    }
  }

  async getPairID(){
    const inTkAddress = this.inputToken.id != undefined ? this.inputToken.id : '';

    // @ts-ignore: Object is possibly 'null'.
    const outTkAddress = this.selectedToken.id != undefined ? this.selectedToken.id : '';

    let pairId = await getTokenPairsID(inTkAddress,outTkAddress);

    return pairId;
  }

  async calcTokenNTokenAmountByLP() {

    // @ts-ignore: Object is possibly 'null'.
    if (!this.inputToken.id || !this.selectedToken.id || !this.sharesToRemove){
      this.tezAmount = "";
      this.tokenAmount = "";
      return;
    } else{

    const pairId = await this.getPairID();
    const lpdetails = await lpDetails(pairId);
    
    const sharesRatio = parseFloat(this.sharesToRemove)/lpdetails.total_supply;

    const tezAmount: any = (lpdetails.token_a_pool * Math.pow(10, (-8+6))) * sharesRatio;
    const tokenAmount: any = lpdetails.token_b_pool * sharesRatio;

    console.log(tezAmount.toFixed(7));
    console.log(tokenAmount.toFixed(7));

    this.tezAmount = !Number.isNaN(tezAmount.toFixed(7)) ? (tezAmount.toFixed(7)).toString() : "";
    this.tokenAmount = !Number.isNaN(tokenAmount.toFixed(7)) ? (tokenAmount.toFixed(7)).toString() : "";
    
    }
  }

  async calcTokenAmount() {
    // @ts-ignore: Object is possibly 'null'.
    if (!this.inputToken.id || !this.selectedToken.id) return;

    const pairId = await this.getPairID();
    const lpdetails = await lpDetails(pairId);

    const amount = ((parseFloat(this.tezAmount)* Math.pow(10, (-6+8)))/lpdetails.token_a_pool) * lpdetails.token_b_pool;
    this.tokenAmount = (amount.toFixed(7)).toString();
  }

  async calcTezAmount() {
    // @ts-ignore: Object is possibly 'null'.
    if (!this.inputToken.id || !this.selectedToken.id) return;

    const pairId = await this.getPairID();
    const lpdetails = await lpDetails(pairId);

    const amount = ((parseFloat(this.tokenAmount)* Math.pow(10, (-8+6)))/lpdetails.token_b_pool) * lpdetails.token_a_pool;

    this.tezAmount = (amount.toFixed(7)).toString();
  }
  

  async calcInTokens() {
    this.inTokens = null;
    if (!this.selectedToken || !this.dexAddress || !this.sharesToRemove) return;

    const dexStorage = await getDexStorage(this.dexAddress);

    const tezAmount = estimateInTezos(sharesToNat(this.sharesToRemove), dexStorage);
    const tokenAmount = estimateInTokens(
      sharesToNat(this.sharesToRemove),
      dexStorage,
      this.selectedToken
    );

    const tezos = toValidAmount(tezAmount);
    const token = toValidAmount(tokenAmount);
    this.inTokens = tezos && token ? { tezos, token } : null;
  }

  async removeLiquidity() {
   
   
   if (this.processing) return;
    this.processing = true;
    try {
        
      const net = getNetwork();
      
      await connectTempleWalletWrapper();
      const me = getAccount().pkh;

      let firemessage = {};

      const inTkAddress = this.inputToken.id != undefined ? this.inputToken.id : '';

      // @ts-ignore: Object is possibly 'null'.
      const outTkAddress = this.selectedToken.id != undefined ? this.selectedToken.id : '';
    
      let pairId = await getTokenPairsID(inTkAddress,outTkAddress);
      

      if(pairId == undefined){
        firemessage = {
          title: 'Unavailable Pair',
          html:
            'We only support FA12 and FA1218 Pair Transaction now.',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Done!'
        }

        this.$fire(firemessage);
        this.processing = false;
        
        return
      }


      const selTk_A: any = this.inputToken;
      const selTk_B: any = this.selectedToken!;

      

      const slippage = new BigNumber(this.activeSlippagePercentage || 0).div(100);

      var minAmount_A: any = await minTokenOut(
        this.tezAmount,
        selTk_A,
        slippage
      );

      var minAmount_B: any = await minTokenOut(
        this.tokenAmount,
        selTk_B,
        slippage
      );

      const shares = sharesToNat(this.sharesToRemove!);
      

      const payload_divest = {
          params: {
            pairId: parseInt(pairId, 10),
            shares: shares.toFixed(),
            minTokenAOut: Math.ceil(minAmount_A).toString(),
            minTokenBOut: Math.ceil(minAmount_B).toString(),
            deadline: add(new Date(), { minutes: 10 }).toISOString(),
          },
          sendParams: {
            to: "",
            amount: 0,
            mutez: true
          }
        }

      const response_divest = await divest(net.id, payload_divest);
      console.log("## divest ##");
      console.log(response_divest);


      const payload_batch = [response_divest.data?.divest];
      
          
      console.log("## Batch Calls ##");
      console.log(payload_batch);


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

    } catch (err) {
      console.error(err);
      notifyError(err);
    }
    
    this.processing = false;


    // if (this.processing) return;
    // this.processing = true;
    // try {
    //   const tezos = await useWallet();

    //   const shares = sharesToNat(this.sharesToRemove!);
    //   const selTk = this.selectedToken!;
    //   const dexAddress = this.dexAddress!;

    //   const mySharesPure = await getDexShares(this.account.pkh, dexAddress);
    //   let myShares: string | undefined;
    //   if (mySharesPure) {
    //     myShares = mySharesPure.unfrozen.toFixed();
    //   }

    //   if (!myShares || shares.isGreaterThan(myShares)) {
    //     throw new Error("Not Enough Shares");
    //   }

    //   const slippage = new BigNumber(this.activeSlippagePercentage || 0).div(100);

    //   const minTezos = withSlippage(tzToMutez(this.inTokens!.tezos), slippage);
    //   const minToken = withSlippage(toNat(this.inTokens!.token, selTk), slippage);

    //   const dexContract = await tezos.wallet.at(dexAddress);
    //   const operation = await dexContract.methods
    //     .use(
    //       "divestLiquidity",
    //       minTezos.toFixed(),
    //       minToken.toFixed(),
    //       shares.toFixed()
    //     )
    //     .send();

    //   notifyConfirm(
    //     confirmOperation(tezos, operation.opHash)
    //       .finally(() => this.refresh())
    //   );
    // } catch (err) {
    //   console.error(err);
    //   notifyError(err);
    //   const msg = err.message;
    //   this.remLiqStatus =
    //     msg && msg.length < 30
    //       ? msg.startsWith("Dex/")
    //         ? msg.replace("Dex/", "")
    //         : msg
    //       : "Something went wrong";
    // }
    // this.processing = false;

    // await new Promise((res) => setTimeout(res, 5000));
    // this.remLiqStatus = this.defaultRemLiqStatus;
  }


  reloadpage(){
    this.refresh();
    window.location.reload();
  }

  refresh() {
    clearMem();
    this.loadMyShares();
    this.loadPoolMetadata();
    this.calcInTokens();
  }
}

function withSlippage(val: BigNumber.Value, tolerance: BigNumber.Value) {
  return new BigNumber(val)
    .times(new BigNumber(1).minus(tolerance))
    .integerValue(BigNumber.ROUND_DOWN);
}
</script>

<style lang="postcss" scoped>
.field {
  @apply px-3 flex items-stretch;
  min-height: 5rem;
  background: #fff;
}

.fieldval {
  @apply text-base font-light;
}

@screen xs {
  .field {
    @apply px-6 h-32;
  }

  .field-extend {
    @apply px-6 h-32;
  }

  .fieldval {
    @apply text-lg;
  }
}

.label {
  color: #f6cc5b;
}
</style>
