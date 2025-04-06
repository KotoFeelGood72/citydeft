<template>
    <div class="documents">
        <div class="container">
            <div class="documents_main">
                <section-title :title="title" class="big"/>
                <ul class="documents_list">
                    <li v-for="(item, i) in documents_list" :key="'documents-item-' + i">
                        <div class="documents__item">
                            <a :href="item.img" data-fancybox>
                                <nuxt-img
                                    :src="item.img"
                                />
                            </a>
                        </div>
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
        props: ['title', 'documents_list']
    }
</script>

<style lang="scss" scoped>

.documents_main {
    margin-bottom: 8rem;

    .big {
        text-align: center;
        margin-bottom: 5rem;
    }
}

.documents_list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
    grid-gap: 3rem 5rem;
    @include bp($point_4) {
      grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
      grid-gap: 1rem;
    }
    li {
        a {
            @include flex-center;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}

</style>
