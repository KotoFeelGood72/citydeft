<template>
  <div class="partners">
    <div class="container">
      <div class="partners_main">
        <section-title :title="title" class="big" />
        <ul class="partners_list">
          <li v-for="(item, i) in partners_list" :key="`partners-item-${i}`">
            <NuxtImg :src="item.img" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import sectionTitle from "../ui-kit/section-title.vue";

interface PartnerItem {
  img: string;
}

const props = defineProps<{
  title: string;
  partners_list: PartnerItem[];
}>();
</script>

<style lang="scss" scoped>
.partners {
  margin-bottom: 8rem;
}

.partners_list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  grid-gap: 3rem 10rem;

  @include bp($point_2) {
    grid-template-columns: repeat(auto-fill, minmax(46%, 1fr));
    grid-gap: 2rem;
  }

  li {
    @include flex-center;
  }
}

.partners_main {
  .big {
    text-align: center;
    margin-bottom: 5rem;
  }
}
</style>
