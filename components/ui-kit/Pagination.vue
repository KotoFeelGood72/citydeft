<template>
  <nav class="pagination" v-if="totalPages > 1">
    <button
      class="page-btn"
      :disabled="modelValue === 1"
      @click="$emit('update:modelValue', modelValue - 1)"
    >
      <icons icon="akar-icons:chevron-left" />
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      :class="['page-btn', { active: page === modelValue }]"
      @click="$emit('update:modelValue', page)"
    >
      {{ page }}
    </button>

    <button
      class="page-btn"
      :disabled="modelValue === totalPages"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      <icons icon="akar-icons:chevron-right" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number;
  totalPages: number;
  maxVisiblePages?: number;
}>();

const emit = defineEmits(["update:modelValue"]);

const visiblePages = computed(() => {
  const pages: number[] = [];
  const half = Math.floor((props.maxVisiblePages || 5) / 2);
  let start = Math.max(1, props.modelValue - half);
  let end = Math.min(props.totalPages, start + (props.maxVisiblePages || 5) - 1);

  if (end - start + 1 < (props.maxVisiblePages || 5)) {
    start = Math.max(1, end - (props.maxVisiblePages || 5) + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 2rem 0;
}

.page-btn {
  @include flex-center;
  width: 5rem;
  height: 5rem;
  border: 0.1rem solid $gray;
  font-size: 1.8rem;
  cursor: pointer;
}

.page-btn:hover:not(:disabled) {
  background: #f0f0f0;
}

.page-btn:disabled {
  cursor: default;
  opacity: 0.5;
}

.page-btn.active {
  background: #333;
  color: #fff;
  border-color: #333;
  pointer-events: none;
}
</style>
