// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  ui: {
    icons: [
      "lucide"
    ]
  }
});