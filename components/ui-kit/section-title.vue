<template>
    <component :is="`h${level}`">{{ title }} <span><slot></slot></span></component>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      level: {
        type: Number,
        default: 1
      }
    }
  }
</script>

<style lang="scss" scoped>

.big {
  font-size: 4.4rem;
  font-weight: 700;
  line-height: 100%;

  @include bp($point_2) {
    font-size: 3.5rem;
  }
  @include bp($point_4) {
    font-size: 2.6rem;
  }
}
.big-xl {
  font-size: 4.8rem;
  font-weight: 800;
  @include bp($point_2) {
    font-size: 3.5rem;
  }
}

</style>
