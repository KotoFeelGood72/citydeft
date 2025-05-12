<template>
  <div class="vacancy" v-if="data && data[0]">
    <div class="container">
      <div class="vacancy__main">
        <section-title title="Отзывы" class="big" :level="1" />
        <ul class="vacancy__list" v-if="data[0]?.acf">
          <li v-for="(item, i) in data[0].acf?.reviews" :key="`vacancy-item-${i}`">
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

const { data, load } = usePageContent("reviews");

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
