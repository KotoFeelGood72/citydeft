<template>
  <div class="block-txt" v-if="data">
    <div class="container">
      <div class="block-txt__main" v-html="data"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  data: any;
}>();
</script>

<style scoped lang="scss">
.block-txt__main {
  margin-bottom: 4rem;
  :deep(p) {
    padding: 2rem 0;
    font-size: 2.2rem;
    font-family: $font_2;
    line-height: 3.2rem;
    @include bp($point_2) {
      font-size: 1.4rem;
      line-height: 2.4rem;
      padding: 1rem 0;
    }
  }

  :deep(.wp-block-heading) {
    font-size: 3.2rem;
    font-family: $font_2;
    color: #555555;
    padding: 2rem;
    @include bp($point_2) {
      font-size: 2rem;
      padding: 0.5rem 0;
      line-height: 130%;
    }
  }

  :deep(ul) {
    padding-left: 2rem;
    font-size: 2.2rem;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }

  :deep(li) {
    position: relative;
    padding-left: 3rem;
    margin-bottom: 2rem;
    font-family: $font_2;
    @include bp($point_2) {
      font-size: 1.6rem;
      padding-left: 1.5rem;
      margin-bottom: 1rem;
    }
    &:before {
      position: absolute;
      top: 0rem;
      line-height: 2.7rem;
      left: 0;
      content: "•";
      font-size: 3.5rem;
    }
  }
}
</style>
