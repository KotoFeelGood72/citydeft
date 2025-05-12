<template>
  <div class="single-services" v-if="service">
    <hero :content="service" :img="img" :container="true" />
    <block-txt :data="service.content.rendered" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePageContent } from "~/composables/usePageContent";
import hero from "@/components/templates/hero.vue";
import blockTxt from "@/components/templates/block-txt.vue";
import { api } from "~/api/api";

interface Media {
  source_url: string;
  [key: string]: any;
}

// получаем slug из маршрута
const route = useRoute();
const slug = route.params.slug as string;

// используем общую функцию для загрузки кастомного типа 'service'
const { data: service, load } = usePageContent(slug, "service");

const img = ref<Media | null>(null);

// при появлении featured_media — грузим картинку
watch(
  () => service.value?.featured_media,
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

// запускаем первоначальную загрузку данных
onMounted(() => {
  load();
});
</script>
