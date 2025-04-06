<template>
  <div class="single-services" v-if="data">
    <hero :content="data" :img="img" :container="true" />
    <blockTxt :data="data.content.rendered" />
  </div>
</template>

<script>
import blockTxt from "@/components/templates/block-txt";
import hero from "@/components/templates/hero";
export default {
  data() {
    return {
      data: null,
      img: null,
    };
  },
  components: {
    hero,
    blockTxt,
  },
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
        console.log(this.img.source_url);
      } catch (error) {
        console.error("Ошибка при получении изображения:", error);
      }
    },
  },
  mounted() {
    this.getPageContent("procedure");
  },
};
</script>

<style scoped></style>
