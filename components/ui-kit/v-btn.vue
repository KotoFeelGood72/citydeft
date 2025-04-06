<template>
    <div class="button">
        <p v-if="name">{{ name }}</p>
        <div class="icon" v-if="icon">
            <icons :icon="icon" :width="width" :height="height"/>
        </div>
    </div>
</template>

<script>
    import icons from '../icons/icons.vue';
    export default {
       props: ['name', 'icon', 'width', 'height'], 
       components: {
        icons
       }
    }
</script>

<style lang="scss" scoped>

.button {
    background-color: $yellow;
    cursor: pointer;
    padding: 1.1rem 4.5rem;
    font-family: $font_2;
    font-weight: 400;
    border-radius: 0.6rem;
    transition: all .3s ease;
    @include flex-center;
    display: inline-flex;
    position: relative;

    &.border {
        background-color: $trans;
        position: relative;
        &:before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            content: '';
            border: .2rem solid $yellow;
            border-radius: 0.6rem;
        }
    }

    &.gray {
        background-color: $gray;
        padding: 1.1rem 4.5rem;
        
        &:hover {
            background-color: $white;
        }
    }
    &:hover {
        background-color: $accent;
    }


}

.rounded-btn {
    padding: 2rem 4.5rem;
    border-radius: 10rem;
}

.small {
    padding: 1.3rem 4.5rem;
}

.icon {
    width: 2rem;
    height: 1.8rem;
    margin-left: 0.5rem;
    svg {
        @include flex-center;
        width: 100%;
        height: 100%;
    }
}

</style>