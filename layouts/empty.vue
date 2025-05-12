<template>
  <div class="pages">
    <Header />
    <main class="main">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/templates/Header.vue";
import Footer from "@/components/templates/Footer.vue";
</script>

<style lang="scss" scoped>
.pages {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  padding: 2rem;
}
</style>
