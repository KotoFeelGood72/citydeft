<template>
  <nav class="col-nav" v-if="data">
    <h6>{{ data.title }}</h6>
    <ul>
      <li v-for="(item, i) in data.nav" :key="`col-nav-${data.id}-${i}`">
        <nuxt-link v-if="!item.contacts" :to="item.link">
          <div class="icon" v-if="item.icon && item.icons">
            <icons :icon="item.icon" />
          </div>
          <p>{{ item.title }}</p>
        </nuxt-link>
        <a v-else target="_blank" rel="noopener" :href="item.link">
          <div class="icon" v-if="item.icon && item.icons">
            <icons :icon="item.icon" />
          </div>
          <p>{{ item.title }}</p>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import icons from "../icons/icons.vue";

interface NavItem {
  link: string;
  title: string;
  icon?: string;
  icons?: boolean;
  contacts?: boolean;
}

interface ColNavData {
  id: string | number;
  title: string;
  nav: NavItem[];
}

const props = defineProps<{
  data: ColNavData;
}>();
</script>

<style lang="scss" scoped>
.col-nav {
  h6 {
    font-size: 2.4rem;
    font-weight: 500;
    font-family: $font_2;
    margin-bottom: 2.4rem;

    @include bp($point_2) {
      font-size: 2rem;
    }
  }
}

ul {
  li {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    a,
    .nuxt-link {
      font-size: 1.8rem;
      font-family: $font_2;
      color: $dark-light;
      @include flex-start;

      @include bp($point_2) {
        font-size: 1.4rem;
        justify-content: center;
      }

      .icon {
        margin-right: 1rem;
        width: 2rem;
        height: 2rem;

        svg {
          @include flex-center;
          width: 100%;
          height: 100%;
        }
      }

      &:hover {
        color: $orange;
      }
    }
  }
}
</style>
