<template>
  <div class="vacancy">
    <div class="container">
      <div class="vacancy__main">
        <section-title :title="$t('ui.reviewsTitle')" class="big" :level="1" />
        <ul class="vacancy__list" v-if="data?.acf">
          <li v-for="(item, i) in data?.acf?.reviews" :key="`vacancy-item-${i}`">
            <circle-card :data="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

import SectionTitle from "@/components/ui-kit/section-title.vue";
import CircleCard from "@/components/templates/circle-card.vue";
import { usePageContent } from "@/composables/usePageContent";
import { useRoute } from "vue-router";
import { useSeoMeta } from "@/composables/useSeoMeta";

const route = useRoute();
const { data, load } = usePageContent("reviews");

watch(
  () => route,
  () => {
    useSeoMeta(856);
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  load("reviews");
});
</script>

<style scoped lang="scss">
.vacancy__main {
  .big {
    margin: 4rem 0 10rem 0;
    text-align: center;
    @include bp($point_2) {
      margin: 2rem 0 4rem 0;
    }
  }
  padding-bottom: 8rem;
}

.vacancy__list {
  li {
    &:not(:last-child) {
      margin-bottom: 12rem;
      @include bp($point_2) {
        margin-bottom: 4rem;
      }
    }
    margin-bottom: 4rem;
  }
}
</style>
