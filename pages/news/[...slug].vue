<template>
  <div class="article" v-if="data">
    <div class="article-head__w">
      <div class="container">
        <div class="article-head">
          <div class="back-link">
            <nuxt-link to="/news/">
              <icons icon="radix-icons:chevron-left" />
              <p>Читать другую статью</p>
            </nuxt-link>
          </div>
          <section-title
            :title="data.title ? data.title.rendered : ''"
            class="big single-title"
          />
        </div>
        <div class="article_main__img">
          <NuxtImg v-if="img" :src="img.source_url" alt="" loading="lazy" />
        </div>
      </div>
    </div>
    <div class="article-main">
      <div class="container">
        <div
          class="article-content"
          v-if="data && data.content"
          v-html="data.content.rendered"
        ></div>
      </div>
    </div>
    <div class="article-bottom__w">
      <div class="container">
        <div class="article-bottom">
          <p>Понравилась статья - поделись с друзьями</p>
          <ul>
            <li v-for="(item, i) in social" :key="'social-shared' + i">
              <ShareNetwork
                v-if="url"
                :network="item.social"
                :url="'https://citydeft.com/' + url"
                :title="shared?.og_title"
                :description="shared?.og_description"
              >
                <NuxtImg :src="item.icon" alt="" loading="lazy" />
              </ShareNetwork>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "~/api/api";

import sectionTitle from "@/components/ui-kit/section-title.vue";
import icons from "@/components/icons/icons.vue";

const route = useRoute();
const data = ref<any>(null);
const img = ref<any>(null);
const shared = ref<any>(null);
const url = ref<any>(null);

const social = [
  { social: "Facebook", icon: "facebook.svg" },
  { social: "Telegram", icon: "telegram.svg" },
  { social: "WhatsApp", icon: "whatsapp.svg" },
  { social: "VK", icon: "vk.svg" },
  { social: "odnoklassniki", icon: "ok.svg" },
];

const getArticleSingle = async () => {
  try {
    const response = await api.get(`/wp-json/wp/v2/posts?slug=${route.params.id}`);
    if (response.data && response.data.length > 0) {
      data.value = response.data[0];
      shared.value = data.value.yoast_head_json;
      url.value = route.fullPath;
      await getPostImg();
    }
  } catch (error) {
    console.error("Ошибка при получении статьи:", error);
  }
};

const getPostImg = async () => {
  if (!data.value?.featured_media) return;
  try {
    const response = await api.get(`/wp-json/wp/v2/media/${data.value.featured_media}`);
    img.value = response.data;
  } catch (error) {
    console.error("Ошибка при получении изображения:", error);
  }
};

onMounted(() => {
  getArticleSingle();
});
</script>

<style lang="scss" scoped>
/* CSS остаётся без изменений */
</style>
