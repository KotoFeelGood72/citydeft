<template>
  <div class="shop">
    <v-filter :isOpen="true" />
    <div class="shops">
      <div class="container">
        <div class="shop__main">
          <section-title title="Результаты поиска" class="big" />
          <ul class="grid-3" v-if="filtered">
            <li v-for="(item, i) in filtered" :key="'shop-filters-' + i">
              <products-card :data="item" />
            </li>
          </ul>
          <ul class="grid-3" v-else>
            <li v-for="(item, i) in estate" :key="'shop-filters-' + i">
              <products-card :data="item" />
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
  </div>
</template>

<script>
import productsCard from "@/components/templates/products-card";
import vFilter from "@/components/templates/v-filter";
import sectionTitle from "@/components/ui-kit/section-title";
export default {
  components: {
    vFilter,
    sectionTitle,
    productsCard,
  },
  data() {
    return {
      page: 1,
      pages: null,
      estate: [],
      filtered: null,
    };
  },
  watch: {
    page(newPage) {
      this.result(newPage);
    },
    $route: {
      immediate: true,
      handler() {
        this.result();
      },
    },
  },
  methods: {
    async result(page) {
      const queryParams = {
        ...this.$route.query,
        page: page ? page.toString() : null,
      };
      try {
        const response = await this.$axios.get("/api/wp-json/wp/v2/estate/filter", {
          params: queryParams,
        });
        this.filtered = response.data;
        this.pages = parseInt(response.headers["x-wp-totalpages"]);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      }
    },
  },
  mounted() {
    this.result();
  },
};
</script>

<style lang="scss" scoped>
.shop__main {
  margin-bottom: 10rem;

  .global-paginate {
    justify-content: center;
  }
  .big {
    padding: 3.5rem 0 3.9rem 0;
  }

  .grid-3 {
    margin-bottom: 3.7rem;
  }
}
</style>
