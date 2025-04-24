// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],

  supabase: {
    redirect: false,
  },

  runtimeConfig: {
    public: {
      supabaseRedirectUrl: process.env.SUPABASE_REDIRECT_URL,
      straveClientId: process.env.STRAVA_CLIENT_ID,
      stravaRedirectUrl: process.env.STRAVA_REDIRECT_URL,
    },
    stravaClientSecret: process.env.STRAVA_CLIENT_SECRET,
  },
});
