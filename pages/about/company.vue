<template>
  <div class="about" v-if="data && contents">
    <hero :content="data" :img="img" :small="true" classes="container" />
    <services :data="contents" class="mb8" />
    <partners :title="contents.partners.title" :partners_list="contents.partners.list" />
    <documents
      :title="contents.documents.title"
      :documents_list="contents.documents.list"
    />
    <questions class="home-questions" />
  </div>
</template>

<script>
import hero from "@/components/templates/hero";
import blockTxt from "@/components/templates/block-txt";
import services from "@/components/blocks/services";
import partners from "@/components/blocks/partners";
import documents from "@/components/blocks/documents";
import questions from "@/components/blocks/questions";
export default {
  data() {
    return {
      data: null,
      contents: null,
      img: null,
    };
  },
  components: { hero, blockTxt, services, partners, documents, questions },
  methods: {
    async getPageContent(point) {
      const response = await this.$axios.get(`/api/wp-json/wp/v2/pages?slug=${point}`);
      this.data = response.data[0];
      await this.getPostImg();
    },
    async getContent() {
      const res = await this.$axios.$get("/api/wp-json/acf/v3/options/options");
      this.contents = res.acf;
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
    this.getPageContent("about");
    this.getContent();
  },
};
</script>

<style scoped lang="scss">
.mb8 {
  margin-bottom: 8rem;
  @include bp($point_4) {
    margin-bottom: 6rem;
  }
}

.home-questions {
  margin-bottom: -3.7rem;
}
</style>
