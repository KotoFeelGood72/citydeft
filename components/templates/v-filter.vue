<template>
  <div class="filter">
    <div class="container">
      <div class="filter__main">
        <div class="filter-top">
          <div class="filter-col" v-if="categories.length">
            <v-select
              :option="categories"
              label="Категория"
              id="type-estate"
              v-model="filter.category"
              :multiple="false"
              :stateSelected="true"
            />
          </div>
          <div class="filter-col" v-if="selects[7]">
            <v-select
              :option="selects[7]"
              label="Тип недвижимости"
              id="types"
              v-model="filter.types"
              :multiple="false"
            />
          </div>
          <div class="filter-col" v-if="selects[0]">
            <v-select
              :option="selects[0]"
              label="Район"
              id="type-rayon"
              v-model="filter.district"
              :multiple="true"
            />
          </div>
          <div class="filter-col price-col">
            <div class="label-input__group">Ценовой диапазон, €</div>
            <div class="input-group">
              <v-input
                type="number"
                minilabel="от"
                v-model="filter.startPrice"
                :price="true"
              />
              <v-input
                type="number"
                minilabel="до"
                v-model="filter.endPrice"
                :price="true"
              />
            </div>
          </div>
          <div class="filter-col max-w-50" v-if="selects[1]">
            <v-select
              :option="selects[1]"
              label="Планировка"
              id="plan"
              v-model="filter.plan"
              :multiple="true"
            />
          </div>
        </div>

        <div class="medium" v-if="open">
          <div class="filter-medium">
            <div class="filter-col" v-if="selects[2]">
              <v-select
                :option="selects[2]"
                label="Расстояние до моря"
                id="km"
                v-model="filter.km"
                :multiple="true"
              />
            </div>
            <div class="filter-col" v-if="selects[3]">
              <v-select
                :option="selects[3]"
                label="Площадь"
                id="place"
                v-model="filter.place"
                :multiple="true"
              />
            </div>
            <div class="filter-col" v-if="selects[5]">
              <v-select
                :option="selects[5]"
                label="Год постройки"
                id="date"
                v-model="filter.date"
                :multiple="true"
              />
            </div>
            <div class="filter-col" v-if="selects[6]">
              <v-select
                :option="selects[6]"
                label="Инфаструктура"
                id="info"
                v-model="filter.infastructure"
                :multiple="true"
              />
            </div>
          </div>
        </div>

        <ul class="filter-bottom">
          <li>
            <div class="filter-more" @click="open = !open">Расширенные параметры</div>
          </li>
          <li>
            <div class="filter-reset" @click="resetFilter">Сбросить фильтр</div>
          </li>
          <li>
            <v-btn name="Поиск" class="rounded-btn small" @click="searchEvent" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import vSelect from "@/components/ui-kit/v-select.vue";
import vInput from "@/components/ui-kit/v-input.vue";
import vBtn from "@/components/ui-kit/v-btn.vue";
import { api } from "~/api/api";

defineProps<{ isOpen?: boolean }>();

const router = useRouter();

const open = ref(false);

const categories = ref<any>([]);
const selects = ref<any>([]);

const filter = reactive({
  category: null,
  district: null,
  startPrice: null,
  endPrice: null,
  plan: null,
  id: null,
  km: null,
  place: null,
  adv: null,
  date: null,
  infastructure: null,
  page: 1,
  per_page: 6,
  types: null,
});

const resetFilter = () => {
  const url = new URL(window.location.href);
  window.history.pushState({}, "", url.pathname);
  window.location.reload();
};

const searchEvent = () => {
  const filteredParams = Object.entries(filter).reduce(
    (acc: Record<string, any>, [key, value]) => {
      if (value !== null && value !== "" && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  router.push({ path: "/estate", query: filteredParams });
};

const getCategories = async () => {
  try {
    const response: any = await api.get("/wp/v2/estate_categories/");
    console.log("Categories response:", response);

    // ЕСЛИ это объект с массивом внутри:
    categories.value = Array.isArray(response)
      ? response.map((item: any) => item.name)
      : [];
  } catch (err) {
    console.error("Ошибка при загрузке категорий:", err);
  }
};

const getAcfSelectValues = async () => {
  try {
    const response = await api.get("/city/v1/acf-select-values/");
    selects.value = response;
  } catch (error) {
    console.error("Ошибка при получении ACF select значений:", error);
  }
};

onMounted(() => {
  open.value = !!useAttrs().isOpen;
  getCategories();
  getAcfSelectValues();
});
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
  margin-bottom: 1.3rem;
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
</style>
