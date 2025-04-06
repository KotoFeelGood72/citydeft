<template>
  <div class="vacancy" v-if="data">
    <div class="container">
      <div class="vacancy__main">
        <sectionTitle title="Отзывы" class="big" />
        <ul class="vacancy__list" v-if="data && data.acf">
          <li v-for="(item, i) in data.acf.reviews" :key="'vacancy-item' + i">
            <circleCard :data="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import sectionTitle from "@/components/ui-kit/section-title.vue";
import circleCard from "../components/templates/circle-card.vue";
export default {
  components: {
    sectionTitle,
    circleCard,
  },
  data: () => ({
    data: null,
  }),
  methods: {
    async getPageContent(point) {
      const response = await this.$axios.get(`/api/wp-json/wp/v2/pages?slug=${point}`);
      this.data = response.data[0];
    },
  },
  mounted() {
    this.getPageContent("reviews");
  },
};
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
