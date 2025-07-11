<template>
  <div class="button" :class="{ loading }">
    <template v-if="loading">
      <span class="loader" />
    </template>
    <template v-else>
      <p v-if="name">{{ name }}</p>
      <div class="icon" v-if="icon">
        <icons :icon="icon" :width="width" :height="height" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name?: string;
  icon?: string;
  width?: number | string;
  height?: number | string;
  loading?: boolean;
}>();
</script>

<style lang="scss" scoped>
.button {
  background-color: $yellow;
  cursor: pointer;
  padding: 1.1rem 4.5rem;
  font-family: $font_2;
  font-weight: 400;
  border-radius: 0.6rem;
  transition: all 0.3s ease;
  @include flex-center;
  display: inline-flex;
  position: relative;

  &.loading {
    cursor: default;
    opacity: 0.7;
    pointer-events: none;
  }

  &.border {
    background-color: $trans;
    position: relative;
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: "";
      border: 0.2rem solid $yellow;
      border-radius: 0.6rem;
    }
  }

  &.gray {
    background-color: $gray;
    &:hover {
      background-color: $white;
    }
  }

  &:hover:not(.loading) {
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

// Simple CSS loader
.loader {
  width: 1.8rem;
  height: 1.8rem;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
