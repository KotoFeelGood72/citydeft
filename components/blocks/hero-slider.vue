<template>
  <section class="slider">
    <div class="container">
      <div class="slider-main">
        <Swiper
          class="swiper swiper-container"
          :modules="[Navigation]"
          v-bind="sliderOptions"
        >
          <SwiperSlide
            class="swiper-slide"
            v-for="(item, i) in saleSlider"
            :key="'slides-' + i"
          >
            <nuxt-link :to="item.link">
              <NuxtImg
                class="desktop"
                v-if="item.img"
                :src="item.img"
                alt=""
                loading="lazy"
              />
              <NuxtImg
                class="mobile"
                v-if="item.mobile"
                :src="item.mobile"
                alt=""
                loading="lazy"
              />
            </nuxt-link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { useOptionsStoreRefs } from "~/store/useOptionsStore";

defineProps<{
  saleSlider: any;
}>();

const { options } = useOptionsStoreRefs();

const sliderOptions = {
  speed: 700,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 5000,
  },
};
</script>

<style lang="scss" scoped>
.slider {
  .slider-main {
    height: 42rem;
    border-radius: 1rem;
    overflow: hidden;
  }

  .swiper-container {
    height: 100%;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 1rem;
    }
  }
}

.mobile {
  display: none;

  @include bp($point_2) {
    display: block;
  }
}

.desktop {
  display: block;

  @include bp($point_2) {
    display: none;
  }
}
</style>
