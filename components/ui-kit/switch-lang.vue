<template>
  <div class="lang-switcher" @click="toggleDropdown" tabindex="0" @blur="closeDropdown">
    <div class="selected-lang">
      <span class="flag">{{ selectedLang?.flag }}</span>
      <span>{{ selectedLang?.name }}</span>
      <span class="arrow">▼</span>
    </div>
    <div class="dropdown" v-if="isOpen">
      <div
        v-for="lang in availableLocales"
        :key="lang.code"
        class="dropdown-item"
        :class="{ active: lang.code === selectedLang?.code }"
        @click.stop="selectLang(lang)"
      >
        <span class="flag">{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { locales, locale, setLocale } = useI18n();

const availableLocales = computed(() => {
  const raw = locales?.value;
  const flags = {
    en: "🇺🇸",
    ru: "🇷🇺",
    tr: "🇹🇷",
  };

  return Array.isArray(raw)
    ? raw.map((l) => ({ ...l, flag: flags[l.code] || "🏳️" }))
    : [];
});

const selectedLang = computed(() =>
  availableLocales.value.find((l) => l.code === locale.value)
);

const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

function selectLang(lang) {
  setLocale(lang.code);
  isOpen.value = false;
}
</script>

<style scoped lang="scss">
.lang-switcher {
  position: relative;
  width: 20rem;
  font-size: 1.4rem;
  cursor: pointer;
  user-select: none;

  .selected-lang {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 1.2rem;
    border: 0.1rem solid #ccc;
    border-radius: 6px;
    background-color: white;
  }

  .flag {
    margin-right: 8px;
    font-size: 18px;
  }

  .arrow {
    margin-left: auto;
    font-size: 1.2rem;
    opacity: 0.6;
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 0.4rem);
    left: 0;
    right: 0;
    background: white;
    border: 0.1rem solid #ccc;
    border-radius: 0.6rem;
    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
    z-index: 10;

    .dropdown-item {
      padding: 8px 12px;
      display: flex;
      align-items: center;

      &:hover {
        background: #f2f2f2;
      }

      .flag {
        font-size: 1.6rem;
        margin-right: 0.8rem;
      }
    }
  }
}

.dropdown-item.active {
  background-color: #e6f0ff;
  font-weight: bold;
}

.burger-switch {
  width: 100%;
  margin-top: 2rem;
  margin-left: -2rem;
  .selected-lang {
    border: none;
    padding: 1.6rem 2rem;
    font-size: 2.4rem;
  }

  .arrow {
    font-size: 2rem;
  }
}
</style>
