import { useHead, useRoute } from "#imports";
import { api } from "~/api/api";

// тип данных: или страница, или категория
type SeoTargetType = "page" | "category";

export const useSeoMeta = async (id: number, type: SeoTargetType = "page") => {
  const route = useRoute();
  const locale =
    typeof route.params.locale === "string" ? route.params.locale : "ru";

  const endpoint =
    type === "category"
      ? `/seo/v1/category/${id}?lang=${locale}`
      : `/seo/v1/page/${id}?lang=${locale}`;

  const { data, error } = await useAsyncData(`seo-${type}-${id}`, async () => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (err: any) {
      console.warn(`SEO API (${type}) error:`, err);
      throw err;
    }
  });

  if (error.value) return;

  const seo = data.value;

  if (seo) {
    useHead({
      title: seo.title,
      meta: [
        { name: "description", content: seo.description },
        { name: "keywords", content: seo.keywords },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:url", content: seo.permalink },
      ],
      link: [{ rel: "canonical", href: seo.permalink }],
    });
  }
};
