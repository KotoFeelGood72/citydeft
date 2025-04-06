<template>
  <div class="house" v-if="data">
    <div class="container">
      <section-title :title="data.title.rendered" class="big" />
      <div class="house_hero__main">
        <!-- <shop-slider :slider="data.acf.gallery"/> -->
        <shop-short :info="data" />
      </div>
      <div class="house_desciption">
        <div class="house_desciption__txt">
          <section-title title="Описание" class="big" />
          <div class="txt-block" v-html="data.acf.description" />
        </div>
        <div class="house_description__info" v-if="data.acf.params">
          <section-title title="Инфрастуктура" class="big" />
          <ul class="info-description">
            <li
              v-for="(item, i) in data.acf.params"
              :key="'industries-' + i + item.icon.value"
            >
              <div class="icon-industries">
                <icons :icon="item.icon.value" />
              </div>
              <p>{{ item.icon.label }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="house-review" v-if="data.acf.videos.video">
        <section-title title="Видео-обзор" class="big" />
        <div class="home_review__video">
          <a :href="data.acf.videos.video" data-fancybox>
            <NuxtImg :src="data.acf.videos.img" alt="" loading="lazy" />
            <div class="play">
              <icons icon="ph:play-thin" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shopSlider from "../../components/shop/shop-slider";
import shopShort from "../../components/shop/shop-short";
import sectionTitle from "../../components/ui-kit/section-title";
import icons from "@/components/icons/icons";
export default {
  components: {
    shopSlider,
    shopShort,
    sectionTitle,
    icons,
  },
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async getPageID() {
      const response = await this.$axios.$get(
        `/api/wp-json/wp/v2/estate/?slug=${this.$route.params.id}`
      );
      this.data = response[0];
    },
  },
  mounted() {
    this.getPageID();
  },
};
</script>

<style lang="scss" scoped>
.house_hero__main {
  @include flex-start;
  margin-bottom: 3rem;

  @include bp($point_2) {
    flex-direction: column;
  }
}

.house {
  padding-top: 7rem;
  @include bp($point_2) {
    padding-top: 4rem;
  }
  .container {
    & > .big {
      margin-bottom: 3rem;
    }
  }
}

.house_desciption {
  @include flex-start;
  align-items: flex-start;

  @include bp($point_2) {
    flex-direction: column;
  }

  .house_desciption__txt {
    margin-right: 4rem;
    max-width: 60%;
    @include bp($point_2) {
      max-width: 100%;
      margin: 0 0 6rem 0;
    }
  }

  .big {
    margin-bottom: 5rem;
    @include bp($point_2) {
      margin-bottom: 2rem;
    }
  }

  .txt-block {
    :deep(p, ul, li) {
      font-size: 1.8rem;
      @include bp($point_2) {
        font-size: 1.4rem;
      }
      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  }
}

.info-description {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(47%, 1fr));
  grid-gap: 2rem;
  @include bp($point_2) {
    width: 100%;
  }
  li {
    @include flex-start;
    color: $dark-light;
    font-family: $font_2;
    font-size: 1.8rem;
    @include bp($point_4) {
      font-size: 1.2rem;
    }
  }
}

.icon-industries {
  margin-right: 2rem;
  width: 2.8rem;
  @include flex-center;
  @include bp($point_4) {
    margin-right: 1rem;
    width: 2rem;
  }
  svg {
    width: 100%;
    height: 100%;
  }
}

.house_description__info {
  flex-grow: 1;
  @include bp($point_2) {
    width: 100%;
  }
}

.house_desciption {
  margin-bottom: 5rem;
}

.house-review {
  .big {
    margin-bottom: 2.7rem;
    text-align: center;
  }
}

.home_review__video {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  height: 52.2rem;
  margin-bottom: 4rem;
  img {
    width: 100%;
  }

  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10rem;
    height: 10rem;
    @include flex-center;
    background-color: $yellow;
    border-radius: 100%;
    transition: all 0.3s ease;
    &:hover {
      background-color: $accent;
      svg {
        transform: rotate(-15deg);
      }
    }
    svg {
      transition: all 0.3s ease;
      width: 5rem;
      height: 5rem;
      @include bp($point_2) {
        width: 4rem;
        height: 4rem;
      }
    }
  }
}
</style>
