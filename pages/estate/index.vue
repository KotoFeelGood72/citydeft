<template>
  <div class="shop">
    <v-filter :isOpen="false" :is-loading="isLoading" />

    <div class="shops">
      <div class="container">
        <div class="shop__main">
          <section-title :title="$t('ui.resultSearch')" class="big" />

          <ul class="grid-3" v-if="filtered?.length">
            <li v-for="(item, i) in filtered" :key="'shop-filtered-' + i">
              <products-card :data="item" />
            </li>
          </ul>

          <ul class="grid-3" v-else>
            <li v-for="(item, i) in estate" :key="'shop-estate-' + i">
              <products-card :data="item" />
            </li>
          </ul>

          <Pagination
            v-if="pages && pages > 1"
            v-model="page"
            :total-pages="pages"
            :max-visible-pages="5"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "~/api/api";

import productsCard from "@/components/templates/products-card.vue";
import vFilter from "@/components/templates/v-filter.vue";
import sectionTitle from "@/components/ui-kit/section-title.vue";
import Pagination from "~/components/ui-kit/Pagination.vue";

const route = useRoute();
const page = ref(1);
const pages = ref(1);
const estate = ref<any[]>([]);
const filtered = ref<any[] | null>(null);
const isLoading = ref<boolean>(false);

// Загрузка с учётом query-параметров
const fetchResults = async (currentPage = 1) => {
  const params = { ...route.query, page: currentPage, per_page: 6 };
  isLoading.value = true;
  try {
    const response = await api.get("/wp/v2/estate/filter", { params });
    filtered.value = response.data;
    pages.value = parseInt(response.headers["x-wp-totalpages"] || "1");
  } catch (error) {
    console.error("Ошибка при загрузке объектов:", error);
    filtered.value = null;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchResults(page.value);
});

watch(page, (newPage) => {
  fetchResults(newPage);
});

watch(
  () => route.query,
  () => {
    fetchResults(page.value);
  }
);

useHead({ title: "Недвижимость" });
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
