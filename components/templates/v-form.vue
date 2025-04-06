<template>
  <div class="form" :class="data?.class">
    <v-input
      :place="data?.question || 'Введите имя'"
      v-model="form.name"
      :error="v$.form.name.$error"
    />
    <v-input
      place="Введите номер телефона"
      type="tel"
      v-model="form.tel"
      :error="v$.form.tel.$error"
    />
    <v-btn :name="data?.btn || 'Отправить'" :class="data?.btnClass" @click="sendForm" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import vBtn from "@/components/ui-kit/v-btn.vue";
import vInput from "@/components/ui-kit/v-input.vue";
// import { useToast } from "vue-toastification";
// import { useModalStore } from "@/stores/modal";
import { api } from "~/api/api";
import { useNuxtApp } from "#app";

const props = defineProps<{
  data?: {
    question?: string;
    btn?: string;
    btnClass?: string;
    class?: string;
  };
}>();

// const toast = useToast();
// const { $axios } = useNuxtApp();

const form = reactive({
  name: "",
  tel: "",
});

const rules = {
  form: {
    name: { required, minLength: minLength(3) },
    tel: { required },
  },
};

const v$ = useVuelidate(rules, { form });

const sendForm = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    // toast.error("Заполните обязательные поля");
    return;
  }

  try {
    await api.post("/form/v1/submit-form/", {
      name: form.name,
      tel: form.tel,
    });

    // toast.success("Форма успешно отправлена");

    setTimeout(() => {
      form.name = "";
      form.tel = "";
      v$.value.$reset();

      // Закрытие модального окна, если нужно
      //   const modalStore = useModalStore();
      //   if (modalStore.modals?.form) {
      //     modalStore.openPopup("form"); // или closePopup, если есть
      //   }
    }, 500);
  } catch (err) {
    console.error("Error:", err);
    // toast.error("Ошибка при отправке формы");
  }
};
</script>

<style lang="scss" scoped>
.actions-form {
  max-width: 32.7rem;
  text-align: center;
  margin-left: 3.9rem;

  @include bp($point_2) {
    margin-left: 0;
    max-width: 100%;
  }

  .input {
    margin-bottom: 2.1rem;
  }
}
</style>
