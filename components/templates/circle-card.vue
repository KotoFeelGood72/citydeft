<template>
  <div class="card">
    <div class="card-img">
      <NuxtImg v-if="data.img" :src="data.img" />
    </div>
    <div class="card-content">
      <div class="card-title">
        <h3>{{ data.title }}</h3>
      </div>
      <div class="card-txt" v-html="data.txt"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  data: any;
}>();
</script>

<style scoped lang="scss">
.card {
  @include flex-start;
  background-color: #d9d9d9;
  padding: 1.5rem 5rem 1.5rem 3.6rem;
  border-radius: 0.6rem;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: rgb(217, 217, 217);

  @include bp($point_2) {
    flex-direction: column;
    padding: 3rem 2rem;
  }
}

.card-img {
  min-width: 30rem;
  width: 30rem;
  height: 30rem;
  position: relative;
  margin-right: 7.3rem;
  margin-top: -7.5rem;
  margin-bottom: 6.2rem;
  z-index: 2;

  @include bp($point_2) {
    min-width: auto;
    width: 20rem;
    height: 20rem;
    margin: 0 auto 3rem auto;
  }
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    content: "";
    transform: translate(-50%, -50%);
    background-color: $white;
    border-radius: 100%;
    width: 110%;
    height: 110%;
    z-index: -1;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }
}

.card-content {
  flex-grow: 1;
  font-size: 1.8rem;
  @include bp($point_2) {
    font-size: 1.4rem;
  }
}

.card-title {
  h3 {
    font-size: 2rem;
    padding-bottom: 1.2rem;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }
  border-bottom: 0.1rem solid $white;
  margin-bottom: 2.5rem;
}

.card-txt {
  :deep(ul) {
    padding-left: 2rem;
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
  :deep(li) {
    list-style: disc;
  }
  :deep(p) {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
  :deep(ol) {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
}
</style>
