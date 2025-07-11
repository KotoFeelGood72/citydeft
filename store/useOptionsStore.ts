import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";

export const useOptionsStore = defineStore("options", {
  state: () => ({
    options: null as any,
  }),

  actions: {
    async getOptions() {
      try {
        const { locale } = useI18n();
        const lang = locale.value;
        const { data } = await api.get("/site/v1/options", {
          params: { lang: locale.value },
        });

        this.options = data.acf;
      } catch (e) {
        console.error("options fetch error:", e);
      }
    },
  },
});

export const useOptionsStoreRefs = () => storeToRefs(useOptionsStore());
