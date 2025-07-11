import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";

// store/useOptionsStore.ts
export const useOptionsStore = defineStore("options", {
  state: () => ({
    options: null as any,
  }),

  actions: {
    async getOptions(lang: string) {
      try {
        const { data } = await api.get("/site/v1/options", {
          params: { lang },
        });
        this.options = data.acf;
      } catch (e) {
        console.error("options fetch error:", e);
      }
    },
  },
});

export const useOptionsStoreRefs = () => storeToRefs(useOptionsStore());
