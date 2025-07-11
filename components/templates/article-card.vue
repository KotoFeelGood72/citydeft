<template>
  <div class="card">
    <div class="card-img">
      <NuxtImg
        :src="data._embedded['wp:featuredmedia'][0].source_url"
        :alt="data._embedded['wp:featuredmedia'][0].alt_text"
        loading="lazy"
      />
    </div>
    <div class="card-content">
      <section-title :title="data.title.rendered" class="small" :level="3" />
      <div v-html="trimmedText"></div>
      <nuxt-link :to="data.slug">{{ $t("ui.morePost") }}</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, computed, watch, onMounted } from "vue";
// import { api } from "~/api/api";
import sectionTitle from "../ui-kit/section-title.vue";

// interface PostData {
//   title: { rendered: string };
//   excerpt: { rendered: string };
//   slug: string;
//   featured_media: number;
// }

// interface MediaData {
//   source_url: string;
//   alt_text: string;
// }

const props = defineProps<{
  data: any;
}>();

// const img = ref<MediaData | null>(null);

// const getPostImg = async () => {
//   try {
//     const res = await api.get(`/wp/v2/media/${props.data.featured_media}`);
//     img.value = res as any;
//   } catch (error) {
//     console.error("Ошибка загрузки изображения:", error);
//   }
// };

const trimmedText = computed(() => {
  const maxLength = 120;
  const raw = props.data.excerpt?.rendered;
  if (!raw) return "";

  let result = raw.substring(0, maxLength);
  const ellipsisIndex = result.indexOf(" […]");
  if (ellipsisIndex !== -1) result = result.substring(0, ellipsisIndex);

  if (raw.length > maxLength) result += "…";
  return result;
});

// watch(
//   () => props.data,
//   () => {
//     getPostImg();
//   },
//   { immediate: true, deep: true }
// );

// onMounted(() => {
//   getPostImg();
// });
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  display: block;
}

.card {
  border-radius: 1rem;
  overflow: hidden;
  border-radius: 9.445px;
  border: 0.945px solid #f2f9ff;
  background: $white;
  box-shadow: 0px 18.891px 18.891px 0px rgba(0, 63, 128, 0.05);
}

.card-content {
  padding: 1.9rem;
  font-size: 1.6rem;
  font-family: $font_2;
  font-weight: 400;
  color: $dark-light;

  h3 {
    color: $dark;
    font-family: $font_1;
  }

  :deep(p) {
    padding: 2rem 0;
    font-size: 1.4rem;
    position: relative;
    margin-bottom: 1.6rem;
    &:before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 300%;
      border-bottom: 0.1rem solid #f2f9ff;
      content: "";
      left: -100%;
    }
  }

  a {
    @include flex-center;
    background-color: $yellow;
    padding: 1rem;
    border-radius: 0.5rem;
    &:hover {
      background-color: $accent;
    }
  }
}

.card-img {
  width: 100%;
  height: 23.6rem;
}
</style>
