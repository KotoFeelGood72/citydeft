<template>
  <div class="actions" v-if="data">
    <div class="container">
      <div class="actions_main">
        <div class="actions_content">
          <section-title :title="data['action-block'].title" :level="3" class="big-xl" />
          <p class="description" :class="{ 'form-description': forms }">
            {{ data["action-block"].txt }}
          </p>
          <component v-if="forms" :is="vForm" class="actions-form" :data="optionsForm" />
          <v-btn
            v-else
            name="Узнать больше"
            icon="bi:chevron-right"
            class="big-name"
            @click="router.push(data['action-block'].link)"
          />
        </div>
        <div class="actions__img">
          <NuxtImg src="about.png" alt="" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

import sectionTitle from "../ui-kit/section-title.vue";
import vForm from "../templates/v-form.vue";
import vBtn from "../ui-kit/v-btn.vue";

interface ActionBlock {
  title: string;
  txt: string;
  link: string;
}

const props = defineProps<{
  forms?: boolean;
  data?: { "action-block": ActionBlock };
}>();

const router = useRouter();

const optionsForm = reactive({
  btnClass: "rounded-btn small",
  btn: "Отправить",
  question: "Введите имя",
});

// Импортированные компоненты доступны в шаблоне напрямую
// vForm — форма, показываемая когда props.forms === true
// sectionTitle и vBtn тоже можно использовать как есть
</script>

<style lang="scss" scoped>
.actions {
  background-color: $gray;
  overflow: hidden;
}

.actions_main {
  @include flex-space;
  align-items: flex-start;
  position: relative;

  .description {
    padding: 3rem 0 6rem 0;
    font-size: 1.8rem;
    color: $dark-light;

    &.form-description {
      padding: 3rem 0 2.7rem 0;
    }
  }
}

.actions_content {
  max-width: 62.7rem;
  margin-right: 5rem;
  padding: 6rem 0 4.3rem 0;
  @include bp($point_2) {
    max-width: 50%;
  }
  @include bp($point_4) {
    max-width: 100%;
    margin: 0;
  }
}

.big-name {
  font-size: 1.8rem;
}

.actions__img {
  width: 100%;
  height: 100%;
  max-width: 56rem;
  margin-bottom: -0.5rem;
  @include bp($point_2) {
    position: absolute;
    bottom: 0;
    right: -5rem;
    margin-bottom: 0;
  }
  @include bp($point_4) {
    display: none;
  }
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}
</style>
