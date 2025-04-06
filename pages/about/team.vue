<template>
  <div class="team">
    <div class="container">
      <sectionTitle title="Наша команда" class="big" />
      <div class="team__main">
        <div class="team_main__img">
          <nuxt-img v-if="img && img.source_url" :src="img.source_url" />
        </div>
        <ul v-if="data && data.acf" class="team-list">
          <li v-for="(item, i) in data.acf.team" :key="'team-item-' + i">
            <hero :img="item.img" :content="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import hero from "@/components/templates/hero.vue";
import sectionTitle from "@/components/ui-kit/section-title.vue";
export default {
  components: {
    sectionTitle,
    hero,
  },
  data: () => ({
    data: null,
    img: null,
  }),
  methods: {
    async getPageContent(point) {
      const response = await this.$axios.get(`/api/wp-json/wp/v2/pages?slug=${point}`);
      this.data = response.data[0];
      await this.getPostImg();
    },
    async getPostImg() {
      if (!this.data.featured_media) return;

      try {
        const response = await this.$axios.get(
          `/api/wp-json/wp/v2/media/${this.data.featured_media}`
        );
        this.img = response.data;
      } catch (error) {
        console.error("Ошибка при получении изображения:", error);
      }
    },
  },
  mounted() {
    this.getPageContent("team");
  },
};
</script>

<style scoped lang="scss">
.team {
  padding: 6rem 0;
  @include bp($point_2) {
    padding: 3rem 0;
  }
  .big {
    margin-bottom: 4rem;
    text-align: center;
  }
}

.team_main__img {
  margin-bottom: 7rem;
  @include bp($point_4) {
    margin-bottom: 4rem;
  }
  img {
    width: 100%;
  }
}

.team-list {
  li {
    @include bp($point_4) {
      position: relative;
    }
    :deep(.templateHero__content::before) {
      width: 103%;
      left: -0.3rem;
    }
    :deep(.templateHero__main) {
      @include bp($point_4) {
        padding: 2rem;
      }
    }
    :deep(.templateHero__main img) {
      margin-left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    :deep(.template-hero) {
      border: none;
    }
    &:nth-child(2n + 2) {
      :deep(.templateHero__content) {
        order: 1;
      }
      // :deep(.template-hero) {
      // }
    }
  }
}
</style>
