<template>
    <div class="pages">
        <Header/>
        <main class="main">
            <p>Goods empty</p>
            <Nuxt/>
        </main>
        <Footer/>
    </div>
</template>

<script>
    import Header from '@/components/templates/Header';
    import Footer from '@/components/templates/Footer';
    export default {
        components: { Header, Footer }
    }
</script>

<style lang="scss" scoped>

</style>