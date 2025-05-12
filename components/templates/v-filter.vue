<template>
  <div class="filter">
    <div class="container">
      <div class="filter__main">
        <div class="filter-top">
          <div class="filter-col">
            <p class="filter_col__label">Категория</p>
            <Selects :options="buildCategories" v-model="filter.category" />
          </div>
          <div class="filter-col">
            <p class="filter_col__label">Тип недвижимости</p>
            <Selects :options="buildTypes" v-model="filter.types" />
          </div>
          <div class="filter-col">
            <p class="filter_col__label">Район</p>
            <Selects :options="buildDistrict" v-model="filter.district" />
          </div>
          <div class="filter-col price-col">
            <div class="label-input__group">Ценовой диапазон, €</div>
            <div class="input-group">
              <v-input
                id="price-0"
                type="number"
                minilabel="от"
                v-model="filter.startPrice"
                :price="true"
              />
              <v-input
                id="price-1"
                type="number"
                minilabel="до"
                v-model="filter.endPrice"
                :price="true"
              />
            </div>
          </div>
          <div class="filter-col">
            <p class="filter_col__label">Планировка</p>
            <Selects :options="buildPlan" v-model="filter.plan" />
          </div>
        </div>

        <div class="medium" v-if="open">
          <div class="filter-medium">
            <div class="filter-col">
              <p class="filter_col__label">Расстояние до моря</p>
              <Selects :options="buildDistance" v-model="filter.km" />
            </div>
            <div class="filter-col">
              <p class="filter_col__label">Площадь</p>
              <Selects :options="buildArea" v-model="filter.place" />
            </div>
            <div class="filter-col">
              <p class="filter_col__label">Год постройки</p>
              <Selects :options="yearsOptions" v-model="filter.date" />
            </div>
            <div class="filter-col">
              <p class="filter_col__label">Инфраструктура</p>
              <Selects :options="buildInfrastructure" v-model="filter.infrastructure" />
            </div>
          </div>
        </div>

        <ul class="filter-bottom">
          <li>
            <div class="filter-more" @click="open = !open">Расширенные параметры</div>
          </li>
          <li><div class="filter-reset" @click="resetFilter">Сбросить фильтр</div></li>
          <li><v-btn name="Поиск" class="rounded-btn small" @click="searchEvent" /></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import vInput from "@/components/ui-kit/v-input.vue";
import vBtn from "@/components/ui-kit/v-btn.vue";
import Selects from "@/components/ui-kit/Selects.vue";

const router = useRouter();
const route = useRoute();
const { tm } = useI18n();

const open = ref(false);

// реактивный объект фильтра
const filter = reactive({
  category: null,
  types: null,
  district: null,
  startPrice: null,
  endPrice: null,
  plan: null,
  km: null,
  place: null,
  date: null,
  infrastructure: null,
  page: 1,
  per_page: 6,
});

// подтягиваем параметры из query, если есть
onMounted(() => {
  open.value = !!useAttrs().isOpen;
  Object.entries(route.query).forEach(([key, val]) => {
    if (key in filter) {
      (filter as any)[key] = val;
    }
  });
});

// генератор годов с 1975 по текущий
const currentYear = new Date().getFullYear();
const yearsOptions = computed(() => {
  const start = 1975;
  return Array.from({ length: currentYear - start + 1 }, (_, i) => {
    const y = String(start + i);
    return { id: y, name: y };
  });
});

// переводимые массивы опций
const buildCategories = computed(() => tm("buildCategories"));
const buildTypes = computed(() => tm("buildTypes"));
const buildDistrict = computed(() => tm("buildDistrict"));
const buildPlan = computed(() => tm("buildPlan"));
const buildDistance = computed(() => tm("buildDistance"));
const buildArea = computed(() => tm("buildArea"));
const buildInfrastructure = computed(() => tm("buildInfrastructure"));

// Сбрасываем URL и перезагружаем
const resetFilter = () => {
  window.history.pushState({}, "", location.pathname);
  window.location.reload();
};

const searchEvent = () => {
  // 1. Явно типизируем entries
  const entries = Object.entries(filter) as [string, string | number | null][];

  // 2. Делаем reduce с корректными типами
  const params = entries.reduce<Record<string, string | number>>((acc, [k, v]) => {
    // 2.1. Отбрасываем null и undefined
    if (v == null) return acc;

    // 2.2. Если строка — отбрасываем пустые
    if (typeof v === "string" && v.trim() === "") {
      return acc;
    }

    // 2.3. Всё остальное (числа и непустые строки) сохраняем
    acc[k] = v;
    return acc;
  }, {});

  router.push({ path: "/estate", query: params });
};
</script>

<style lang="scss" scoped>
.filter__main {
  background-color: $gray;
  padding: 2.7rem 3rem;
  border-radius: 1.5rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 11;
  @include bp($point_4) {
    padding: 2.5rem;
  }
}

.filter-top,
.filter-medium {
  @include flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: -2rem -2rem 2rem 0;
  @include bp($point_4) {
    margin: -2rem -2rem 0 0;
  }
  & > div {
    padding: 2rem 2rem 0 0;
    flex-grow: 1;
    @include bp($point_4) {
      padding: 2rem 2rem 0 0;
    }
  }
}

.medium {
  margin: 3.2rem 0 2rem 0;
}

.label-input__group {
  font-size: 1.4rem;
  font-weight: 400;
  font-family: $font_2;
  margin-bottom: 1rem;
  text-align: center;
  @include bp($point_4) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
}

.input-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 1.3rem;
}

.filter-bottom {
  @include flex-end;
  flex-wrap: wrap;
  margin: -4rem -4rem 0 0;
  font-family: $font_2;
  font-weight: 400;
  font-size: 1.4rem;
  @include bp($point_4) {
    margin: -2rem -2rem 0 0;
    padding-top: 2rem;
    justify-content: space-between;
  }
  & > li {
    padding: 4rem 4rem 0 0;
    @include bp($point_4) {
      padding: 2rem 2rem 0 0;
    }
  }
}

.filter-more {
  color: $white;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 0.1rem solid $white;
  &:hover {
    border-bottom: 0.1rem solid $dark;
    color: $dark;
  }
}

.filter-reset {
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    color: $dark-light;
  }
}

.max-w-small {
  max-width: 11.9rem;
}

.max-w-50 {
  :deep(.multiselect) {
    @include bp($point_4) {
      min-width: 100%;
    }
  }
  @include bp($point_4) {
    max-width: 50%;
  }
}

.filter-medium {
  @include bp($point_4) {
    justify-content: space-between;
  }
  .filter-col {
    @include bp($point_4) {
      max-width: 50%;
    }
  }
}

.filter-top {
  .filter-col {
    @include bp($point_4) {
      max-width: 100%;
      width: 100%;
    }
    &:nth-child(2) {
      @include bp($point_4) {
        max-width: 50%;
      }
    }
    &:nth-child(3) {
      @include bp($point_4) {
        max-width: 50%;
      }
    }
  }
}

.filter_col__label {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}
</style>
