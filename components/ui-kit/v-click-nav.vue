<template>
  <nav class="nav">
      <ul class="nav-list" v-if="nav">
          <li v-for="(item, index) in nav['header-nav']" :key="'nav-' + index" class="nav_item__parent" @click="item.submenu && item.on_submenu ? toggleSubMenu(index) : null">
              <div :class="{'active': activeIndex === index}">
                  <!-- Условие для проверки наличия подменю -->
                  <template v-if="item.submenu && item.on_submenu">
                      <p>{{ item.name }}</p>
                      <div class="icon" :class="{'active': activeIndex === index}">
                          <icons icon="fluent:triangle-down-16-filled"/>
                      </div>
                  </template>
                  <!-- Выводим ссылку, если подменю нет -->
                  <template v-else>
                      <nuxt-link :to="item.link"><p>{{ item.name }}</p></nuxt-link>
                  </template>
              </div>
              <transition name="translate">
                  <ul class="sub-menu" v-if="activeIndex === index && item.submenu && item.on_submenu">
                      <li v-for="(subitem, subIndex) in item.submenu" :key="'sub-nav-' + subIndex" class="nav_item__submenu">
                          <nuxt-link :to="item.link + subitem.link">{{ subitem.name }}</nuxt-link>
                      </li>
                  </ul>
              </transition>
          </li>
      </ul>
  </nav>
</template>


<script>
    import icons from '../icons/icons.vue';
    export default {
        components: {
            icons
        },
        data() {
            return {
                activeIndex: false,
            }
        },
        props: ['nav'],
        methods: {
            toggleSubMenu(index) {
                this.activeIndex = this.activeIndex === index ? false : index;
            },
            closeModal(modal) {
                this.$store.commit('openPopup', modal)
                console.log('Good')
            },
          },
          beforeRouteLeave(to, from, next) {
              this.closeModal('burger'); // Вызов closeMenu перед переходом на другой маршрут
              next(); // Продолжение перехода на другой маршрут
          }
    }
</script>

<style lang="scss" scoped>

.nav {
    margin-right: 3.8rem;
}

.nav-list {
}
.icon {
    position: absolute;
    top: 55%;
    right: 0;
    left: auto;
    transform: translateY(-50%);
    width: 1.3rem;
    height: 1.3rem;
    color: $gray;
    @include flex-center;
    transition: all .3s ease;

    &.active {
        transform: translateY(-50%) rotate(180deg);
        color: $orange;
    }
    svg {
        width: 100%;
        height: 100%;
    }
}



.burger-nav {
  margin-right: 0;
    a {
        &:hover {
            color: $orange;
        }
    }
    &>ul {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        &>li {
            // overflow: hidden;
            p {
              position: relative;
              padding: 2.4rem 0;
            &:before {
              position: absolute;
              bottom: 0;
              left: -100%;
              width: 300%;
              content: '';
              border-bottom: .1rem solid rgb(217, 217, 217);
            }
            }
            &>div {

                &.active {
                    color: $orange;
                }
                cursor: pointer;
                position: relative;
                &:hover {
                    color: $orange;
                }
            }
            font-size: 2.4rem;
            color: #555555;
            font-weight: 500;
        }
    }
}

.sub-menu {
    li {
        font-size: 1.6rem;
        padding: 1.3rem 0;
        position: relative;
        &:before {
              position: absolute;
              bottom: 0;
              left: -100%;
              width: 300%;
              content: '';
              border-bottom: .1rem solid rgb(217, 217, 217);
            }
    }
}




.translate-enter, .translate-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.translate-enter-active, .translate-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}


.translate-enter-to, .translate-leave {
  opacity: 1;
  transform: translateY(0);
}

</style>
