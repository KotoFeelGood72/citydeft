<template>
    <div class="modal-form">
        <div class="modalform-bg" @click="closeModal('form')"></div>
        <div class="form__main">
            <div class="close" @click="closeModal('form')"><icons icon="ooui:close"/></div>
            <div class="form__header">
                <section-title title="Связаться с нами" :level="3" class="big-xl"/>
            </div>
            <div class="form-start">
                <p>Можно любым удобным способом:</p>
                <div class="form_start__contacts">
                    <div class="form_start__num">
                        <a href="tel:+905077060007" target="_blank">+90 507 706 00 07</a>
                    </div>
                    <div>
                        <ul>
                            <li v-for="(item, i) in social" :key="'social-' + i">
                                <a :href="item.link" target="_blank">
                                    <icons :icon="item.icon"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="form_start__mail">
                        <a href="mailto:Customer.citydeft@gmail.com" target="_blank">customer.citydeft@gmail.com</a>
                    </div>
                </div>
                <div class="form_start__actions">
                    <p>Или оставьте свои контактные данные и мы свяжемся с вами</p>
                    <v-form :data="form"/>
                </div>
            </div>
            <div class="form-end" v-if="false">
                <section-title title="Связаться с нами" :level="3" class="big-xl"/>
                <p>Мы свяжемся с вами в ближайшее время.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import vForm from '../components/templates/v-form'
    import sectionTitle from '../components/ui-kit/section-title'
    import icons from '../components/icons/icons.vue'
    export default {
        components: { sectionTitle, vForm, icons },
        data() {
            return {
                social: [
                    { icon: 'ic:baseline-whatsapp', link: 'https://api.whatsapp.com/send/?phone=905077060007&text&type=phone_number&app_absent=0' },
                    { icon: 'file-icons:telegram', link: 'https://t.me/DEFT_GROUP_turkey' },
                ],
                form: {
                    btnClass: 'gray rounded-btn',
                    btn: 'Отправить',
                    question: 'Введите имя'
                }
            }
        },
        methods: {
            closeModal(modal) {
                this.$store.commit('openPopup', modal)
            }
        }
    }
</script>

<style lang="scss" scoped>

.big-xl {
    color: $white;
    @include bp($point_2) {
      font-size: 2rem;
    }
}

.modalform-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000075;
}

.modal-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include flex-center;
    z-index: 999;
    @include bp($point_2) {
      padding: 2rem;
    }

    .form__main {
        max-width: 72.9rem;
        border-radius: 8.2rem;
        background-color: $gray;
        text-align: center;
        overflow: hidden;
        color: $dark-light;
        position: relative;

        @include bp($point_2) {
          max-width: 100%;
          border-radius: 3rem;
        }
        a {
            color: inherit;
            font-family: $font_2;
            font-weight: 400;
        }
    }
}

.form-start {
    padding: 2.5rem 10rem;
    background-color: $yellow;
    border-radius: 8.2rem;
    @include bp($point_2) {
      padding: 4rem 1.5rem;
      border-radius: 3rem;
    }
    &>p {
        margin-bottom: 2rem;
    }
}

.form_start__contacts {
    @include flex-center;
    flex-wrap: wrap;
    font-size: 1.8rem;
    margin: -2rem -2rem 3rem 0;
    @include bp($point_2) {
          margin: -1rem -1rem 1rem 0;
          font-size: 1.4rem;
        }
    &>div {
        padding: 2rem 2rem 0 0;
        @include bp($point_2) {
          padding: 1rem 1rem 0 0;
        }
    }

    ul {
        @include flex-center;
        li {
            width: 4rem;
            height: 4rem;
            a {
                width: 3rem;
                height: 3rem;
                @include flex-center;
                svg {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}


.form_start__actions {
    p {
        font-family: $font_2;
        font-weight: 400;
        margin-bottom: 2rem;
        @include bp($point_2) {
          font-size: 1.4rem;
        }
    }

    .form {
        max-width: 32.7rem;
        margin: 0 auto;
        :deep(.input) {
            margin-bottom: 2rem;
        }
    }
}

.close {
    position: absolute;
    top: 3.6rem;
    right: 3.6rem;
    color: $white;
    cursor: pointer;
    @include bp($point_2) {
      top: 1.5rem;
      right: 1rem;
    }
    svg {
        width: 100%;
        height: 100%;
    }
}

.form__header {
    padding: 1.2rem 0;
}
</style>
