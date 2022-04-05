<template>
  <div class="max-w-xl mx-auto">
    <NavTabs class="mb-6" />

    <Form :style="processing && 'pointer-events:none'">
      <NavInvest />

      <FormField
        placeholder="0.0"
        label="Token Deposit"
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
        :withTezos="false"
        :subLabelName="tokenBalance ? 'Balance: ' : undefined"
        :subLabelValue="tokenBalance || undefined"
        :isLoading="tokenLoading"
        v-model="tokenAmount"
        @input="(e) => handleTokenAmountChange(e.target.value)"
        @selectToken="handleTokenSelect"
        :selectedToken="selectedToken"
      />

      <FormInfo class="overflow-x-auto whitespace-no-wrap">
        <template v-if="notWhitelistedPair">
          <div class="mb-4">
            <div class="p-4 bg-redalpha rounded text-white whitespace-normal font-medium">
              Attention! Token pair you’re trying to add liquidity to is not whitelisted.
              <br />
              You can interact with it at your own risk.
            </div>
          </div>
        </template>

        <div class="flex justify-between mb-1">
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
        </div>
      </FormInfo>
    </Form>

    <div
      class="mx-auto mt-8 mb-8 text-sm font-normal text-center text-lightgray"
    ></div>

    <template v-if="noDecimalsToken">
      <div class="-mt-4 mb-8 px-4">
        <div class="p-4 bg-redalpha rounded text-white whitespace-normal font-medium">
          This pool is disabled for use on the UI due to possible manipulations.
          Please, stay tuned, the newer contract version fixing this issue is coming soon.
          <a href="https://www.madfish.solutions/blog/quipuswap-important-announcement-the-issue-affecting-token-pools-without-decimals/" target="_blank" rel="noopener noreferrer" class="underline">Read more</a>
        </div>
      </div>
    </template>

    <div class="flex justify-center text-center">
      <!-- :disabled="!valid" -->
      <SubmitBtn @click="addLiquidity" >
        <template v-if="!processing">{{ addLiqStatus }}</template>
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
  estimateShares,
  estimateSharesInverse,
  estimateInTokens,
  estimateInTezos,
  estimateToTezos,
  tzToMutez,
  mutezToTz,
  clearMem,
  approveToken,
  toNat,
  fromNat,
  deapproveFA2,
  isUnsafeAllowanceChangeError,
  isTokenWhitelisted,
  toAssetSlug,
  findTezDex,
  confirmOperation,
  getNetwork,
  getStorage,
  sharesTokenAinTokenBin,
  lpDetails,
  maxTokenIn
} from "@/core";
import { XTZ_TOKEN } from "@/core/defaults";
import { OpKind } from "@taquito/taquito";
import { notifyConfirm, notifyError } from "../toast";


import add from "date-fns/add";
import { invest, batchContractCalls } from "../services/web3/mutation";


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
export default class AddLiquidity extends Vue {
  tezToken: QSAsset | null = null;
  inputToken: any | null = null;

  tezAmount = "";
  tezBalance: string | null = null;
  tezLoading = false;

  tokenAmount = "";
  tokenBalance: string | null = null;
  tokenLoading = false;

  poolMeta: PoolMeta | null = null;
  dexAddress: string | null = null;

  processing = false;
  addLiqStatus = this.defaultAddLiqStatus;

  get selectedToken(): QSAsset | null {
    const tokenSlug = this.$route.params.token;
    return (
      store.state.tokens.find((t) => toAssetSlug(t) === tokenSlug) || null
    );
  }

  get noDecimalsToken() {
    // return this.selectedToken ? this.selectedToken.decimals === 0 : false;
    return false;
  }

  get defaultAddLiqStatus() {
    return "Add Liquidity";
  }

  get account() {
    return getAccount();
  }

  get valid() {
    return (
      this.tezToken &&
      this.selectedToken &&
      !this.noDecimalsToken &&
      this.dexAddress &&
      [this.tezAmount, this.tokenAmount].every((a) => a && +a > 0)
    );
  }

  get notWhitelistedPair() {
    return this.selectedToken ? !isTokenWhitelisted(this.selectedToken) : false;
  }

  get exchangeRate() {
    if (
      !this.tezToken ||
      !this.selectedToken ||
      !this.tezAmount ||
      !this.tokenAmount
    ) {
      return null;
    }

    const price = new BigNumber(this.tezAmount)
      .div(this.tokenAmount)
      .toFormat(6);

    return `1 ${this.selectedToken.name} = ${price} XTZ`;
  }

  created() {
    this.loadTezBalance();
  }

  @Watch("tezToken")
  onTezTokenChange() {
    this.loadTezBalance();
  }

  @Watch("selectedToken")
  onSelectedTokenChange() {
    this.loadTokenBalance();
    this.loadDex();
  }

  @Watch("dexAddress")
  onDexAddressChange() {
    this.loadPoolMetadata();
  }

  @Watch("account")
  onAccountChange() {
    this.loadTezBalance();
    this.loadTokenBalance();
    this.loadPoolMetadata();
  }

  async loadTezBalance() {
    this.tezBalance = null;
    try {
      if (this.tezToken && this.account.pkh) {
        const balance = await getBalance(this.account.pkh, this.tezToken);
        this.tezBalance = balance.toFixed();
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
    }
  }

  async loadTokenBalance() {
    this.tokenBalance = null;
    try {
      if (this.selectedToken && this.account.pkh) {
        const balance = await getBalance(this.account.pkh, this.selectedToken);
        this.tokenBalance = balance.toFixed();
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

      this.calcTokenAmount();
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
        myShares && new BigNumber(myShares.total).div(dexStorage.totalSupply);
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
    this.$router.replace(`/invest/add-liquidity/${toAssetSlug(token)}`);

    if (!this.tezAmount) {
      this.tezAmount = "1";
    }
  }

  async handleInputSelect(token: QSAsset) {
    this.inputToken = token;

    if (this.tezToken && toAssetSlug(token) === toAssetSlug(this.tezToken)) {
      this.tezToken = null;
      this.tezAmount = "";
    }
  }

  handleTezAmountChange(amount: string) {
    this.tezAmount = amount;
    const isNum = /^[0-9.]*$/g.test(amount);
    if (isNum) {
      this.calcTokenAmount();
    } else {
      this.tokenAmount = "";
    }
  }

  handleTokenAmountChange(amount: string) {
    this.tokenAmount = amount;
    const isNum = /^[0-9.]*$/g.test(amount);
    if (isNum) {
      setTimeout(() => this.calcTezAmount(), 0);
    } else {
      this.tezAmount = "";
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
  
  async getPairID(){
    const inTkAddress = this.inputToken.id != undefined ? this.inputToken.id : '';

    // @ts-ignore: Object is possibly 'null'.
    const outTkAddress = this.selectedToken.id != undefined ? this.selectedToken.id : '';

    let pairId = await getTokenPairsID(inTkAddress,outTkAddress);

    return pairId;
  }

  // async calcTokenAmount() {
  //   if (!this.selectedToken || !this.dexAddress) return;

  //   const dexStorage = await getDexStorage(this.dexAddress);
  //   const shares = estimateShares(this.tezAmount, dexStorage);
  //   const amount = estimateInTokens(shares, dexStorage, this.selectedToken);

  //   this.tokenAmount = toValidAmount(amount);
  // }

  // async calcTezAmount() {
  //   if (!this.selectedToken || !this.dexAddress) return;

  //   const dexStorage = await getDexStorage(this.dexAddress);
  //   const shares = estimateSharesInverse(
  //     this.tokenAmount,
  //     dexStorage,
  //     this.selectedToken
  //   );
  //   const amount = estimateInTezos(shares, dexStorage);

  //   this.tezAmount = toValidAmount(amount);
  // }

  async addLiquidity() {


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



      var shares_payload: any = await sharesTokenAinTokenBin(
        pairId,
        this.tezAmount,
        selTk_A
      );

      var maxAmount_A: any = await maxTokenIn(
        this.tezAmount,
        selTk_A,
        0.5
      );

      var maxAmount_B: any = await maxTokenIn(
        this.tokenAmount,
        selTk_B,
        0.5
      );

      const payload_invest = {
          params: {
            pairId: parseInt(pairId, 10),
            shares: shares_payload.lpShares.toString(),
            tokenAIn: maxAmount_A.toString(),
            tokenBIn: maxAmount_B.toString(),
            deadline: add(new Date(), { minutes: 10 }).toISOString(),
          },
          sendParams: {
            to: "",
            amount: 0,
            mutez: true
          }
        }


      const response_invest = await invest(net.id, payload_invest);
      console.log("## invest ##");
      console.log(response_invest);

      const payload_batch = response_invest.data?.invest;
      
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
            '<a href="https://hangzhou.tzstats.com/'+response_batch+'" target="_blank"><b style="color: green;">...'+response_batch?.substring(response_batch?.length - 10)+'</b></a> ' +
            ' was completed.',
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

      // const tezos = await useWallet();
      // const me = await tezos.wallet.pkh();

      // const tezTk = this.tezToken!;
      // const selTk = this.selectedToken!;
      // const dexAddress = this.dexAddress!;

      // const initialTezAmount = new BigNumber(this.tezAmount);
      // const initialTokenAmount = new BigNumber(this.tokenAmount);

      // const dexStorage = await getDexStorage(dexAddress);

      // const tezShares = estimateShares(initialTezAmount, dexStorage);
      // const tokensShares = estimateSharesInverse(
      //   initialTokenAmount,
      //   dexStorage,
      //   selTk
      // );

      // const shares = BigNumber.max(
      //   BigNumber.min(tezShares, tokensShares),
      //   1
      // );

      // const tokenAmount = estimateInTokens(shares, dexStorage, selTk);
      // const tezAmount = estimateInTezos(shares, dexStorage);

      // const toCheck = [
      //   {
      //     token: selTk,
      //     amount: tokenAmount,
      //   },
      //   {
      //     token: tezTk,
      //     amount: tezAmount,
      //   },
      // ];
      // for (const { token, amount } of toCheck) {
      //   let bal: BigNumber | undefined;
      //   try {
      //     bal = await getBalance(me, token);
      //   } catch (_err) {}
      //   if (bal && bal.isLessThan(amount)) {
      //     throw new Error("Not Enough Funds");
      //   }
      // }

      // const [tokenContract, dexContract] = await Promise.all([
      //   tezos.wallet.at(selTk.id),
      //   tezos.wallet.at(dexAddress),
      // ]);

      // const tokenAmountNat = toNat(tokenAmount, selTk).toFixed();

      // let withAllowanceReset = false;
      // try {
      //   await tezos.estimate.batch([
      //     {
      //       kind: OpKind.TRANSACTION,
      //       ...approveToken(
      //         selTk,
      //         tokenContract,
      //         me,
      //         dexAddress,
      //         tokenAmountNat
      //       ).toTransferParams(),
      //     },
      //     {
      //       kind: OpKind.TRANSACTION,
      //       ...dexContract.methods
      //         .use("investLiquidity", tokenAmountNat)
      //         .toTransferParams({ amount: tezAmount.toFixed() as any }),
      //     },
      //   ]);
      // } catch (err) {
      //   if (isUnsafeAllowanceChangeError(err)) {
      //     withAllowanceReset = true;
      //   } else {
      //     console.error(err);
      //   }
      // }

      // let batch = tezos.wallet.batch([]);

      // if (withAllowanceReset) {
      //   batch = batch.withTransfer(
      //     approveToken(
      //       selTk,
      //       tokenContract,
      //       me,
      //       dexAddress,
      //       0
      //     ).toTransferParams()
      //   );
      // }

      // batch = batch
      //   .withTransfer(
      //     approveToken(
      //       selTk,
      //       tokenContract,
      //       me,
      //       dexAddress,
      //       tokenAmountNat
      //     ).toTransferParams()
      //   )
      //   .withTransfer(
      //     dexContract.methods
      //       .use("investLiquidity", tokenAmountNat)
      //       .toTransferParams({ amount: tezAmount.toFixed() as any })
      //   )
      //   // .withTransfer(
      //   //   dexContract.methods
      //   //     .use("withdrawProfit", me).toTransferParams()
      //   // );

      // deapproveFA2(
      //   batch,
      //   selTk,
      //   tokenContract,
      //   me,
      //   dexAddress,
      // );

      // const operation = await batch.send();

      // notifyConfirm(
      //   confirmOperation(tezos, operation.opHash)
      //     .finally(() => this.refresh())
      // );
    // } catch (err) {
    //   console.error(err);
    //   notifyError(err);
    //   const msg = err.message;
    //   this.addLiqStatus =
    //     msg && msg.length < 30
    //       ? msg.startsWith("Dex/")
    //         ? msg.replace("Dex/", "")
    //         : msg
    //       : "Something went wrong";
    // }
    // this.processing = false;

    // await new Promise((res) => setTimeout(res, 5000));
    // this.addLiqStatus = this.defaultAddLiqStatus;
  }


  reloadpage(){
    this.refresh();
    window.location.reload();
  }

  refresh() {
    clearMem();
    this.loadTezBalance();
    this.loadTokenBalance();
    this.loadPoolMetadata();
    this.calcTokenAmount();
  }
}
</script>
