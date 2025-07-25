<template>
  <div class="filter">
    <div class="container">
      <div class="filter__main">
        <div class="filter-top">
          <div class="filter-col">
            <p class="filter_col__label">Категория</p>
            <Selects
              :options="buildCategories"
              v-model="filter.category"
              :selectFirst="true"
            />
          </div>
          <div class="filter-col">
            <p class="filter_col__label">Тип недвижимости</p>
            <Selects 
              :options="buildTypes" 
              :modelValue="filter.types"
              @update:modelValue="handleTypeChange"
              :selectFirst="true" 
            />
          </div>
          <div class="filter-col">
            <p class="filter_col__label">Район</p>
            <Selects
              :options="buildDistrict"
              :modelValue="filter.district"
              @update:modelValue="handleDistrictChange"
              :selectFirst="true"
            />
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
            <Selects :options="buildPlan" v-model="filter.plan" :selectFirst="false" />
          </div>
        </div>

        <div class="medium" v-if="open">
          <div class="filter-medium">
            <div class="filter-col">
              <p class="filter_col__label">Расстояние до моря</p>
              <Selects
                :options="buildDistance"
                v-model="filter.km"
                :selectFirst="false"
              />
            </div>
            <div class="filter-col">
              <p class="filter_col__label">Площадь</p>
              <Selects :options="buildArea" v-model="filter.place" :selectFirst="false" />
            </div>
            <div class="filter-col">
              <p class="filter_col__label">Год постройки</p>
              <Selects
                :options="yearsOptions"
                v-model="filter.date"
                :selectFirst="false"
              />
            </div>
            <div class="filter-col">
              <p class="filter_col__label">Инфраструктура</p>
              <Selects
                :options="buildInfrastructure"
                v-model="filter.infrastructure"
                :selectFirst="false"
              />
            </div>
          </div>
        </div>

        <ul class="filter-bottom">
          <li>
            <div class="filter-more" @click="open = !open">Расширенные параметры</div>
          </li>
          <li><div class="filter-reset" @click="resetFilter">Сбросить фильтр</div></li>
          <li>
            <v-btn
              name="Поиск"
              class="rounded-btn small"
              @click="searchEvent"
              :loading="isLoading"
            />
          </li>
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

defineProps<{
  isLoading?: boolean;
}>();

const open = ref(false);

// реактивный объект фильтра
const filter = ref<{
  category: number | null;
  types: string | null;
  district: string | null;
  startPrice: number | null;
  endPrice: number | null;
  plan: string | null;
  km: string | null;
  place: string | null;
  date: string | null;
  infrastructure: string | null;
  page: number;
  per_page: number;
}>({
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

// Обработчики для select компонентов
const handleTypeChange = (value: any) => {
  filter.value.types = value?.id || value || null;
};

const handleDistrictChange = (value: any) => {
  filter.value.district = value?.id || value || null;
};

// подтягиваем параметры из query, если есть
onMounted(() => {
  open.value = !!useAttrs().isOpen;
  Object.entries(route.query).forEach(([key, val]) => {
    if (key in filter.value) {
      if (key === 'category') {
        filter.value[key] = val ? Number(val) : null;
      } else if (key === 'startPrice' || key === 'endPrice' || key === 'page' || key === 'per_page') {
        filter.value[key] = val ? Number(val) : null;
      } else if (key === 'types' || key === 'district') {
        // Для types и district используем строковое значение
        filter.value[key] = val?.toString() || null;
      } else {
        filter.value[key] = val?.toString() || null;
      }
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
  const params = Object.entries(filter.value).reduce<Record<string, string | number>>((acc, [key, value]) => {
    // Пропускаем null, undefined и пустые строки
    if (value == null || (typeof value === 'string' && value.trim() === '')) {
      return acc;
    }

    // Преобразуем значение в зависимости от типа поля
    if (['category', 'startPrice', 'endPrice', 'page', 'per_page'].includes(key)) {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        acc[key] = numValue;
      }
    } else if (key === 'types' || key === 'district') {
      // Для types и district берем только строковое значение
      acc[key] = typeof value === 'object' && value !== null ? value.id : value.toString();
    } else {
      acc[key] = value.toString();
    }

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
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @include bp($point_4) {
    padding: 1.5rem;
    border-radius: 0.8rem;
  }
}

.filter-top,
.filter-medium {
  @include flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 2rem;
  @include bp($point_2) {
    gap: 1rem;
  }
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
    text-align: left;
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
  gap: 2rem;
  font-family: $font_2;
  font-weight: 400;
  font-size: 1.4rem;
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
  // .filter-col {
  //   @include bp($point_4) {
  //     max-width: 50%;
  //   }
  // }
}

.filter-top {
  // .filter-col {
  //   @include bp($point_4) {
  //     max-width: 100%;
  //     width: 100%;
  //   }
  //   &:nth-child(2) {
  //     @include bp($point_4) {
  //       max-width: 50%;
  //     }
  //   }
  //   &:nth-child(3) {
  //     @include bp($point_4) {
  //       max-width: 50%;
  //     }
  //   }
  // }
}

.filter_col__label {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.filter-col {
  flex-grow: 1;
}
</style>

