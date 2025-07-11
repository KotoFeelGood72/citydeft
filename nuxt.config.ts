// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_mixins.scss" as *;
            @use "~/assets/scss/_variables.scss" as *;
          `,
        },
      },
    },
  },

  modules: ["@nuxt/image", "@pinia/nuxt", "@nuxtjs/i18n"],

  image: {
    quality: 70,
    dir: "assets/img",
  },

  i18n: {
    lazy: true,
    locales: [
      { code: "en", file: "en.json", name: "English" },
      { code: "ru", file: "ru.json", name: "Русский" },
      { code: "tr", file: "tr.json", name: "Türkçe" },
    ],
    defaultLocale: "ru",
    strategy: "prefix_except_default",
  },

  app: {
    head: {
      titleTemplate: "%s - CityDeft",
      title: "CityDeft — Недвижимость в Турции",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Покупка недвижимости в Турции с помощью CityDeft. ВНЖ, гражданство, юридическое сопровождение.",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "yandex-verification", content: "787bf9ec3295557e" },
        { property: "og:title", content: "CityDeft — Недвижимость в Турции" },
        {
          property: "og:description",
          content:
            "Продажа квартир, вилл и коммерческой недвижимости в Турции. Легализация, документы, ВНЖ.",
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ru_RU" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
