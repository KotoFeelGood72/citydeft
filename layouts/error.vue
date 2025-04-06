<template>
    <div class="error-page">
        <div class="container">
            <div class="error_page__main">
                <h1>ОЙ!</h1>
                <div class="error_page__message">
                    <h2>Похоже, но мы можем найти нужную страницу.Но мы может найти для вас лучшее жилье в Турции!</h2>
                    <nuxt-link to="/">Выбрать квартиру</nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>

.error_page__main {
    @include flex-start;
    color: $dark-light;
    align-content: flex-start;
    padding: 15rem 0;

    @include bp($point_2) {
        flex-direction: column;
        // align-content: flex-start;
        text-align: center;
        padding: 5rem 0;
    }


    h1 {
        font-size: 15rem;
        margin-top: -11rem;
        margin-right: 6.2rem;
        position: relative;
        @include bp($point_2) {
            text-align: left;
            margin: 0 0 2rem 0;
        }
        @include bp($point_5) {
            font-size: 10rem;
        }
        &:before {
            content: 'код ошибки 404';
            font-size: 2rem;
            font-family: $font_2;
            font-weight: 600;
            position: absolute;
            bottom: 0;
            left: 1rem;
        }
    }

    h2 {
        font-size: 3.6rem;
        margin-bottom: 6rem;
        @include bp($point_5) {
            font-size: 2rem;
            margin-bottom: 3rem;
        }
    }

    a {
        background-color: $yellow;
        padding: 1rem 4.5rem;
        font-size: 1.8rem;
        font-family: $font_2;
        border-radius: 0.5rem;
        @include flex-center;
        display: inline-flex;
        &:hover {
            background-color: $accent;
        }
    }
}

</style>
