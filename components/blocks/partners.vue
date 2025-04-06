<template>
    <div class="partners">
        <div class="container">
            <div class="partners_main">
                <section-title :title="title" class="big"/>
                <ul class="partners_list">
                    <li v-for="(item, i) in partners_list" :key="'partners-item-' + i">
                        <nuxt-img
                            :src="item.img"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import sectionTitle from '../ui-kit/section-title';
    export default {
        components: {
            sectionTitle
        },
        props: ['title', 'partners_list']
    }
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
        box-shadow: 0px 10.424965858459473px 10.424965858459473px 0px #003F800D;
        border-radius: 1rem;
        height: 8.3rem;
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
