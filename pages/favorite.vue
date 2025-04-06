<template>
  <div class="shop">
    <div class="shops">
      <div class="container">
        <div class="shop__main">
          <section-title title="Избранное" class="big" />
          <ul class="grid-3" v-if="getFavorites">
            <li v-for="item in getFavorites" :key="'shop-filters-' + item.id">
              <products-card :data="item" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsCard from "@/components/templates/products-card";
import sectionTitle from "@/components/ui-kit/section-title";
// import { mapGetters } from "vuex";
export default {
  components: {
    sectionTitle,
    productsCard,
  },
  computed: {
    // ...mapGetters(["getFavorites"]),
  },
};
</script>

<style lang="scss" scoped>
.shop__main {
  margin-bottom: 10rem;

  .global-paginate {
    justify-content: center;
  }
  .big {
    padding: 3.5rem 0 3.9rem 0;
  }

  .grid-3 {
    margin-bottom: 3.7rem;
  }
}
</style>
