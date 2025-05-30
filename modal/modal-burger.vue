<template>
  <div class="burger">
    <div class="burger-bg" @click="closeAllModals" />
    <div class="burger-main">
      <div class="close" @click="closeAllModals">
        <icons icon="icon-park-outline:close" />
      </div>
      <div class="logo">
        <nuxt-link to="/">
          <NuxtImg
            src="https://api.citydeft.com/wp-content/uploads/2025/05/logo.png"
            alt="Логотип Deft Group"
            loading="lazy"
          />
        </nuxt-link>
      </div>
      <v-click-nav class="burger-nav" :nav="options" />
      <switchLang class="burger-switch" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useModalStore } from "~/store/useModalStore";
import vClickNav from "../components/ui-kit/v-click-nav.vue";
import icons from "../components/icons/icons.vue";
import { useOptionsStoreRefs } from "~/store/useOptionsStore";
import switchLang from "~/components/ui-kit/switch-lang.vue";

const { options } = useOptionsStoreRefs();

interface Props {
  modal: any;
}

const props = defineProps<Props>();
const { closeAllModals } = useModalStore();
</script>

<style lang="scss" scoped>
.burger {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.burger-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $dark;
  opacity: 0.6;
}

.burger-main {
  background-color: $white;
  position: relative;
  height: 100%;
  max-width: 40rem;
  padding: 3rem;
  overflow: hidden;
}

.logo {
  max-width: 15rem;
  margin-bottom: 3rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: $orange;
  }
}
</style>
