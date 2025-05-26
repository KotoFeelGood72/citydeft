<template>
  <header>
    <TopHeader />
    <div class="container">
      <div class="header-main">
        <div class="logo">
          <nuxt-link to="/">
            <NuxtImg
              src="https://api.citydeft.com/wp-content/uploads/2025/05/logo.png"
              alt="Логотип Deft Group"
              loading="lazy"
            />
          </nuxt-link>
        </div>
        <v-nav class="header-navs" />
        <div class="actions">
          <v-btn name="Связаться" @click="openModal('form')" class="callback" />
          <nuxt-link to="/favorite" class="hearth-link">
            <icons icon="mdi:heart" />
            <div class="counter" v-if="likes && likes.length">{{ likes?.length }}</div>
          </nuxt-link>
          <div class="trigger-burger" @click="openModal('burger')">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useLikesStoreRefs } from "~/store/useLikesStore";
import TopHeader from "./TopHeader.vue";
import vNav from "@/components/ui-kit/v-nav.vue";
import vBtn from "@/components/ui-kit/v-btn.vue";
import { useModalStore } from "~/store/useModalStore";
import icons from "../icons/icons.vue";

const { likes } = useLikesStoreRefs();
const { openModal } = useModalStore();
</script>

<style lang="scss" scoped>
.header-main {
  @include flex-space;
  padding: 2.1rem 0 1.6rem 0;
  @include bp($point_2) {
    padding: 1.2rem 0;
    font-size: 1.4rem;
  }
}

.logo {
  max-width: 16.1rem;
  margin-right: 6.6rem;

  @include bp($point_2) {
    max-width: 10rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.actions {
  @include flex-end;
  column-gap: 2.8rem;
}

.hearth-link {
  color: $yellow;
  width: 3.6rem;
  height: 3.6rem;
  @include flex-center;
  position: relative;
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    color: $accent;
    .counter {
      background-color: $red;
    }
  }
}

.counter {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: $orange;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  @include flex-center;
  line-height: 0;
  font-size: 1rem;
  font-weight: 600;
  padding-right: 0.1rem;
  padding-left: 0.2rem;
  transition: all 0.3s ease;
}

.trigger-burger {
  width: 4rem;
  height: 2.7rem;
  position: relative;
  cursor: pointer;
  @include bp($point_2, $direction: min) {
    display: none;
  }
  span {
    position: absolute;
    right: 0;
    width: 100%;
    height: 0.4rem;
    background-color: $yellow;
    border-radius: 1rem;
    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      max-width: 70%;
    }
    &:nth-child(3) {
      bottom: 0;
    }
  }
}

.header-navs {
  @include bp($point_2) {
    display: none;
  }
}

.callback {
  @include bp($point_4) {
    display: none;
  }
}
</style>
