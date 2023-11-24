// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: "Linea - Web3Modal - Nuxt 3",
    },
  },
  ssr: false,
  devtools: { enabled: true },
  appConfig: {
    walletConnectProjectID: process.env.WALLET_CONNECT_PROJECT_ID,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
