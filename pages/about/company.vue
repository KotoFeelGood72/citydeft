<template>
  <div class="about" v-if="page && options">
    <hero :content="page" :img="img" :small="true" classes="container" />
    <services :data="options" class="mb8" />
    <partners :title="options.partners.title" :partners_list="options.partners.list" />
    <documents
      :title="options.documents.title"
      :documents_list="options.documents.list"
    />
    <questions class="home-questions" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { usePageContent } from "~/composables/usePageContent";
import hero from "~/components/templates/hero.vue";
import services from "~/components/blocks/services.vue";
import partners from "~/components/blocks/partners.vue";
import documents from "~/components/blocks/documents.vue";
import questions from "~/components/blocks/questions.vue";
import { useOptionsStoreRefs } from "~/store/useOptionsStore";
import { api } from "~/api/api";

// Основной контент страницы
const { data: page, load } = usePageContent("about", "pages");
const { options } = useOptionsStoreRefs();
// Состояния
const img = ref<any>(null);
const contents = ref(null);

// Загрузка картинки поста
const getPostImg = async (mediaId: number) => {
  if (!mediaId) return;
  try {
    const response = await api.get(`/wp/v2/media/${mediaId}`);
    img.value = response.data;
  } catch (error) {
    console.error("Ошибка при получении изображения:", error);
  }
};

// Загрузка ACF-опций
// const getContent = async () => {
//   try {
//     const res = await $fetch("/api/wp-json/acf/v3/options/options");
//     contents.value = res.acf;
//   } catch (e) {
//     console.error("Ошибка при получении опций:", e);
//   }
// };

// Инициализация данных
onMounted(async () => {
  await load(); // загрузка страницы из composable
  if (page.value?.featured_media) {
    await getPostImg(page.value.featured_media);
  }
  // await getContent();
});

watchEffect(() => {
  useSeoMeta(838);
});
</script>

<style scoped lang="scss">
.mb8 {
  margin-bottom: 8rem;
  @include bp($point_4) {
    margin-bottom: 6rem;
  }
}

.home-questions {
  margin-bottom: -3.7rem;
}
</style>
