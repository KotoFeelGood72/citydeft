<template>
  <div class="shop-slider__main">
    <swiper
      v-if="showThumbs"
      class="shop-slider-thumb"
      :modules="[Navigation]"
      :direction="thumbDirection"
      v-bind="sliderOptions.thumbs"
      @swiper="onThumbsInit"
    >
      <swiper-slide v-for="(item, i) in slider" :key="'slide-thumb-' + i">
        <NuxtImg v-if="item.images" :src="item.images" alt="" loading="lazy" />
      </swiper-slide>
    </swiper>

    <Swiper class="shop-slider" :modules="[Navigation]" @swiper="onMainInit">
      <!-- v-bind="sliderOptions.slider" -->
      <swiper-slide v-for="(item, i) in slider" :key="'slide-' + i">
        <a v-if="item.images" :href="item.images" data-fancybox="gallery">
          <NuxtImg :src="item.images" alt="" loading="lazy" />
        </a>
      </swiper-slide>
    </Swiper>

    <div class="slider-nav" v-if="showThumbs">
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps<{
  slider: Array<{ images: string }>;
}>();

const mainSwiper = ref<any>(null);
const thumbsSwiper = ref<any>(null);

const showThumbs = computed(() => props.slider && props.slider.length > 1);

const thumbDirection = computed(() => {
  if (window.innerWidth >= 1200) return "vertical";
  return "horizontal";
});

const sliderOptions = {
  thumbs: {
    spaceBetween: 11,
    slidesPerView: 4,
    watchSlidesProgress: true,
    watchOverflow: true,
    speed: 700,
  },
  slider: {
    direction: "horizontal",
    spaceBetween: 10,
    speed: 700,
    loop: true,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
  },
};

const onMainInit = (swiper: any) => {
  mainSwiper.value = swiper;
};

const onThumbsInit = (swiper: any) => {
  thumbsSwiper.value = swiper;
};
</script>

<style lang="scss" scoped>
.shop-slider__main {
  @include flex-start;
  height: 51.9rem;
  max-width: 77%;
  margin-right: 2rem;
  position: relative;

  @include bp($point_2) {
    flex-direction: column;
    max-width: 50%;
    // overflow: hidden;
    align-items: flex-start;
  }
  @include bp($point_4) {
    max-width: 100%;
    margin: 0 0 2rem 0;
  }
  // flex-grow: 1;
  // max-width: 100%;

  .swiper-container {
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.shop-slider-thumb {
  height: 100%;
  min-width: 12.2rem;
  margin-right: 1.5rem;
  .swiper-slide {
    border-radius: 1rem;
  }
  @include bp($point_2) {
    order: 2;
    width: 100%;
    // min-width: 100%;
    margin-right: 0;
    max-height: 10rem;
    overflow: hidden;
  }
}

.shop-slider {
  border-radius: 1rem;
  max-width: 100%;
  width: 100%;
  flex-grow: 1;
  position: relative;
  @include bp($point_2) {
    margin-bottom: 2rem;
  }
  a {
    @include flex-center;
    width: 100%;
    height: 100%;
    img {
      border-radius: 1rem;
    }
  }
}

// .slider__wrapper {
//     position: relative;
//     width: 100%;
//     max-width: 100%;
// }

.slider-nav {
  position: absolute;
  z-index: 999;
  width: 100%;
  top: 45%;
  left: auto;
  right: 2rem;
  transform: translateY(-50%);
  max-width: 77%;
  color: $white;
  pointer-events: none;

  @include bp($point_4) {
    max-width: 100%;
    left: 50%;
    right: auto;
    transform: translate(-50%, -50%);
    top: 37%;
  }
}

.swiper-button-prev:after,
.swiper-button-next:after {
  color: $white;
  font-size: 1.8rem;
}

.swiper-button-prev,
.swiper-button-next {
  @include flex-center;
  width: 5rem;
  height: 5rem;
  background-color: #00000083;
  border-radius: 100%;
  transition: all 0.3s ease;
  pointer-events: all;
  &:hover {
    background-color: #000000d5;
  }
}
</style>
