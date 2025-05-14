<template>
  <div class="vacancy" v-if="page">
    <div class="container">
      <div class="vacancy__main">
        <sectionTitle title="Вакансии" class="big" />
        <ul class="vacancy__list" v-if="page.acf?.vacancy">
          <li v-for="(item, i) in page.acf.vacancy" :key="'vacancy-item-' + i">
            <CircleCard :data="item" />
          </li>
        </ul>
        <div class="vacancy-notice">
          Присылайте свое резюме на почту
          <a href="mailto:info@citydeft.com">info@citydeft.com</a> или на любой мессенджер
          <a href="tel:+905077060007">+905077060007</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { usePageContent } from "~/composables/usePageContent";

import CircleCard from "@/components/templates/circle-card.vue";
import sectionTitle from "@/components/ui-kit/section-title.vue";

// Данные страницы
const { data: page, load } = usePageContent("vacancy", "pages");

// Загрузка данных при монтировании
onMounted(() => {
  load();
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

.vacancy-notice {
  font-size: 2.2rem;
  font-weight: 500;
  @include bp($point_2) {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }

  a {
    font-weight: 600;
  }
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
