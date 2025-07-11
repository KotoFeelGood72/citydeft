import { ref, onMounted } from "vue";
import { api } from "~/api/api";

/**
 * Загружает данные по slug из WP REST API.
 *
 * @param slug — slug ресурса (например, 'reviews', 'procedure' или 'my-service')
 * @param resource — тип ресурса: 'pages', 'posts' или кастомный 'service' (по умолчанию 'pages')
 * @param lang — язык (например, 'en', 'ru'), пробрасывается как параметр ?lang=...
 */
export function usePageContent(
  slug: string,
  resource: "pages" | "posts" | "service" = "pages",
  lang?: string
) {
  const data = ref<any>(null);

  /**
   * Выполняет загрузку.
   * @param newSlug — можно переопределить slug
   * @param newResource — можно переопределить тип ресурса
   * @param newLang — можно переопределить язык
   */
  const load = async (
    newSlug: string = slug,
    newResource: "pages" | "posts" | "service" = resource,
    newLang: string = lang || ""
  ) => {
    try {
      const endpoint = `/wp/v2/${newResource}`;
      const response = await api.get<any[]>(`${endpoint}`, {
        params: {
          slug: newSlug,
          ...(newLang ? { lang: newLang } : {}), // добавляем ?lang=... если передан
        },
      });

      data.value = Array.isArray(response.data)
        ? response.data[0] || null
        : response.data;
    } catch (e) {
      console.error("usePageContent error:", e);
      data.value = null;
    }
  };

  onMounted(load);

  return { data, load };
}
