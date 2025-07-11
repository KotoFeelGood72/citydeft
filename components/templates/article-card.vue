<template>
  <div class="card">
    <div class="card-img" v-if="imageSrc">
      <NuxtImg :src="imageSrc" :alt="imageAlt" loading="lazy" />
    </div>

    <div class="card-content">
      <SectionTitle :title="data.title.rendered" class="small" :level="3" />
      <div v-html="trimmedText"></div>
      <NuxtLink :to="`/blog/${data.slug}`">{{ $t("ui.morePost") }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SectionTitle from "../ui-kit/section-title.vue";

const props = defineProps<{
  data: {
    title: { rendered: string };
    excerpt?: { rendered: string };
    slug: string;
    _embedded?: {
      "wp:featuredmedia"?: Array<{
        source_url: string;
        alt_text: string;
      }>;
    };
  };
}>();

const image = computed(() => props.data._embedded?.["wp:featuredmedia"]?.[0]);
const imageSrc = computed(() => image.value?.source_url || null);
const imageAlt = computed(() => image.value?.alt_text || "");

const trimmedText = computed(() => {
  const raw = props.data.excerpt?.rendered || "";
  const clean = raw.replace(/<\/?[^>]+(>|$)/g, ""); // убрать HTML-теги
  const ellipsisIndex = clean.indexOf(" […]");

  let short = ellipsisIndex !== -1 ? clean.substring(0, ellipsisIndex) : clean;
  return short.length > 120 ? short.substring(0, 120) + "…" : short;
});
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

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
