<template>
    <div class="question">
        <div class="container">
            <div class="questions_main">
                <section-title title="Остались вопросы?" :level="5" class="big"/>
                <v-form :data="form" class="questions-form"/>
            </div>
        </div>
    </div>
</template>

<script>
    import sectionTitle from '../ui-kit/section-title';
    import vForm from '../templates/v-form';
    export default {
        components: {
            sectionTitle,
            vForm
        },
        data() {
            return {
                form: {
                    question: 'Написать вопрос...',
                    btn: 'Задать вопрос',
                    btnClass: 'gray rounded-btn'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

.questions_main {
    background-color: $yellow;
    padding: 2rem 10rem 5rem 10rem;
    border-radius: 1.5rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 11;

    @include bp($point_2) {
        padding: 4rem 3rem;
    }

    .big {
        text-align: center;
        margin-bottom: 3.1rem;
    }
}

.questions-form {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
    grid-gap: 4rem;
    @include bp($point_2) {
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
        grid-gap: 1rem;
    }
}

</style>