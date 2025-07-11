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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "~/api/api";

import productsCard from "@/components/templates/products-card.vue";
import vFilter from "@/components/templates/v-filter.vue";
import sectionTitle from "@/components/ui-kit/section-title.vue";

const route = useRoute();
const page = ref(1);
const pages = ref<number | null>(null);
const estate = ref<any[]>([]);
const filtered = ref<any[] | null>(null);

const result = async (currentPage?: number) => {
  const queryParams = {
    ...route.query,
    page: currentPage ? currentPage.toString() : undefined,
  };

  try {
    const response = await api.get("/wp/v2/estate/filter", {
      params: queryParams,
    });
    filtered.value = response.data;
    pages.value = parseInt(response.headers["x-wp-totalpages"]);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
  }
};

onMounted(() => {
  result();

  console.log(estate);
});

watch(page, (newPage) => {
  result(newPage);
});

useHead({
  title: "Недвижимость",
});

watch(
  () => route.fullPath,
  () => {
    result();
  },
  { immediate: true }
);
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
