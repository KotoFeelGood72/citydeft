<template>
  <div class="template-hero" v-if="content">
    <div :class="[{ container: container }, classes]">
      <div class="templateHero__main">
        <div class="templateHero__content">
          <section-title
            v-if="content.title"
            :title="content.title?.rendered || ''"
            class="big"
          />
          <section-title
            v-if="content.acf?.procedure_subtitle"
            :title="content.acf.procedure_subtitle"
            class="big-small"
          />
          <div class="templateHero-content__txt" :class="{ small }">
            <div
              v-if="content.excerpt"
              v-html="content.excerpt?.rendered || content.excerpt"
            ></div>
          </div>
        </div>
        <nuxt-img v-if="img" :src="img.source_url || img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sectionTitle from "../ui-kit/section-title.vue";

defineProps<{
  content: {
    title?: any;
    excerpt?: any;
    acf?: any;
  };
  img?: any;
  small?: boolean;
  container?: boolean;
  classes?: string;
}>();
</script>

<style lang="scss" scoped>
.template-hero {
  position: relative;
  margin-bottom: 6rem;
  border-top: 0.1rem solid #e5e5e55e;
  // border-bottom: .1rem solid #e5e5e55e;

  .templateHero__main {
    @include flex-space;
    align-items: flex-start;
  }

  img {
    margin-left: -5%;
    display: block;
    pointer-events: none;
    height: 100%;
    @include bp($point_2) {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .big {
    margin-bottom: 6rem;
    line-height: 120%;
    color: #555555;
    @include bp($point_2) {
      margin-bottom: 2rem;
    }
  }
}

.templateHero__content {
  padding: 6rem 0;
  max-width: 50%;
  font-size: 2rem;
  line-height: 3rem;
  z-index: 2;
  @include bp($point_2) {
    max-width: 100%;
    font-size: 1.6rem;
  }
  &:before {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: "";
    width: 100%;
    height: 102%;
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.397) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    z-index: -1;
    display: none;
    @include bp($point_2) {
      display: block;
    }
  }
}

.templateHero-content__txt {
  &.small {
    div {
      font-size: 1.8rem;
      line-height: 2.6rem;
      @include bp($point_2) {
        font-size: 1.4rem;
        line-height: 2.4rem;
      }
      :deep(p) {
        margin-bottom: 2rem;
      }
    }
  }
}

.big-small {
  margin-bottom: 2rem;
  line-height: 120%;
}
</style>
