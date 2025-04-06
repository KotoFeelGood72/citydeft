<template>
  <div class="articles">
    <div class="container">
      <div class="articles-main">
        <section-title title="Новости" class="big" />
        <ul class="articles-list grid-3">
          <li v-for="(item, i) in data" :key="'news-item-' + i">
            <article-card :data="item" />
          </li>
        </ul>
        <paginate
          v-if="pages && pages > 1"
          :page-count="pages"
          :page-range="3"
          v-model="page"
          :container-class="'global-paginate'"
          :prev-class="'paginate-prev'"
          :next-class="'paginate-next'"
        >
        </paginate>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    sectionTitle: () => import("@/components/ui-kit/section-title"),
    articleCard: () => import("@/components/templates/article-card"),
  },
  data() {
    return {
      data: {},
      page: 1,
      pages: null,
    };
  },
  methods: {
    async GetNewsList(page = this.page) {
      const response = await this.$axios.get(`/api/wp-json/wp/v2/posts`, {
        params: {
          per_page: 6,
          page: page,
          categories: 1,
          _embed: "wp:term",
        },
      });
      this.pages = parseInt(response.headers["x-wp-totalpages"]);
      this.data = response.data;
    },
  },
  mounted() {
    this.GetNewsList();
  },
  watch: {
    page(newPage) {
      this.GetNewsList(newPage);
    },
    $route: {
      immediate: true,
      handler() {
        this.GetNewsList();
      },
    },
  },
};
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
