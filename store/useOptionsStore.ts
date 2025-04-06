import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";

export const useOptionsStore = defineStore("options", {
  state: () => ({
    options: null as any,
  }),

  actions: {
    async getOptions() {
      try {
        const response = await api.get("/acf/v3/options/options");
        this.options = response.data.acf;
      } catch (error) {}
    },
  },
});

export const useOptionsStoreRefs = () => storeToRefs(useOptionsStore());
