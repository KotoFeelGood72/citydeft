<template>
  <footer class="footer" v-if="options">
    <div class="container">
      <div class="footer_main">
        <div>
          <div class="footer-col__info">
            <div class="logo">
              <nuxt-link to="/">
                <NuxtImg
                  src="https://api.citydeft.com/wp-content/uploads/2025/05/logo.png"
                  alt="Логотип Deft Group"
                  loading="lazy"
                />
              </nuxt-link>
            </div>
            <div class="footer_info__descr">{{ $t("brandShort") }}</div>
            <ul class="footer-social">
              <li
                v-for="(item, i) in options.contacts.social"
                :key="'social-footer-' + i"
              >
                <a target="_blank" :href="item.link">
                  <icons v-if="item.icon" :icon="item.icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="footer_col__nav"
          v-for="(item, i) in options.navigation"
          :key="item + 'footer-navigation-' + i"
        >
          <v-col-nav :data="item" />
        </div>
      </div>
      <div class="mobile-info">
        <span>Адрес офиса:</span>
        <p>Deft Group/Saray Mah. Oral Cad. 25/B Öztürk 2 Apt. Alanya / Antalya</p>
      </div>
      <div class="mobile-bottom">
        <ul class="footer-social">
          <li v-for="(item, i) in options.contacts.social" :key="'social-footer-' + i">
            <a target="_blank" :href="item.link">
              <icons v-if="item.icon" :icon="item.icon" />
            </a>
          </li>
        </ul>
        <button @click="scrollToTop">
          <icons icon="ion:chevron-up" width="24" height="14" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import vColNav from "../ui-kit/v-col-nav.vue";
import icons from "../icons/icons.vue";
import { useOptionsStore, useOptionsStoreRefs } from "~/store/useOptionsStore";

const { options } = useOptionsStoreRefs();

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>
<style lang="scss" scoped>
.footer {
  background: #f7f7f7;
  @include bp($point_2) {
    font-size: 1.2rem;
    padding-bottom: 2rem;
  }
}

.footer_main {
  padding: 13rem 0 5rem 0;
  @include bp($point_2) {
    padding: 9rem 0 5rem 0;
  }
}

.logo {
  max-width: 10rem;
  margin-bottom: 0.5rem;
  img {
    width: 100%;
    object-fit: contain;
  }
}

.footer-col__info {
  max-width: 25.8rem;
}

.footer_main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  grid-gap: 4rem;
  @include bp($point_2) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    grid-gap: 2rem;
  }
}

.footer_info__descr {
  margin-bottom: 4rem;
}

.footer-social {
  @include flex-start;
  flex-wrap: wrap;
  margin: -2rem -2rem 0 0;
  li {
    padding: 2rem 2rem 0 0;
    a {
      color: $yellow;
      width: 3rem;
      height: 3rem;
      @include flex-center;
      svg {
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
      }
      &:hover {
        color: $accent;
        svg {
          transform: rotate(25deg);
        }
      }
    }
  }
}

.footer_col__nav {
  @include bp($point_2) {
    justify-content: center;
    text-align: center;
  }
  &:not(:last-child) {
    @include bp($point_2) {
      display: none;
    }
  }
}

.footer-col__info {
  @include bp($point_2) {
    display: none;
  }
}

.mobile-info {
  display: none;
  @include bp($point_2) {
    display: block;
    text-align: center;
    max-width: 30rem;
    margin: -4rem auto 4rem auto;
  }

  span {
    @include bp($point_2) {
      display: block;
      margin-bottom: 1rem;
    }
  }
}

.mobile-bottom {
  display: none;
  @include bp($point_2) {
    @include flex-space;
  }
}

.mobile-bottom button {
  background-color: $yellow;
  width: 4rem;
  height: 2.5rem;
  @include flex-center;
  border-radius: 0.5rem;
  font-size: 1.8rem;
}
</style>
