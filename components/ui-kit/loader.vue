<template>
    <div class="loader">
        <img src="~/assets/img/loader.gif" alt="">
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
svg{
  width: 12rem;
  height: auto;
}

.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include flex-center;
    z-index: 9999;
    background-color: $white;
    color: #ff0000;
}
</style>