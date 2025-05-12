<template>
  <div class="articles">
    <div class="container">
      <div class="articles-main">
        <SectionTitle title="Статьи" class="big" :level="1" />

        <ul class="articles-list grid-3">
          <li v-for="(item, i) in posts" :key="`news-item-${i}`">
            <ArticleCard :data="item" />
          </li>
        </ul>

        <VueAwesomePaginate
          v-if="totalPages > 1"
          :page-count="totalPages"
          :click-handler="onPageChange"
          :page-range="3"
          :prev-text="'‹‹'"
          :next-text="'››'"
          container-class="global-paginate"
          page-class="paginate-page"
          active-page-class="paginate-page--active"
          prev-class="paginate-prev"
          next-class="paginate-next"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import SectionTitle from "~/components/ui-kit/section-title.vue";
import ArticleCard from "~/components/templates/article-card.vue";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import { api } from "~/api/api";

const route = useRoute();
const router = useRouter();

const page = ref(parseInt(route.query.page as string) || 1);
const totalPages = ref(0);
const posts = ref<any[]>([]);

async function fetchPosts(pageNum = page.value) {
  try {
    const res = await api.get("/wp/v2/posts", {
      params: {
        per_page: 6,
        page: pageNum,
        categories: 11,
        _embed: "wp:term",
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
