<template>
  <div id="app" class="flex flex-col">
    <div class="container relative px-4 py-4 mx-auto xs:px-6">
      <header class="flex flex-col items-center mb-2 align-middle lg:items-stretch lg:flex-row">
        <div class="flex flex-col flex-1 pt-4 select-none">
          <!-- <div class="flex mt-2 mb-4">
            <a
              :href="V1_0Url"
              class="flex items-stretch w-48 h-8 overflow-hidden text-white border rounded-lg connect-button button-network border-accent focus:outline-none"
            >
              <div class="flex items-center justify-center w-1/2">
                v<span class="font-semibold">1.0</span>
              </div>
              <div class="flex items-center justify-center w-1/2 text-gray-800 bg-accent">
                v<span class="font-semibold">1.2</span>
              </div>
            </a>
          </div> -->

          <div class="flex mt-2 mb-4">
            <div>
            <a class="LogoButton-module_logo__jTsOt" href="/">
              <svg width="160" height="30" viewBox="0 0 160 30" fill="none"
                xmlns="http://www.w3.org/2000/svg" class="LogoButton-module_logoText__eu10s">
                <path
                  d="M14.9809 25.2387C9.31954 25.2387 4.71596 20.6379 4.71596 14.9801C4.71596 9.3223 9.31954 4.72159 14.9809 4.72159C20.6422 4.72159 25.2458 9.3223 25.2458 14.9801C25.2458 15.6184 25.1859 16.25 25.0728 16.855L28.5255 20.3055C29.1775 18.6567 29.5367 16.855 29.5367 14.9801C29.5367 6.96211 23.0105 0.43335 14.9809 0.43335C6.95122 0.43335 0.425049 6.96211 0.425049 14.9801C0.425049 23.0048 6.95787 29.5269 14.9809 29.5269C16.8303 29.5269 18.5932 29.1812 20.2231 28.5496L16.7571 25.0857C16.1783 25.1921 15.5863 25.2387 14.9809 25.2387Z"
                  fill="#232735"></path>
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M25.9196 25.1567L20.6537 19.887C20.0295 19.2565 19.8702 18.3406 20.1823 17.5707C20.2885 17.3119 20.4479 17.0663 20.6537 16.8606C21.4904 16.0243 22.8451 16.0243 23.6818 16.8606L28.9476 22.1303C29.7843 22.9665 29.7843 24.3204 28.9476 25.1567C28.8082 25.2961 28.6555 25.4089 28.4961 25.5018C27.6793 25.9664 26.6168 25.8536 25.9196 25.1567ZM19.7779 20.5308L25.1632 25.9133C25.9999 26.7495 25.9999 28.1034 25.1632 28.9397C25.0304 29.0724 24.891 29.1786 24.7383 29.2715C23.9148 29.756 22.8391 29.6432 22.1352 28.9397L16.8693 23.67C16.0326 22.8338 16.0326 21.4798 16.8693 20.6436C17.1283 20.3847 17.4404 20.2056 17.7658 20.106C18.4431 19.9003 19.2068 20.0396 19.7779 20.5308Z"
                  fill="url(#Logo-paint0_linear)"></path>
                <path
                  d="M49.7346 6.57175C50.5613 6.57175 51.2315 5.90201 51.2315 5.07585C51.2315 4.24969 50.5613 3.57996 49.7346 3.57996C48.9079 3.57996 48.2378 4.24969 48.2378 5.07585C48.2378 5.90201 48.9079 6.57175 49.7346 6.57175Z"
                  fill="#232735"></path>
                <path
                  d="M43.4182 8.88147C42.6758 8.88147 42.0711 9.48581 42.0711 10.2278V16.0618C42.0711 17.8389 40.6222 19.2869 38.8439 19.2869C37.0657 19.2869 35.6168 17.8389 35.6168 16.0618V10.2278C35.6168 9.48581 35.0121 8.88147 34.2696 8.88147C33.5272 8.88147 32.9225 9.48581 32.9225 10.2278V16.0618C32.9225 19.3228 35.5809 21.9795 38.8439 21.9795C40.0534 21.9795 41.179 21.6145 42.119 20.9923C42.2747 21.5607 42.7956 21.9795 43.4182 21.9795C44.1607 21.9795 44.7654 21.3752 44.7654 20.6332V16.0618V10.2278C44.7654 9.47983 44.1607 8.88147 43.4182 8.88147Z"
                  fill="#232735"></path>
                <path
                  d="M82.0126 8.88147C81.2702 8.88147 80.6655 9.48581 80.6655 10.2278V16.0618C80.6655 17.8389 79.2165 19.2869 77.4383 19.2869C75.6601 19.2869 74.2111 17.8389 74.2111 16.0618V10.2278C74.2111 9.48581 73.6064 8.88147 72.864 8.88147C72.1216 8.88147 71.5168 9.48581 71.5168 10.2278V16.0618C71.5168 19.3228 74.1752 21.9795 77.4383 21.9795C78.6477 21.9795 79.7734 21.6145 80.7134 20.9923C80.869 21.5607 81.3899 21.9795 82.0126 21.9795C82.755 21.9795 83.3598 21.3752 83.3598 20.6332V16.0618V10.2278C83.3598 9.47983 82.761 8.88147 82.0126 8.88147Z"
                  fill="#232735"></path>
                <path
                  d="M118.583 8.88147C117.841 8.88147 117.236 9.48581 117.236 10.2278V16.6302C117.236 18.0962 116.044 19.2869 114.578 19.2869C113.111 19.2869 111.919 18.0962 111.919 16.6302V10.2278C111.919 9.48581 111.314 8.88147 110.572 8.88147C109.83 8.88147 109.225 9.48581 109.225 10.2278V16.6302C109.225 18.0962 108.033 19.2869 106.567 19.2869C105.1 19.2869 103.908 18.0962 103.908 16.6302V10.2278C103.908 9.48581 103.303 8.88147 102.561 8.88147C101.819 8.88147 101.214 9.48581 101.214 10.2278V16.6302C101.214 19.5801 103.615 21.9795 106.567 21.9795C108.159 21.9795 109.59 21.2795 110.572 20.1725C111.554 21.2795 112.985 21.9795 114.578 21.9795C117.529 21.9795 119.93 19.5801 119.93 16.6302V10.2278C119.93 9.47983 119.325 8.88147 118.583 8.88147Z"
                  fill="#232735"></path>
                <path
                  d="M49.7221 8.73853C48.9797 8.73853 48.375 9.34287 48.375 10.0848V20.4903C48.375 21.2323 48.9797 21.8366 49.7221 21.8366C50.4646 21.8366 51.0693 21.2323 51.0693 20.4903V10.0848C51.0693 9.33688 50.4646 8.73853 49.7221 8.73853Z"
                  fill="#232735"></path>
                <path
                  d="M146.49 7.54114C144.735 7.54114 143.131 8.19933 141.915 9.28236C141.67 9.03105 141.328 8.87548 140.951 8.87548C140.209 8.87548 139.604 9.47982 139.604 10.2218V14.4223V24.6303C139.604 25.3722 140.209 25.9766 140.951 25.9766C141.694 25.9766 142.298 25.3722 142.298 24.6303V19.8793C143.46 20.7708 144.915 21.3034 146.49 21.3034C150.285 21.3034 153.375 18.2159 153.375 14.4223C153.375 10.6287 150.285 7.54114 146.49 7.54114ZM146.49 18.6108C144.178 18.6108 142.298 16.7319 142.298 14.4223C142.298 12.1126 144.178 10.2338 146.49 10.2338C148.801 10.2338 150.681 12.1126 150.681 14.4223C150.681 16.7319 148.801 18.6108 146.49 18.6108Z"
                  fill="#232735"></path>
                <path
                  d="M135.054 8.88146C134.677 8.88146 134.335 9.03703 134.09 9.28834C132.875 8.20531 131.27 7.54712 129.516 7.54712C125.72 7.54712 122.63 10.6347 122.63 14.4282C122.63 18.2218 125.72 21.3094 129.516 21.3094C131.09 21.3094 132.545 20.7768 133.707 19.8853V19.9631C133.707 20.705 134.311 21.3094 135.054 21.3094C135.796 21.3094 136.401 20.705 136.401 19.9631V14.4282V10.2278C136.401 9.47982 135.802 8.88146 135.054 8.88146ZM129.516 18.6108C127.205 18.6108 125.325 16.7319 125.325 14.4223C125.325 12.1126 127.205 10.2338 129.516 10.2338C131.827 10.2338 133.707 12.1126 133.707 14.4223C133.707 16.7319 131.827 18.6108 129.516 18.6108Z"
                  fill="#232735"></path>
                <path
                  d="M96.2321 13.1178C95.3939 12.3998 94.394 11.8672 93.3283 11.2988C93.2025 11.233 93.0768 11.1671 92.9511 11.0953C90.8196 9.94649 90.0652 9.16264 90.0652 8.09158C90.0652 7.64281 90.2268 7.25388 90.5442 6.93675C90.9633 6.5179 91.6099 6.27257 92.3044 6.27257H92.3104C93.472 6.27257 94.2024 6.76921 94.8431 7.20003C94.9448 7.27183 95.0466 7.33765 95.1424 7.39749C95.7651 7.80437 96.6033 7.62486 97.0045 7.00257C97.4116 6.38028 97.232 5.54257 96.6093 5.14167C96.5315 5.08782 96.4477 5.03397 96.3579 4.97413C95.5915 4.45356 94.3042 3.57996 92.3104 3.57996H92.3044C90.8974 3.57996 89.5622 4.10651 88.6402 5.02798C87.8199 5.84175 87.3709 6.93077 87.3709 8.0856C87.3709 10.7722 89.4365 12.2562 91.6698 13.4589C91.7955 13.5307 91.9272 13.5965 92.053 13.6623C94.0108 14.7094 95.2143 15.4095 95.358 16.6302C95.4238 17.2285 95.2442 17.8089 94.8371 18.2577C94.3222 18.8321 93.5199 19.1552 92.5858 19.1552C90.9932 19.1552 89.8077 18.2038 88.9396 17.5097C88.7779 17.3781 88.6282 17.2584 88.4785 17.1507C87.8798 16.7079 87.0356 16.8276 86.5925 17.42C86.1495 18.0184 86.2692 18.862 86.862 19.3048C86.9757 19.3886 87.1015 19.4903 87.2511 19.61C88.2989 20.4477 90.0472 21.8478 92.5799 21.8478C94.2922 21.8478 95.807 21.2076 96.8428 20.0528C97.7649 19.0176 98.184 17.6952 98.0283 16.325C97.8966 15.0864 97.3038 14.0333 96.2321 13.1178Z"
                  fill="#232735"></path>
                <path
                  d="M61.6078 7.54114C59.8535 7.54114 58.2489 8.19933 57.0335 9.28236C56.788 9.03105 56.4468 8.87548 56.0696 8.87548C55.3271 8.87548 54.7224 9.47982 54.7224 10.2218V14.4223V24.6303C54.7224 24.9474 54.8302 25.2346 55.0158 25.468C55.0397 25.4979 55.0697 25.5338 55.0996 25.5637C55.1535 25.6176 55.2134 25.6714 55.2732 25.7193C55.3152 25.7492 55.3571 25.7791 55.399 25.803C55.4289 25.821 55.4589 25.833 55.4888 25.8509C55.4948 25.8569 55.5008 25.8569 55.5068 25.8629C55.5247 25.8689 55.5427 25.8808 55.5666 25.8868C55.5966 25.8988 55.6205 25.9107 55.6504 25.9167C55.6624 25.9227 55.6684 25.9227 55.6804 25.9287C55.7163 25.9407 55.7522 25.9466 55.7941 25.9586H55.8001C55.8899 25.9766 55.9797 25.9885 56.0696 25.9885C56.812 25.9885 57.4167 25.3842 57.4167 24.6422V19.8913C58.5782 20.7828 60.0332 21.3154 61.6078 21.3154C65.4038 21.3154 68.4932 18.2278 68.4932 14.4342C68.4932 10.6406 65.4038 7.54114 61.6078 7.54114ZM61.6078 18.6108C59.2967 18.6108 57.4167 16.7319 57.4167 14.4223C57.4167 12.1126 59.2967 10.2338 61.6078 10.2338C63.9189 10.2338 65.7989 12.1126 65.7989 14.4223C65.7989 16.7319 63.9189 18.6108 61.6078 18.6108Z"
                  fill="#232735"></path>
                <defs>
                  <linearGradient id="Logo-paint0_linear" x1="16.2418" y1="16.2334" x2="31.1552"
                    y2="18.3306" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#5C1EE0"></stop>
                    <stop offset="1" stop-color="#1373E4"></stop>
                  </linearGradient>
                </defs>
              </svg></a><br>
              </div>
              <div>
              <span class="text-xs text-primary poly-text">polywrap</span>
              </div>
          </div>

          <div class="relative flex flex-col w-48">
            <div
              class="flex flex-row justify-between w-auto cursor-pointer network-selector align-center"
              @click="toggleNetworkSelect">
              <span
                class="flex items-center justify-center w-48 h-12 text-primary border rounded-lg connect-button button-network border-accent">{{ selectedNetwork.name }}</span>

              <img :class="networkSelectOpened ? 'mr-3 z-10 transform rotate-180' : 'mr-3 z-10'" src="@/assets/arrow-down.png"  style="height: 1em; margin-top: 1em;"/>
              
            </div>

            <div class="absolute flex flex-col justify-end w-48" style="top: 4rem;"
              v-if="networkSelectOpened">
              <button
                class="flex items-center justify-center w-48 h-12 my-1 text-primary border rounded-lg cursor-pointer connect-button network-item border-accent"
                :class="net.disabled ? 'opacity-50' : ''" v-for="net in allNetworks" :key="net.id"
                @click="() => selectNetwork(net)" :disabled="net.disabled">
                {{ net.name }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center py-10 lg:py-0">
          <!-- <router-link to="/">
            <h1 class="text-xl font-medium tracking-tight text-gray-300">
              QuipuSwap <span class="text-xs text-primary">polywrap</span>
            </h1>
          </router-link> -->

          <!-- <img class="w-auto h-32" src="./assets/logo.png" /> -->


                <div class="mb-4">
                  <div class="p-4 bg-accent rounded text-white whitespace-normal font-medium center">
                    Hello! This is a demo version of QuipuSwap using Polywrap.
                    <br />
                    <!-- You use this app on the mainnet at your own risk. -->
                    This is a Token-to-Token exchange. 
                    <br />
                    To swap make sure your input token balance is not empty. 
                    <br />
                    Visit <a href="https://ithacanet.quipuswap.com/"> <b style="color: #5b61f6;"> Quipu Swap V2 </b> </a> top up wallet.
                  </div>
                </div>

        </div>

        <div class="flex justify-end flex-1 pt-4">
          <div class="lg:block">
            <template v-if="!account.pkh">
              <div class="flex flex-col">
                <button
                  class="flex items-center w-64 h-12 mb-4 text-primary transition duration-300 ease-in-out border rounded-md border-accent hover:text-accent"
                  @click="handleConnectTemple">
                  <div class="flex justify-center flex-1">
                    <img src="@/assets/temple.png" alt="" class="w-auto h-8" />
                  </div>
                  <div class="primary">
                    Connect Temple
                  </div>
                  <div class="flex-1" />
                </button>

                <!-- <button
                  class="flex items-center w-64 h-12 text-primary transition duration-300 ease-in-out border rounded-md border-primary hover:text-primary"
                  @click="handleConnectBeacon">
                  <div class="flex justify-center flex-1">
                    <img src="@/assets/beacon.png" alt="" class="w-auto h-6" />
                  </div>
                  <div class="text-sm primary">
                    Connect another wallet
                  </div>
                  <div class="flex-1"/>
                </button> -->
              </div>
            </template>

            <template v-else>
              <div class="flex flex-row justify-center w-auto">
                <span
                  class="flex items-center justify-center h-12 px-4 text-primary border rounded-lg connect-button button-balance border-accent">
                  <span v-if="accountBalance">{{ accountBalance }} XTZ</span>
                  <div v-else class="flex items-center justify-center">
                    <Loader />
                  </div>
                </span>

                <div
                  class="flex items-center justify-center w-64 h-12 px-4 text-primary border border-l-0 rounded-md cursor-pointer connect-button button-pkh border-accent"
                  @mouseover="accountLabelHovered = true" @mouseleave="accountLabelHovered = false"
                  @click="handleReconnect">
                  <span>{{ accountLabel }}</span>
                </div>
              </div>
            </template>

            <div v-if="account.pkh" class="flex items-center mt-3">
              <div class="flex-1"></div>
              <button
                class="flex items-center justify-center h-8 px-4 text-primary border rounded-md cursor-pointer connect-button border-accent hover:text-accent"
                @click="logout">Sign Out</button>
            </div>
          </div>
        </div>
      </header>

      <router-view />
    </div>

    <div class="flex-1"></div>

    <div class="flex flex-col items-center justify-center p-4 mt-10">
      <div class="p-4 text-sm font-light text-center text-white">
        <a href="https://twitter.com/madfishofficial" target="_blank" rel="noopener noreferrer"
          class="px-4">
          Twitter
        </a>
        |
        <a href="https://t.me/MadFishCommunity" target="_blank" rel="noopener noreferrer"
          class="px-4">
          Telegram
        </a>
        |
        <a href="https://www.madfish.solutions/discord" target="_blank" rel="noopener noreferrer"
          class="px-4">
          Discord
        </a>
        |
        <a href="https://www.reddit.com/r/MadFishCommunity" target="_blank"
          rel="noopener noreferrer" class="px-4">
          Reddit
        </a>
        |
        <a href="https://madfish.crunch.help/quipu-swap" target="_blank" rel="noopener noreferrer"
          class="px-4">
          FAQ
        </a>
        |
        <a href="https://docs.quipuswap.com" target="_blank" rel="noopener noreferrer" class="px-4">
          Docs
        </a>
        |
        <router-link class="px-4" to="/disclaimer">
          Disclaimer
        </router-link>
        |
        <a href="https://story.madfish.solutions/madfish-subscription-form" target="_blank"
          rel="noopener noreferrer" class="px-4">
          Subscribe
        </a>
      </div>
      <span class="text-sm font-light text-primary">
        Made with
        <span role="img" aria-label="Madfish Solutions">❤️</span> by <a href="https://blockwatch.cc/" target="_blank" rel="noopener noreferrer"
          class="font-normal hover:underline" style="color: #98c630">Blockwatch.cc</a> copied from
        <a href="https://madfish.solutions" target="_blank" rel="noopener noreferrer"
          class="font-normal hover:underline" style="color: #98c630">Madfish.Solutions</a>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Watch
  } from "vue-property-decorator";
  import Loader from "@/components/Loader.vue";
  import {
    ALL_NETWORKS,
    XTZ_TOKEN,
    QSNetwork,
    getBalance,
    getNetwork,
    setNetwork,
  } from "@/core";
  import {
    getAccount,
    signout,
    useWallet,
    connectTempleWalletWrapper,
    getTokenPairs,
  } from "@/store";


  @Component({
    components: {
      Loader
    },
  })

  export default class App extends Vue {
    
    networkSelectOpened = false;
    selectedNetwork = getNetwork();


    accountBalance: string | null = null;
    accountLabelHovered = false;

    get V1_0Url() {
      return process.env.VUE_APP_OLD_QUIPUSWAP_URL;
    }

    get allNetworks() {
      return ALL_NETWORKS;
    }

    get account() {
      return getAccount();
    }

    get accountLabel() {
      if (this.accountLabelHovered) return `Change account`;
      if (!this.account.pkh) return "";

      const ln = this.account.pkh.length;
      return [
        this.account.pkh.slice(0, 9),
        "...",
        this.account.pkh.slice(ln - 7, ln),
      ].join("");
    }

    async created() {
      this.loadAccBalance();
      await getTokenPairs();
    }

    @Watch("account")
    onAccountChange() {
      this.loadAccBalance();
    }

    async loadAccBalance() {
      this.accountBalance = null;
      if (this.account.pkh) {
        const bal = await getBalance(this.account.pkh, XTZ_TOKEN);
        this.accountBalance = bal.toFormat(2);
      }
    }

    toggleNetworkSelect() {
      this.networkSelectOpened = !this.networkSelectOpened;
    }

    selectNetwork(net: QSNetwork) {
      if (net.disabled) return;

      this.networkSelectOpened = false;
      this.selectedNetwork = net;

      if (getNetwork().id !== net.id) {
        setNetwork(net);
      }
    }

    

    handleConnectTemple() {
      // this.connectWallet("temple", true);
      connectTempleWalletWrapper();
    }

    handleConnectBeacon() {
      this.connectWallet("beacon", true);
    }

    handleReconnect() {
      this.connectWallet(undefined, true);
    }

    logout() {
      signout();
    }

    connectWallet = async (connectType ? : "temple" | "beacon", forcePermission = false) => {
      try {
        await useWallet(connectType, forcePermission);
      } catch (err) {
        console.error(err);
      }
    };
  }

</script>

<style lang="scss">
  html {
    // background-color: #151a28;
    // background-image: linear-gradient(203.07deg, #151a28 21.27%, #242f4e 92.17%);
    // background-repeat: no-repeat;
  }

  html,
  body,
  #app {
    min-height: 100vh;
  }

  button {
    outline: none;
  }

  #app {
    background: url("assets/lines.png") 100%;
    background-size: 100%, cover;
    background-position: 0 0, 50%;
    font-family: "Roboto", sans-serif;
  }

  .connect-button {
    background: #fff;
  }

  .button-balance {
    margin-right: -10px;
    z-index: 1;
  }

  .button-network {
    margin-right: -30px;
    z-index: 1;
  }

  .network-selector:hover {
    .button-network {
      background: rgb(42, 50, 92);
      transition-duration: 0.2s;
    }
  }

  .network-item:hover {
    background: rgb(42, 50, 92);
    transition-duration: 0.2s;
  }

  .text-primary{
    color: #8792b2;
  }

  .poly-text{
    position: relative;
    top: 25px;
    left: -60px;
    font-size: 0.8em;
  }

  .center{
    text-align: center;
  }
  

</style>
