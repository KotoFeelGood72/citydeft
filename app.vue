<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { useOptionsStore } from "~/store/useOptionsStore";
import { useI18n } from "#imports";
const { locale } = useI18n();
const { getOptions } = useOptionsStore();

watchEffect(() => {
  getOptions(locale.value);
});
</script>
<style lang="scss">
@use "./assets/scss/style.scss";
</style>
