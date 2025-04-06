<template>
  <div class="pages">
    <Header />
    <main class="main">
      <slot />
    </main>
    <actions v-if="isFormPages" :forms="isFormPages" :data="data" />
    <transition name="translate">
      <modal-form v-if="isModalActive" />
    </transition>
    <transition name="translate">
      <modal-burger v-if="isModalActive" :modal="data" />
    </transition>
    <Footer v-if="data && data.acf" :data="data?.acf" />
    <!-- <transition name="translate"> -->
    <!-- <loader v-if="isLoading" /> -->
    <!-- </transition> -->
    <yandex />
  </div>
</template>

<script lang="ts" setup>
import yandex from "@/components/templates/yandex.vue";
import { useModalStoreRefs } from "~/store/useModalStore";
import Header from "~/components/templates/Header.vue";
import Footer from "~/components/templates/Footer.vue";
import actions from "~/components/blocks/actions.vue";
import modalForm from "~/modal/modal-form.vue";
import modalBurger from "~/modal/modal-burger.vue";
import { api } from "~/api/api";
import { useRoute } from "vue-router";
import { useOptionsStore, useOptionsStoreRefs } from "~/store/useOptionsStore";

const { getOptions } = useOptionsStore();
const { options } = useOptionsStoreRefs();
const route = useRoute();
const { modals } = useModalStoreRefs();

const isModalActive = computed(() => {
  return Object.values(modals.value).some((isActive) => isActive);
});

const isFormPages = computed(() => {
  const pages = ["/", "/about", "/about/", "/about/company", "/about/company/"];
  return !pages.includes(route.path);
});

const data = ref<any>(null);

const getContent = async () => {
  const res = await api.get("/acf/v3/options/options");
  data.value = res;
};

onMounted(() => {
  // getContent();
  getOptions();
});
</script>

<style lang="scss" scoped></style>
