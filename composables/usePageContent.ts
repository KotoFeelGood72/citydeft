// ~/composables/usePageContent.ts
import { ref, onMounted } from "vue";
import { api } from "~/api/api";

/**
 * Загружает данные по slug из WP REST API.
 *
 * @param slug — slug ресурса (например, 'reviews', 'procedure' или 'my-service')
 * @param resource — какой ресурс грузить: 'pages', 'posts' или кастомный 'service' (по умолчанию 'pages')
 */
export function usePageContent(
  slug: string,
  resource: "pages" | "posts" | "service" = "pages"
) {
  const data = ref<any>(null);

  /**
   * Выполняет загрузку.
   * @param newSlug — можно переопределить slug
   * @param newResource — можно переопределить тип ресурса
   */
  const load = async (
    newSlug: string = slug,
    newResource: "pages" | "posts" | "service" = resource
  ) => {
    try {
      // endpoint для кастомного типа 'service' — wp/v2/service
      const endpoint = `/wp/v2/${newResource}`;
      const response = await api.get<any[]>(`${endpoint}?slug=${newSlug}`);
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
