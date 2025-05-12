<template>
  <div class="select">
    <label :for="id">{{ label }}</label>
    <div class="select_w">
      <Multiselect
        v-model="selectedValue"
        :selected="selectedValue"
        :multiple="multiple"
        :searchable="true"
        :options="option"
        placeholder="Выбрать"
        selectLabel=""
        selectedLabel=""
        deselectLabel=""
        openDirection="bottom"
        @input="onInput"
        :hide-selected="stateSelected"
        @open="onOpen"
        @close="onClose"
      >
        <template #selection="{ values, isOpen: msOpen }">
          <span class="multiselect__single" v-if="values.length" v-show="!msOpen">
            Выбрано: {{ values.length }}
          </span>
        </template>
        <template #clear>
          <div class="multiselect__clear" v-if="selectedValue.length"></div>
        </template>
        <span slot="noResult">Нет подходящих параметров</span>
      </Multiselect>
      <div class="select-icon" :class="{ active: !isOpen }">
        <icons icon="carbon:chevron-down" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Multiselect from "vue-multiselect";
import icons from "../icons/icons.vue";

interface Props {
  option: any[];
  label: string;
  id: string;
  multiple: boolean;
  stateSelected: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "input", value: any[]): void;
}>();

const selectedValue = ref<any[]>([]);
const isOpen = ref(true);

function onInput(val: any[]) {
  emit("input", val);
}

function onOpen() {
  isOpen.value = false;
}

function onClose() {
  isOpen.value = true;
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
:deep(.multiselect__select) {
  display: none;
}
:deep(.multiselect__option) {
  padding: 1rem;
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
  min-width: 21rem;
}
@media (max-width: $point_4) {
  :deep(.multiselect) {
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

    @include bp($point_4) {
      font-size: 1.2rem;
    }
  }
  :deep(.multiselect__single) {
    @include bp($point_4) {
      font-size: 1.2rem !important;
    }
  }
  :deep(.multiselect__placeholder) {
    @include bp($point_4) {
      font-size: 1.2rem !important;
    }
  }
  :deep(.multiselect__content-wrapper) {
    font-size: 1.2rem;
  }
}

.select_w {
  position: relative;
  width: 100%;

  .select-icon {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    @include flex-center;
    transition: transform 0.3s ease;

    &.active {
      transform: translateY(-50%) rotate(180deg);
    }
  }
}
</style>
