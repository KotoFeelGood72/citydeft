<template>
  <div class="top-header">
    <div class="container">
      <div class="top-header__main">
        <switchLang class="desktop-switch" />
        <div class="right">
          <ul class="social-list">
            <li v-for="(item, i) in socials" :key="'social-' + i">
              <a :href="item.link">
                <icons v-if="item.icon" :icon="item.icon" />
              </a>
            </li>
          </ul>
          <ul class="contacts-list">
            <li>
              <a href="tel:+905077060007">
                <p>+90 507 706 00 07</p>
              </a>
            </li>
            <li>
              <a href="mailto:info@citydeft.com">
                <div class="icon">
                  <icons icon="ei:envelope" />
                </div>
                <p>info@citydeft.com</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import icons from "../icons/icons.vue";
import switchLang from "../ui-kit/switch-lang.vue";

const socials = ref<any>([
  { link: "https://wa.me/905077060007", icon: "ic:baseline-whatsapp" },
  { link: "https://t.me/Deftgroup", icon: "ic:baseline-telegram" },
]);
</script>

<style lang="scss" scoped>
.top-header {
  background-color: $yellow;
  color: $dark-light;
  a {
    color: inherit;
  }
}

.top-header__main {
  @include flex-space;
}

.desktop-switch {
  @include bp($point_2) {
    display: none;
  }
}
.social-list,
.contacts-list {
  @include flex-start;
  @include bp($point_2) {
    font-size: 1.4rem;
  }
}

.social-list {
  margin-right: 2.5rem;
  li {
    width: 4rem;
    height: 4rem;
    @include bp($point_2) {
      width: 3rem;
      height: 3rem;
    }
    a {
      @include flex-center;
      width: 100%;
      height: 100%;
    }
  }
}

.contacts-list {
  margin: -3rem -3rem 0 0;
  @include bp($point_2) {
    margin: -1rem -1rem 0 0;
  }
  li {
    padding: 3rem 3rem 0 0;
    @include bp($point_2) {
      padding: 1rem 1rem 0 0;
    }
    a {
      @include bp($point_2) {
        font-size: 1.2rem;
      }
      @include flex-start;
      .icon {
        margin-right: 1rem;
        width: 3.1rem;
        height: 3.1rem;
        @include bp($point_2) {
          display: none;
        }
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.top-header__main {
  padding: 1rem 0;
  @include bp($point_2) {
    padding: 0.5rem 0;
  }
}

.right {
  @include flex-end;
}
</style>
