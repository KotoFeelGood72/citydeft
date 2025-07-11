<template>
  <div class="articles">
    <div class="container">
      <div class="articles-main">
        <section-title :title="$t('ui.newsTitle')" class="big" :level="1" />
        <ul class="articles-list grid-3">
          <li v-for="(item, i) in data" :key="'news-item-' + i">
            <article-card :data="item" />
          </li>
        </ul>
        <Pagination v-model="page" :total-pages="pages" :max-visible-pages="5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "~/api/api";
import Pagination from "~/components/ui-kit/Pagination.vue";

import sectionTitle from "@/components/ui-kit/section-title.vue";
import articleCard from "@/components/templates/article-card.vue";

const route = useRoute();
const data = ref<any>([]);
const page = ref(1);
const pages = ref<any>(1);

useHead({
  title: "Новости",
});
const getNewsList = async (currentPage: number = page.value) => {
  try {
    const response = await api.get("/wp/v2/posts", {
      params: {
        per_page: 6,
        page: currentPage,
        categories: 1,
        _embed: true,
      },
    });
    pages.value = parseInt(response.headers["x-wp-totalpages"]);
    data.value = response.data;
  } catch (error) {
    console.error("Ошибка при получении списка новостей:", error);
  }
};

onMounted(() => {
  getNewsList();
});

watch(page, (newPage) => {
  getNewsList(newPage);
});

watch(
  () => route.fullPath,
  () => {
    getNewsList();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.articles {
  padding-top: 7.2rem;
}

.articles-main {
  .big {
    text-align: center;
    margin-bottom: 4.5rem;
  }
}

.articles-list {
  margin-bottom: 8.5rem;
}

.articles-main {
  margin-bottom: 5rem;
  .global-paginate {
    justify-content: center;
  }
}
</style>
