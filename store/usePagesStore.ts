import { defineStore, storeToRefs } from "pinia";

export const usePagesStore = defineStore("pages", {
  state: () => ({
    likes: 1 as any,
  }),

  actions: {
    addLike(product: { id: number | string; [key: string]: any }) {
      const exists = this.likes.find((p: any) => p.id === product.id);
      if (!exists) {
        this.likes.push(product);
      }
    },

    removeLike(productId: number | string) {
      this.likes = this.likes.filter(
        (product: any) => product.id !== productId
      );
    },
  },
});

export const usePagesStoreRefs = () => storeToRefs(usePagesStore());
