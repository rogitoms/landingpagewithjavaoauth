import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // CSS Configuration
  css: ['~/assets/css/main.css'],

  // Vite Plugins Configuration
  vite: {
    plugins: [tailwindcss()],
  },

  // 🔹 Nitro's Built-in Proxy Configuration (Fixed for Latest Nuxt 3)
  nitro: {
    routeRules: {
      '/api/**': { proxy: 'http://localhost:5000/api/**' },
    },
  },
});
