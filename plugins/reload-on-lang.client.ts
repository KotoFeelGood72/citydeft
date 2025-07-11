// plugins/i18n-switch.client.ts
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  // работаем только в браузере
  if (!process.client) return;

  const { $i18n, $router, $switchLocalePath } = nuxtApp;
  // $switchLocalePath — тот же helper, что и useSwitchLocalePath()

  $i18n.onLanguageSwitched = (_old, newLocale) => {
    // Генерируем корректный путь с учётом strategy (prefix / prefix_except_default)
    const targetPath = $switchLocalePath(newLocale);

    // «Мягкая» навигация — Nuxt сам перерисует страницу в новом locale
    // если нужна полная перезагрузка — добавь .then(() => window.location.reload())
    $router.replace(targetPath);
  };
});
