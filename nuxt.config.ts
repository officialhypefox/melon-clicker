// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    preference: "dark"
  },
  modules: [
    "@nuxt/ui"
  ],
  css: [
    "~/assets/css/global.css"
  ],
  dir: {
    public: "static",
    pages: "routes"
  },
  compatibilityDate: "2024-08-05"
});