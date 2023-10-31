// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "nuxt-electron",
    "@nuxt/ui"
  ],
  electron: {
    build: [
      {
        entry: "electron/main.ts"
      }
    ]
  },
  css: [
    "~/assets/css/global.css"
  ],
  dir: {
    public: "static",
    pages: "routes"
  },
  ui: {
    icons: [
      "mdi"
    ]
  }
})