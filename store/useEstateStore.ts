// stores/estate.ts
import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";
import { useI18n } from "vue-i18n";

export const useEstateStore = defineStore("estates", {
  state: () => ({
    allList: [] as any[],
    list: [] as any[],
    total: 0,
    totalPages: 0,
    one: null as any,
    loading: false,
    error: null as unknown,
  }),

  actions: {
    /* ------------------------------------------------------------------
     *  fetchEstates() – универсальный список
     *  filters — любой набор query-параметров REST
     *  opts    — page / per_page / lang перегружают дефолты
     * ------------------------------------------------------------------ */
    async fetchEstates(
      filters: any = {},
      opts: { page?: number; per_page?: number; lang?: string } = {}
    ) {
      this.loading = true;
      this.error = null;

      try {
        const { locale } = useI18n();

        const params: any = {
          lang: opts.lang ?? locale.value,
          page: opts.page ?? 1,
          per_page: opts.per_page ?? 10,
          ...filters,
        };

        const { data, headers } = await api.get("/estate/v1/objects", {
          params,
        });

        this.allList = data;
        this.total = Number(headers["x-wp-total"] ?? 0);
        this.totalPages = Number(headers["x-wp-totalpages"] ?? 0);
      } catch (e) {
        this.error = e;
        console.error("estate fetch error:", e);
      } finally {
        this.loading = false;
      }
    },

    /* ------------------------------------------------------------------
     *  Случайные N объектов
     * ------------------------------------------------------------------ */
    async fetchRandom(count = 4, extra: any = {}) {
      return this.fetchEstates(
        { orderby: "rand", ...extra },
        { per_page: count }
      );
    },

    /* ------------------------------------------------------------------
     *  Один объект по ID
     * ------------------------------------------------------------------ */
    async fetchOne(id: number, lang?: string) {
      this.loading = true;
      this.error = null;
      this.one = null;

      try {
        const { locale } = useI18n();
        const { data } = await api.get("/estate/v1/objects", {
          params: { id, lang: lang ?? locale.value },
        });
        this.one = data;
      } catch (e) {
        this.error = e;
        console.error(`estate ${id} fetch error:`, e);
      } finally {
        this.loading = false;
      }
    },

    /* ------------------------------------------------------------------
     *  Список/один объект по meta-полю
     *    metaKey   — имя поля   (например 'feature_id')
     *    value     — искомое значение
     *    single    — вернуть только первый найденный
     * ------------------------------------------------------------------ */
    async fetchByMeta(
      metaKey: string,
      value: string | number,
      { single = false, lang }: { single?: boolean; lang?: string } = {}
    ) {
      await this.fetchEstates(
        { meta_key: metaKey, meta_value: value },
        { per_page: single ? 1 : undefined, lang }
      );

      if (single) this.one = this.list[0] ?? null;
    },

    /* ------------------------------------------------------------------
     *  Пример «избранных» (feature_id = 1)
     * ------------------------------------------------------------------ */
    async fetchFeatured() {
      return this.fetchByMeta("feature_id", 1);
    },
  },
});

export const useEstateStoreRefs = () => storeToRefs(useEstateStore());
