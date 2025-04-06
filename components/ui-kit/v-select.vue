<template>
    <div class="select">
        <label :for="id">{{ label }}</label>
        <div class="select_w">
            <multiselect
                :selected="selectedValue"
                :multiple="multiple"
                :searchable="true"
                v-model="selectedValue"
                :options="option"
                placeholder="Выбрать"
                selectLabel=""
                selectedLabel=""
                deselectLabel=""
                openDirection="bottom"
                @input="selected"
                :hide-selected="stateSelected"
            >
                <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">Выбрано: {{ values.length }}</span></template>
                <template slot="clear">
                    <div class="multiselect__clear" v-if="selectedValue.length"></div>
                </template><span slot="noResult">Нет походящих параметров</span>
            </multiselect>
            <div class="select-icon" :class="{'active': !isOpen}">
                <icons icon="carbon:chevron-down"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    import icons from '../icons/icons.vue';
    export default {
        props: ['option', 'label', 'id', 'multiple', 'stateSelected'],
        data() {
            return {
                selectedValue: [],
                isOpen: true,
            };
        },
        components: {
            Multiselect,
            icons
        },
        methods: {
            selected() {
                this.$emit('input', this.selectedValue);
            }
        },
    }
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>

:deep(.multiselect__select) {
    display: none
}

:deep(.multiselect__option) {
    padding: 1rem;
    min-height: auto;
    white-space: wrap;
}
:deep(.multiselect__input) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
:deep(.multiselect__tag) {
    border-radius: 10rem;
}

:deep(.multiselect) {
    width: 100%;
    min-width: 21rem
}

.multiselect {
  @include bp($point_4) {
      min-width: 100%;
    }
}



.select {
    @include flex-center;
    flex-direction: column;

    label {
        font-size: 1.4rem;
        font-weight: 400;
        font-family: $font_2;
        margin-bottom: 1.2rem;
        @include bp($point_4) {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
    }
    :deep(.multiselect__tags) {
        background-color: $white;
        padding: 1.3rem 1.2rem;
        border-radius: 10rem;
        overflow: hidden;
        color: $dark;
        font-size: 1.4rem;
        font-family: $font_2;
        font-weight: 400;
        width: 100%;
        height: 4.5rem;
    }
}

:deep(.multiselect__tags) {
  @include bp($point_4) {
    font-size: 1.2rem;
  }
}
:deep(.multiselect__single) {
  @include bp($point_4) {
    font-size: 1.2rem!important;
  }
}
:deep(.multiselect__placeholder) {
  @include bp($point_4) {
    font-size: 1.2rem!important;
  }
}

:deep(.multiselect__content-wrapper) {
    font-size: 1.2rem;
}

.select_w {
    position: relative;
    width: 100%;

    .select-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 2rem;
        width: 2rem;
        height: 2rem;
        @include flex-center;
    }
}

:deep(.multiselect__single) {
    font-size: 1.4rem;
}

</style>
