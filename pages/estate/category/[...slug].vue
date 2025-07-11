<template>
  <div class="shop">
    <v-filter :isOpen="true" />
    <div class="shops">
      <div class="container">
        <div class="shop__main">
          <section-title v-if="pageName?.name" :title="pageName.name" class="big" />
          <ul class="grid-3">
            <li v-for="(item, i) in estate" :key="'shop-product-' + i">
              <products-card :data="item" />
            </li>
          </ul>
          <Pagination v-model="page" :total-pages="pages" :max-visible-pages="5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "~/api/api";
import productsCard from "@/components/templates/products-card.vue";
import vFilter from "@/components/templates/v-filter.vue";
import sectionTitle from "@/components/ui-kit/section-title.vue";
import Pagination from "~/components/ui-kit/Pagination.vue";

const page = ref(1);
const pages = ref<any>(1);
const estate = ref<any>([]);
const pageName = ref<any>(null);

const route = useRoute();
const router = useRouter();

watch(page, (newPage) => {
  if (pageName.value?.id) {
    getCategory(pageName.value.id, newPage);
    updateURL(newPage);
  }
});

async function getCategory(id: number, currentPage: number) {
  try {
    const response = await api.get(
      `/wp/v2/estate?estate_categories=${id}&per_page=6&page=${currentPage}`
    );
    if (response && response.headers) {
      pages.value = parseInt(response.headers["x-wp-totalpages"]);
      estate.value = response.data;
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  } catch (error) {
    console.error("Ошибка при получении данных категории:", error);
  }
}

async function getCategoryName(slug: string) {
  try {
    const response = await api.get(`/wp/v2/estate_categories?slug=${slug}`);
    return response.data[0];
  } catch (error) {
    console.error("Ошибка при получении имени категории:", error);
    return null;
  }
}

function updateURL(currentPage: number) {
  router.push({ query: { ...route.query, page: currentPage.toString() } });
}

onMounted(async () => {
  const slug = route.params.slug as string;
  const res = await getCategoryName(slug);
  if (res) {
    pageName.value = res;
    getCategory(res.id, page.value);
  }
});

watchEffect(() => {
  if (pageName.value?.id) {
    useSeoMeta(pageName.value.id, "category");
  }
});
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
