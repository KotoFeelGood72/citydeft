<template>
  <nav class="nav">
    <ul class="nav-list" v-if="nav">
      <li
        v-for="(item, index) in nav['header-nav']"
        :key="`nav-${index}`"
        class="nav_item__parent"
        @click="item.submenu && item.on_submenu && toggleSubMenu(index)"
      >
        <div :class="{ active: activeIndex === index }">
          <template v-if="item.submenu && item.on_submenu">
            <p>{{ item.name }}</p>
            <div class="icon" :class="{ active: activeIndex === index }">
              <icons icon="fluent:triangle-down-16-filled" />
            </div>
          </template>
          <template v-else>
            <nuxt-link :to="item.link"
              ><p>{{ item.name }}</p></nuxt-link
            >
          </template>
        </div>
        <transition name="translate">
          <ul
            class="sub-menu"
            v-if="activeIndex === index && item.submenu && item.on_submenu"
          >
            <li
              v-for="(subitem, subIndex) in item.submenu"
              :key="`sub-nav-${subIndex}`"
              class="nav_item__submenu"
            >
              <nuxt-link :to="item.link + subitem.link">
                {{ subitem.name }}
              </nuxt-link>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import icons from "../icons/icons.vue";
import { onBeforeRouteLeave } from "vue-router";
import { useModalStore } from "~/store/useModalStore";

const { closeModal } = useModalStore();

defineProps<{ nav?: any }>();

const activeIndex = ref<number | false>(false);

function toggleSubMenu(index: number) {
  activeIndex.value = activeIndex.value === index ? false : index;
}

onBeforeRouteLeave((_to, _from, next) => {
  closeModal("burger");
  next();
});
</script>

<style lang="scss" scoped>
.nav {
  margin-right: 3.8rem;
}

.icon {
  position: absolute;
  top: 55%;
  right: 0;
  transform: translateY(-50%);
  width: 1.3rem;
  height: 1.3rem;
  color: $gray;
  @include flex-center;
  transition: all 0.3s ease;

  &.active {
    transform: translateY(-50%) rotate(180deg);
    color: $orange;
  }
  svg {
    width: 100%;
    height: 100%;
  }
}

.burger-nav {
  margin-right: 0;
  a:hover {
    color: $orange;
  }
  & > ul {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    & > li {
      font-size: 2.4rem;
      color: #555555;
      font-weight: 500;
      p {
        position: relative;
        padding: 2.4rem 0;
        &:before {
          position: absolute;
          bottom: 0;
          left: -100%;
          width: 300%;
          content: "";
          border-bottom: 0.1rem solid rgb(217, 217, 217);
        }
      }
      > div {
        cursor: pointer;
        position: relative;
        &.active {
          color: $orange;
        }
        &:hover {
          color: $orange;
        }
      }
    }
  }
}

.sub-menu {
  li {
    font-size: 1.6rem;
    padding: 1.3rem 0;
    position: relative;
    &:before {
      position: absolute;
      bottom: 0;
      left: -100%;
      width: 300%;
      content: "";
      border-bottom: 0.1rem solid rgb(217, 217, 217);
    }
  }
}

.translate-enter,
.translate-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.translate-enter-active,
.translate-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.translate-enter-to,
.translate-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>
