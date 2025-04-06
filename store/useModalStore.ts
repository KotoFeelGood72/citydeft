import { defineStore, storeToRefs } from "pinia";

export const useModalStore = defineStore("modal", {
  state: (): { modals: any } => ({
    modals: {
      form: false,
      burger: false,
    },
  }),
  actions: {
    openModal(modalName: any) {
      this.modals[modalName] = !this.modals[modalName];
    },
    closeModal(modalName: any): void {
      this.modals[modalName] = false;
    },
    closeAllModals() {
      Object.keys(this.modals).forEach((modalName) => {
        this.modals[modalName as keyof any] = false;
      });
    },
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());
