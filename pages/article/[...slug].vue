<template>
  <div class="article" v-if="post">
    <div class="article-head__w">
      <div class="container">
        <div class="article-head">
          <div class="back-link">
            <NuxtLink to="/news/">
              <icons icon="radix-icons:chevron-left" />
              <p>Читать другую статью</p>
            </NuxtLink>
          </div>
          <SectionTitle :title="post.title?.rendered || ''" class="big single-title" />
        </div>
        <div class="article_main__img">
          <NuxtImg v-if="img" :src="img.source_url" alt="" loading="lazy" />
        </div>
      </div>
    </div>

    <div class="article-main">
      <div class="container">
        <div class="article-content" v-if="post.content" v-html="post.content.rendered" />
      </div>
    </div>

    <div class="article-bottom__w">
      <div class="container">
        <div class="article-bottom">
          <p>Понравилась статья — поделись с друзьями</p>
          <ul>
            <li v-for="(item, i) in social" :key="`social-shared-${i}`">
              <a
                v-if="pageUrl"
                :href="shareLink(item.network)"
                target="_blank"
                rel="noopener"
              >
                <NuxtImg :src="item.icon" alt="" loading="lazy" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePageContent } from "~/composables/usePageContent";
import { api } from "~/api/api";

import SectionTitle from "@/components/ui-kit/section-title.vue";
import icons from "@/components/icons/icons.vue";

interface SocialItem {
  network: "Facebook" | "Telegram" | "WhatsApp" | "VK" | "Odnoklassniki";
  icon: string;
}

const route = useRoute();
// usePageContent with resource 'posts'
const { data: post, load } = usePageContent(route.params.slug as string, "posts");

const img = ref<any>(null);
const pageUrl = ref<string>("");

const social: SocialItem[] = [
  { network: "Facebook", icon: "facebook.svg" },
  { network: "Telegram", icon: "telegram.svg" },
  { network: "WhatsApp", icon: "whatsapp.svg" },
  { network: "VK", icon: "vk.svg" },
  { network: "Odnoklassniki", icon: "ok.svg" },
];

function shareLink(network: string) {
  const encoded = encodeURIComponent(pageUrl.value);
  switch (network) {
    case "Facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
    case "Telegram":
      return `https://t.me/share/url?url=${encoded}`;
    case "WhatsApp":
      return `https://api.whatsapp.com/send?text=${encoded}`;
    case "VK":
      return `https://vk.com/share.php?url=${encoded}`;
    case "Odnoklassniki":
      return `https://connect.ok.ru/offer?url=${encoded}`;
    default:
      return pageUrl.value;
  }
}

// when post changes, fetch its featured image
watch(
  () => post.value?.featured_media,
  async (mediaId) => {
    if (!mediaId) return;
    try {
      const res = await api.get(`/wp-json/wp/v2/media/${mediaId}`);
      img.value = res.data;
    } catch (e) {
      console.error("Ошибка при получении изображения:", e);
    }
  }
);

onMounted(() => {
  pageUrl.value = window.location.href;
  load();
});
</script>

<style lang="scss" scoped>
.article {
  padding-top: 6rem;
  @include bp($point_2) {
    padding-top: 3rem;
  }
}

.article-head {
  margin-bottom: 4rem;
  // @include flex-center;
  // position: relative;

  @include bp($point_2) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.back-link {
  margin-bottom: 3rem;
  @include bp($point_2) {
    margin-bottom: 1.5rem;
  }
  a {
    @include flex-start;
    background-color: $yellow;
    border-radius: 0.8rem;
    padding: 1rem 2rem;
    display: inline-flex;
    font-size: 1.8rem;
    font-family: $font_2;
    @include bp($point_2) {
      font-size: 1.4rem;
      padding: 0.5rem 1rem;
    }
    p {
      margin-bottom: -0.3rem;
    }
  }
}

.article_main__img {
  width: 100%;
  height: auto;
  margin-bottom: 7rem;
  @include bp($point_2) {
    margin-bottom: 3rem;
  }
  img {
    width: 100%;
    object-fit: cover;
  }
}

.article-content {
  :deep(p, ul, ol, li, strong, a) {
    font-size: 2.2rem;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }
}

:deep(.wp-block-heading) {
  font-size: 3.2rem;
  color: rgba(85, 85, 85, 1);
  padding: 3rem 2rem 3rem 7.8rem;
  @include bp($point_2) {
    font-size: 2.2rem;
    padding: 3rem 0;
  }
}

:deep(.wp-block-image) {
  padding: 3rem 0;
  img {
    @include bp($point_2) {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}

.article-bottom {
  @include flex-space;
  margin: 4.2rem 0;
  @include bp($point_2) {
    flex-direction: column;
    align-items: flex-start;
    margin: 2rem 0 4rem 0;
  }
  p {
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 500;
    @include bp($point_2) {
      font-size: 1.6rem;
      margin-bottom: 2rem;
    }
  }

  ul {
    @include flex-start;
    flex-wrap: wrap;
    margin: -1.5rem -1.5rem 0 0;
    li {
      padding: 1.5rem 1.5rem 0 0;
      &:last-child {
        a {
          width: 4.5rem;
          height: 4.5rem;
          @include bp($point_2) {
            width: 3.2rem;
            height: 3.2rem;
          }
        }
      }
      a {
        width: 3.6rem;
        height: 3.6rem;
        @include flex-center;
        @include bp($point_2) {
          width: 2.5rem;
          height: 2.5rem;
        }
        img {
          width: 100%;
          height: 100%;
          @include flex-center;
        }
      }
    }
  }
}
</style>
