// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      straveClientId: process.env.STRAVA_CLIENT_ID,
      stravaRedirectUri: process.env.STRAVA_REDIRECT_URI,
    },
    stravaClientSecret: process.env.STRAVA_CLIENT_SECRET,
  },
});
