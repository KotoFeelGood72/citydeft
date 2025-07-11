<template>
  <div class="pages">
    <Header />
    <main class="main">
      <slot />
    </main>
    <actions v-if="isFormPages" :forms="isFormPages" :data="data" />
    <transition name="translate">
      <modal-form v-if="activeModal === 'form'" />
    </transition>
    <transition name="translate">
      <modal-burger v-if="activeModal === 'burger'" :modal="data" />
    </transition>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { useModalStoreRefs, useModalStore } from "~/store/useModalStore";
import Header from "~/components/templates/Header.vue";
import Footer from "~/components/templates/Footer.vue";
import actions from "~/components/blocks/actions.vue";
import modalForm from "~/modal/modal-form.vue";
import modalBurger from "~/modal/modal-burger.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const { modals } = useModalStoreRefs();
const { closeAllModals } = useModalStore();

const activeModal = computed(() => {
  return Object.entries(modals.value).find(([_, isActive]) => isActive)?.[0] || null;
});

const isFormPages = computed(() => {
  const pages = ["/", "/about", "/about/", "/about/company", "/about/company/"];
  return !pages.includes(route.path);
});

const data = ref<any>(null);

watch(
  () => route.path,
  () => closeAllModals()
);
</script>

<style lang="scss" scoped></style>
