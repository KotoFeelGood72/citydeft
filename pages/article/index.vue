<template>
  <div class="articles">
    <div class="container">
      <div class="articles-main">
        <SectionTitle :title="$t('ui.articlesTitle')" class="big" :level="1" />

        <ul class="articles-list grid-3">
          <li v-for="(item, i) in posts" :key="`news-item-${i}`">
            <ArticleCard :data="item" />
          </li>
        </ul>

        <Pagination v-model="page" :total-pages="totalPages" :max-visible-pages="5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import SectionTitle from "~/components/ui-kit/section-title.vue";
import ArticleCard from "~/components/templates/article-card.vue";
import Pagination from "~/components/ui-kit/Pagination.vue";
import { api } from "~/api/api";

const route = useRoute();
const router = useRouter();

const page = ref(parseInt(route.query.page as string) || 1);
const totalPages = ref(0);
const currentPage = ref(0);
const posts = ref<any[]>([]);

async function fetchPosts(pageNum = page.value) {
  try {
    const res = await api.get("/wp/v2/posts", {
      params: {
        per_page: 6,
        page: pageNum,
        categories: 11,
        _embed: true,
      },
    });
    posts.value = res.data;
    totalPages.value = parseInt(res.headers["x-wp-totalpages"] || "0");
  } catch (err) {
    console.error("Ошибка при получении списка статей:", err);
  }
}

function onPageChange(newPage: number) {
  page.value = newPage;
}

watch(page, (newPage) => {
  router.replace({ query: { ...route.query, page: newPage } });
  fetchPosts(newPage);
});

watch(
  () => route.query.page,
  (newQ) => {
    const p = parseInt(newQ as string) || 1;
    if (p !== page.value) page.value = p;
  }
);

onMounted(() => {
  fetchPosts(page.value);
});

useHead({
  title: "Статьи",
});
</script>

<style scoped lang="scss">
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

/* стили пагинации */
.global-paginate {
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
}

.paginate-prev,
.paginate-next,
.paginate-page {
  cursor: pointer;
}

.paginate-page--active {
  font-weight: bold;
  pointer-events: none;
}
</style>
