<template>
  <div class="single-services" v-if="page">
    <Hero :content="page" :img="img" :container="true" />
    <BlockTxt :data="page.content.rendered" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { usePageContent } from "~/composables/usePageContent";
import { api } from "~/api/api";

import Hero from "@/components/templates/hero.vue";
import BlockTxt from "@/components/templates/block-txt.vue";
import { useRoute } from "vue-router";
import { useSeoMeta } from "@/composables/useSeoMeta";

const route = useRoute();

interface Media {
  source_url: string;
  [key: string]: any;
}

// вместо локального data используем composable
const { data: page, load } = usePageContent("procedure", "pages");
const img = ref<Media | null>(null);

// при изменении featured_media — грузим изображение
watch(
  () => page.value?.featured_media,
  async (mediaId) => {
    if (!mediaId) {
      img.value = null;
      return;
    }
    try {
      const res = await api.get<Media>(`/wp/v2/media/${mediaId}`);
      img.value = res.data;
    } catch (e) {
      console.error("Ошибка при получении изображения:", e);
    }
  }
);

watch(
  () => route,
  () => {
    useSeoMeta(82);
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  load(); // загрузим страницу
});

watch(
  () => route,
  () => {
    useSeoMeta(1388);
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="scss">
/* ваша стилизация */
</style>
