<template>
  <div class="selects">
    <select v-model="localValue">
      <option disabled value="">{{ $t("ui.select.empty") }}</option>

      <option
        v-for="(item, i) in options"
        :key="`options-item-${i}`"
        :value="item.id"
      >
        {{ $rt(item.name) }}
      </option>
    </select>
    <div class="chevron-icon">
      <icons icon="mynaui:chevron-up" :size="18" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import icons from "../icons/icons.vue";

interface SelectOption {
  id: string | number;
  name: string;
}

const { rt } = useI18n();

const props = defineProps<{
  options: SelectOption[];
  modelValue: string | number | null;
  selectFirst: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: string | number | null): void;
}>();

const localValue = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

watch(
  () => props.options,
  (opts) => {
    const shouldSelect = props.selectFirst !== false;
    if (shouldSelect && (!props.modelValue || props.modelValue === "") && opts?.length) {
      emit("update:modelValue", opts[0].id);
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.selects {
  flex-grow: 1;
  @include flex-center;
  position: relative;
  select {
    cursor: pointer;
    width: 100%;
    @include app;
    background-color: $white;
    padding: 1.35rem 2rem;
    border-radius: 0.5rem;
    font-size: 1.6rem;
  }
}

.chevron-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%) rotate(180deg);
  @include flex-center;
  pointer-events: none;
}
</style>
