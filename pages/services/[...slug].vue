<template>
  <div class="single-services" v-if="data">
    <hero :content="data" :img="img" :container="true" />
    <blockTxt :data="data.content.rendered" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "~/api/api";

import blockTxt from "../../components/templates/block-txt.vue";
import hero from "../../components/templates/hero.vue";

const route = useRoute();
const data = ref<any>(null);
const img = ref<any>(null);

const getServiceSingle = async () => {
  try {
    const response = await api.get(`/wp-json/wp/v2/service?slug=${route.params.id}`);
    if (response.data && response.data.length > 0) {
      data.value = response.data[0];
      await getPostImg();
    }
  } catch (error) {
    console.error("Ошибка при получении статьи:", error);
  }
};

const getPostImg = async () => {
  if (!data.value?.featured_media) return;
  try {
    const response = await api.get(`/wp-json/wp/v2/media/${data.value.featured_media}`);
    img.value = response.data;
    console.log(img.value.source_url);
  } catch (error) {
    console.error("Ошибка при получении изображения:", error);
  }
};

onMounted(() => {
  getServiceSingle();
});
</script>

<style scoped></style>
