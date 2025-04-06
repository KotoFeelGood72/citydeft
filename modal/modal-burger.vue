<template>
    <div class="burger">
        <div class="burger-bg" @click="closeModal('burger')"></div>
        <div class="burger-main">
            <div class="close" @click="closeModal('burger')">
                <icons icon="icon-park-outline:close"/>
            </div>
            <div class="logo">
                <nuxt-link to="/">
                    <NuxtImg
                        src="logo.png"
                        alt=""
                        loading="lazy"
                    />
                </nuxt-link>
            </div>
            <v-click-nav class="burger-nav" :nav="modal"/>
        </div>
    </div>
</template>

<script>
    import vClickNav from '../components/ui-kit/v-click-nav.vue';
    import icons from '../components/icons/icons.vue';
    export default {
        components: {
            vClickNav,
            icons
        },
        methods: {
            closeModal(modal) {
                this.$store.commit('openPopup', modal)
            }
        },
        props: ['modal'],
    }
</script>

<style lang="scss" scoped>

.burger {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.burger-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $dark;
    opacity: .6;
}

.burger-main {
    background-color: $white;
    position: relative;
    height: 100%;
    max-width: 40rem;
    padding: 3rem;
}

.logo {
    max-width: 15rem;
    margin-bottom: 3rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    cursor: pointer;
    transition: all .3s ease;
    &:hover {
        color: $orange;
    }
}

</style>
