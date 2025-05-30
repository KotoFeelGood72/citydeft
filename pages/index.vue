<template>
  <div class="home" v-if="options">
    <hero-slider class="home-slider" :sale-slider="options.saleSlider" />
    <v-filter class="home-filter" />
    <div class="feature-house">
      <div class="container">
        <div class="feature-house__main">
          <div class="feature-house__top">
            <section-title :level="3" title="Лучшие предложения" class="big" />
            <nuxt-link to="/estate">Смотреть все</nuxt-link>
          </div>
          <ul class="feature-list grid-3">
            <li v-for="(item, i) in feature" :key="'product-' + i">
              <products-card :data="item" />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="home-cat">
      <div class="container">
        <div class="home-cat__main">
          <div class="home-cat-top">
            <section-title title="Недвижимость по категориям" :level="3" class="big-xl" />
            <p>Подборка недвижимости в Турции</p>
          </div>
          <ul class="home-cat__list" v-if="categories.length">
            <li v-for="item in categories" :key="'categories-' + item.id">
              <nuxt-link :to="`/estate/category/${item.slug}`">
                <NuxtImg v-if="item.acf?.img" :src="item.acf.img" alt="" loading="lazy" />
                <h3>{{ item.name }}</h3>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <template v-if="options">
      <template v-if="options['action-block']">
        <actions class="home-about" :data="options['action-block']" />
      </template>
    </template> -->

    <!-- <services class="home-services" :data="data.acf" /> -->
    <questions class="home-questions" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import heroSlider from "@/components/blocks/hero-slider.vue";
import productsCard from "@/components/templates/products-card.vue";
import vFilter from "@/components/templates/v-filter.vue";
import sectionTitle from "@/components/ui-kit/section-title.vue";
import actions from "@/components/blocks/actions.vue";
import services from "@/components/blocks/services.vue";
import questions from "@/components/blocks/questions.vue";
import { useOptionsStoreRefs } from "~/store/useOptionsStore";
import { useSeoMeta } from "@/composables/useSeoMeta";
import { api } from "~/api/api";
import { useRoute } from "vue-router";

// Реактивные переменные
const feature = ref<any>([]);
const categories = ref<any>([]);
// const data = ref<any | null>(null);
const { options } = useOptionsStoreRefs();
const route = useRoute();

// Запросы к API
const getFeature = async () => {
  try {
    const response = await api.get("/wp/v2/estate?meta=2");
    feature.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Ошибка при загрузке feature:", error);
  }
};

const getCategories = async () => {
  try {
    const response = await api.get("/wp/v2/estate_categories/");
    categories.value = response.data;
  } catch (error) {
    console.error("Ошибка при загрузке категорий:", error);
  }
};

// const getContent = async () => {
//   try {
//     const res = await api.get("/acf/v3/options/options");
//     data.value = res.data;
//   } catch (error) {
//     console.error("Ошибка при загрузке контента:", error);
//   }
// };

// Инициализация данных
onMounted(async () => {
  getFeature();
  getCategories();
  // getContent();
  // console.log(options.value["action-block"]);
});

watch(
  () => route,
  () => {
    useSeoMeta(82);
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.home-slider {
  margin-bottom: 2.5rem;
}

.home-filter {
  margin-bottom: 8.4rem;
}

.feature-house {
  margin-bottom: 6rem;
}

.home-about {
  margin-bottom: 6rem;
}

.home-services {
  margin-bottom: 6rem;
}

.home-questions {
  margin-bottom: -3.7rem;
}
.feature-house__top {
  @include flex-space;
  margin-bottom: 4rem;

  @include bp($point_4) {
    flex-direction: column;
    align-items: flex-start;
  }

  a {
    font-size: 2.4rem;
    font-weight: 600;
    color: $gray;
    @include bp($point_4) {
      font-size: 2rem;
    }
    &:hover {
      color: $accent;
    }
  }
}

.home-cat {
  margin-bottom: 7.6rem;
}
.home-cat-top {
  text-align: center;
  margin-bottom: 4rem;

  .big-xl {
    margin-bottom: 1.2rem;
  }

  p {
    font-size: 2rem;
    color: $dark-light;
  }
}

.home-cat__list {
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));

  @include bp($point_4) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    grid-gap: 1rem;
  }

  li {
    position: relative;
    overflow: hidden;
    max-height: 30rem;
    border-radius: 0.5rem;
    &:hover {
      img {
        transform: scale(1.1) rotate(-5deg);
      }
    }
  }

  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $white;
    text-align: center;
    padding: 1.6rem 1rem;
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 500;

    @include bp($point_2) {
      font-size: 2rem;
    }
    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      content: "";
      background: rgba(0, 96, 119, 0.02);
      backdrop-filter: blur(14.5px);
      z-index: -1;
      min-height: 8.8rem;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.6s ease;
  }
}
</style>
