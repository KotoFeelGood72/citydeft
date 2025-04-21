<template>
  <nav class="nav" v-if="options">
    <ul class="nav-list">
      <li
        v-for="(item, i) in options['header-nav']"
        :key="'nav-' + i"
        class="nav_item__parent"
        @mouseover="activeIndex = i"
        @mouseleave="activeIndex = null"
      >
        <nuxt-link :to="item.link" v-if="item.link">
          <p>{{ item.name }}</p>
          <div class="icon" v-if="item.submenu && item.on_submenu">
            <icons icon="fluent:triangle-down-16-filled" />
          </div>
        </nuxt-link>
        <div class="nolink" v-else>
          <p>{{ item.name }}</p>
          <div class="icon" v-if="item.submenu && item.on_submenu">
            <icons icon="fluent:triangle-down-16-filled" />
          </div>
        </div>
        <transition name="translate">
          <ul
            class="sub-menu"
            v-if="activeIndex === i && item.submenu && item.on_submenu"
          >
            <li
              v-for="(subitem, i) in item.submenu"
              :key="'nav-' + i"
              class="nav_item__submenu"
            >
              <nuxt-link :to="item.link + subitem.link">{{ subitem.name }}</nuxt-link>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import icons from "../icons/icons.vue";
import { useOptionsStoreRefs } from "~/store/useOptionsStore";

const { options } = useOptionsStoreRefs();

const activeIndex = ref<any>();
</script>

<style lang="scss" scoped>
.nav {
  margin-right: 3.8rem;
}

.nav-list {
  @include flex-start;
  font-family: $font_2;
  font-weight: 400;
  margin: -3rem -3rem -1rem 0;
  & > li {
    padding: 3rem 3rem 0 0;
    position: relative;
    &:hover {
      .icon {
        color: $orange;
        transform: rotate(180deg);
        top: 0.5rem;
      }
    }
    & > a,
    .nolink {
      position: relative;
      padding-right: 2rem;
      @include flex-start;
      margin-bottom: 1rem;
      cursor: pointer;
    }

    ul {
      position: absolute;
      top: 100%;
      z-index: 99;
      background-color: $white;
      border-radius: 0.5rem;
      padding: 2rem;
      font-size: 1.4rem;
      font-family: $font_2;
      color: $dark-light;
      box-shadow: 0 0 20px 0 #00000010;

      li {
        white-space: nowrap;
        a {
          &:hover {
            color: $orange;
          }
        }
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
.icon {
  position: absolute;
  top: 50%;
  right: 0;
  left: auto;
  transform: translateY(-50%);
  width: 1.2rem;
  height: 1.2rem;
  color: $gray;
  @include flex-center;
  transition: all 0.3s ease;
  svg {
    width: 100%;
    height: 100%;
  }
}

/* Define the initial state of entering and leaving */
.translate-enter,
.translate-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Define the duration and type of transition */
.translate-enter-active,
.translate-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.translate-enter-to,
.translate-leave {
  opacity: 1;
  transform: translateY(0);
}

.nuxt-link-active {
  color: $orange;
}
</style>
