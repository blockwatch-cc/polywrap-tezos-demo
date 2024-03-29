<template>
  <div class="max-w-xl mx-auto">
    <NavTabs class="mb-6" />

    <GovernancePairSelect
      :selectedToken="selectedToken"
      v-on:token-selected="selectToken"
    />

    <template v-if="selectedToken">
      <Form :style="processing && 'pointer-events:none'">
        <NavGovernance />

        <FormField
          placeholder="tz1v7h3s..."
          label="Deputy"
          :withSelect="false"
          v-model="deputy"
          v-on:input="deputy = $event.target.value"
          :spellcheck="false"
        />

        <FormInfo>
          <p>
            Every user is able to delegate their voting power to any address.<br />
            It’s fully optional feature.
          </p>
        </FormInfo>
      </Form>

      <div class="mt-4 flex justify-center align-center text-center">
        <SubmitBtn :disabled="!valid" @click="handleAdd">
          <template v-if="!processing">{{ addStatus }}</template>
          <template v-if="processing">
            <Loader size="large" />
          </template>
        </SubmitBtn>
      </div>

      <Form class="mt-8">
        <h1 class="text-xl text-center p-4 pb-2">Already trusted deputies</h1>

        <p class="px-4 text-sm text-center opacity-90">
          Click on left button near deputy you want to remove
        </p>

        <div class="p-4 pb-8">
          <div v-if="dataLoading" class="p-4 flex items-center justify-center">
            <Loader size="large" />
          </div>
          <div v-else-if="alreadyDeputies.length > 0">
            <template v-for="(depAddress, index) in alreadyDeputies">
              <div :key="depAddress + 1" class="my-3 flex items-center">
                <img
                  src="@/assets/remove.svg"
                  alt
                  class="mr-2 h-8 w-auto flex-shrink-0 cursor-pointer"
                  @click="() => handleRemove(depAddress)"
                />
                <span class="text-lg font-medium truncate">
                  {{ depAddress }}
                </span>
              </div>

              <div
                :key="depAddress + 2"
                v-if="index !== alreadyDeputies.length - 1"
                class="h-px w-full bg-gray-800"
              />
            </template>
          </div>
          <div v-else class="px-4 py-2 flex items-center justify-center">
            <span class="text-lg opacity-75 font-light">No deputies found</span>
          </div>
        </div>
      </Form>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import store, { getAccount, useWallet } from "@/store";
import { QSAsset, isAddressValid, getDexStorage, clearMem } from "@/core";
import NavTabs from "@/components/NavTabs.vue";
import NavGovernance from "@/components/NavGovernance.vue";
import Form, { FormField, FormIcon, FormInfo } from "@/components/Form";
import SubmitBtn from "@/components/SubmitBtn.vue";
import Loader from "@/components/Loader.vue";
import GovernancePairSelect from "@/components/GovernancePairSelect.vue";

@Component({
  components: {
    NavTabs,
    NavGovernance,
    Form,
    FormField,
    FormIcon,
    FormInfo,
    GovernancePairSelect,
    SubmitBtn,
    Loader,
  },
})
export default class DelegateVote extends Vue {
  deputy: string = "";

  dataLoading: boolean = false;
  alreadyDeputies: string[] = [];

  processing: boolean = false;
  addStatus: string = "Add Deputy";

  get account() {
    return getAccount();
  }

  get selectedToken(): QSAsset | null {
    const tokenExchange = this.$route.params.token;
    return (
      store.state.tokens.find((t: any) => t.exchange === tokenExchange) || null
    );
  }

  get valid() {
    return isAddressValid(this.deputy);
  }

  created() {
    this.loadData();
  }

  @Watch("selectedToken")
  onSelectedTokenChange() {
    this.loadData();
  }

  @Watch("account")
  onAccountChange() {
    this.loadData();
  }

  async loadData() {
    this.alreadyDeputies = [];

    if (!this.selectedToken || !this.account.pkh) return;

    this.dataLoading = true;
    try {
      const storage = await getDexStorage(this.selectedToken.exchange);
      const myVoters = await storage.voters.get(this.account.pkh);
      if (myVoters) {
        this.alreadyDeputies = myVoters.allowances;
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      this.dataLoading = false;
    }
  }

  selectToken(token: QSAsset) {
    this.$router.replace(`/governance/delegate-vote/${token.exchange}`);
  }

  handleAdd() {
    return this.allow(this.deputy, true);
  }

  handleRemove(address: string) {
    return this.allow(address, false);
  }

  async allow(address: string, allow: boolean) {
    if (this.processing) return;
    this.processing = true;
    try {
      const tezos = await useWallet();
      const contract = await tezos.wallet.at(this.selectedToken!.exchange);
      const operation = await contract.methods
        .use("setVotesDelegation", address, allow)
        .send();
      await operation.confirmation();

      this.addStatus = "Success";
      this.refresh();
    } catch (err: any) {
      console.error(err);
      const msg = err.message;
      this.addStatus =
        msg && msg.length < 30
          ? msg.startsWith("Dex/")
            ? msg.replace("Dex/", "")
            : msg
          : "Something went wrong";
    } finally {
      this.processing = false;
      await new Promise((r) => setTimeout(r, 5000));
      this.addStatus = "Add Deputy";
    }
  }

  refresh() {
    clearMem();
    this.loadData();
  }
}
</script>
