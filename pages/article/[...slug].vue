<template>
  <div class="article" v-if="data">
    <div class="article-head__w">
      <div class="container">
        <div class="article-head">
          <div class="back-link">
            <nuxt-link to="/article/">
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
                :title="shared.og_title"
                :description="shared.og_description"
              >
                <NuxtImg :src="`${item.icon}`" alt="" loading="lazy" />
              </ShareNetwork>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      img: null,
      shared: null,
      url: null,
      social: [
        { social: "Facebook", icon: "facebook.svg" },
        { social: "Telegram", icon: "telegram.svg" },
        { social: "WhatsApp", icon: "whatsapp.svg" },
        { social: "VK", icon: "vk.svg" },
        { social: "odnoklassniki", icon: "ok.svg" },
      ],
    };
  },
  components: {
    sectionTitle: () => import("@/components/ui-kit/section-title"),
    icons: () => import("@/components/icons/icons"),
  },
  methods: {
    async getArticleSingle() {
      try {
        const response = await this.$axios.get(
          `/api/wp-json/wp/v2/posts?slug=${this.$route.params.id}`
        );
        if (response.data && response.data.length > 0) {
          this.data = response.data[0];
          this.shared = response.data[0].yoast_head_json;
          this.url = this.$route.fullPath;
          await this.getPostImg();
        }
      } catch (error) {
        console.error("Ошибка при получении статьи:", error);
      }
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
    this.getArticleSingle();
  },
};
</script>

<style lang="scss" scoped>
.article-content {
  :deep(ul) {
    font-size: 2.2rem;
    padding-left: 2rem;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }
}
.article-content {
  :deep(li) {
    padding: 0.7rem 0;
    position: relative;
    &:before {
      content: "- ";
    }
  }
}

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
