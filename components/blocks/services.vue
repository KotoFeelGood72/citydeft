<template>
    <div class="services" v-if="data">
        <div class="container">
            <div class="services_main">
                <section-title :title="data['all-service'].title" :level="3" class="big"/>
                <div class="services_columns">
                    <div>
                        <ul class="services__list">
                            <li v-for="(item, i) in data['all-service']['list-left']" :key="'services-one-' + i">
                                <div class="icon">
                                    <icons :icon="item.icon"/>
                                </div>
                                <div class="item-content">
                                    <p>{{ item.title }}</p>
                                    <span>{{ item.txt }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div class="column-img">
                            <NuxtImg
                                :src="data['all-service'].img"
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div>
                        <ul class="services__list">
                            <li v-for="(item, i) in data['all-service']['list-right']" :key="'services-two-' + i">
                                <div class="icon">
                                    <icons :icon="item.icon"/>
                                </div>
                                <div class="item-content">
                                    <p>{{ item.title }}</p>
                                    <span>{{ item.txt }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import icons from '../icons/icons.vue';
import sectionTitle from '../ui-kit/section-title'
    export default {
        components: { sectionTitle, icons },
        props: ['data'],
    }
</script>

<style lang="scss" scoped>

.services_main {
    .big {
        text-align: center;
        margin-bottom: 4.7rem;
    }
}

.services_columns {
    @include flex-start;
    align-items: flex-start;
    margin: -4rem -4rem 0 0;

    @include bp($point_2) {
        flex-direction: column;
        margin: 0;
    }
    &>div {
        padding: 4rem 4rem 0 0;
        @include bp($point_2) {
            padding: 0;
        }
    }
}

.column-img {
    border-radius: 1rem;
    overflow: hidden;
    @include flex-center;
    @include bp($point_2) {
        display: none;
    }
    img {
        width: 100%;
        // height: 100%;
        object-fit: cover
    }
}

.services__list {
  &:first-child {
    @include bp($point_4) {
      margin-bottom: 4rem;
    }
  }
    li {
        @include flex-start;
        align-items: flex-start;
        @include bp($point_2) {
            // min-height: 13.5rem;
            box-shadow: 0 .4rem .4rem 0 #00000040;
            border-radius: 0.7rem;
            padding: 2rem;
            // flex-direction: column;
            // align-items: center;
            // text-align: center;
        }
        &:not(:last-child) {
            margin-bottom: 7rem;
            @include bp($point_2) {
                margin-bottom: 4rem;
            }
            @include bp($point_6) {
                margin-bottom: 2rem;
            }
        }

        p {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            @include bp($point_2) {
              font-size: 1.8rem;
            }
          }
          span {
            font-size: 1.8rem;
            @include bp($point_2) {
              font-size: 1.4rem;
            }
        }

        .icon {
            width: 4rem;
            height: 4rem;
            min-width: 4rem;
            @include flex-center;
            position: relative;
            color: $orange;
            margin-right: 1.2rem;
            @include bp($point_2) {
              margin-bottom: 2rem;
              width: 2.4rem;
              min-width: 2.4rem;
              height: 2.4rem;
              padding: .3rem;
            }
            &:before {
                border-radius: 0.5rem;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                content: '';
                background-color: $orange;
                opacity: .1;
                z-index: -1;
            }
        }
    }
}

</style>
