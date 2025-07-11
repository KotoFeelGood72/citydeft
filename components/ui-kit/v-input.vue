<template>
  <div class="input" :class="{ error }">
    <label :for="id" v-if="label">{{ label }}</label>
    <div class="input__w">
      <span class="minilabel" v-if="minilabel">{{ minilabel }}</span>
      <input
        v-if="mask"
        :type="type"
        :placeholder="place"
        :max="max"
        :min="min"
        :id="id"
        @input="onInput"
        :value="value"
      />
      <!-- v-mask="'+##-###-###-##-##'" -->
      <input
        v-else
        :type="type"
        :placeholder="place"
        :max="max"
        :min="min"
        :id="id"
        @input="onInput"
        :value="value"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  type?: string;
  place?: string;
  max?: number | string;
  min?: number | string;
  label?: string;
  id: string;
  minilabel?: string;
  mask?: boolean;
  error?: boolean;
  value?: string | number;
}>();

const emit = defineEmits<{
  (e: "input", value: string): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("input", target.value);
};
</script>

<style lang="scss" scoped>
.input {
  font-family: $font_2;
  font-weight: 400;

  &.error {
    input {
      border-color: #fc6760;
      box-shadow: 0 0 20px 0 #e61f140c;

      &::-webkit-input-placeholder {
        color: #fc6760;
      }
      &:-ms-input-placeholder {
        color: #fc6760;
      }
    }
  }
  label {
    font-size: 1.4rem;
    font-weight: 400;
    font-family: $font_2;
    margin-bottom: 1.2rem;
    display: block;
    text-align: center;
  }
  input {
    @include app;
    background-color: $white;
    padding: 1.3rem 1.2rem;
    border-radius: 10rem;
    color: $dark;
    font-size: 1.4rem;
    font-family: $font_2;
    font-weight: 400;
    width: 100%;
    border: 0.1rem solid $trans;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.minilabel {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1.2rem;
  pointer-events: none;
}

.input__w {
  position: relative;
}

input[type="number"] {
  padding: 1.3rem 3.5rem;
}
</style>
