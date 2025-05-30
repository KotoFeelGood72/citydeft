<template>
  <div class="team">
    <div class="container">
      <sectionTitle title="Наша команда" class="big" />
      <div class="team__main">
        <div class="team_main__img">
          <nuxt-img v-if="img?.source_url" :src="img.source_url" />
        </div>
        <ul v-if="page?.acf?.team" class="team-list">
          <li v-for="(item, i) in page.acf.team" :key="'team-item-' + i">
            <hero :img="item.img" :content="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { usePageContent } from "~/composables/usePageContent";

import hero from "@/components/templates/hero.vue";
import sectionTitle from "@/components/ui-kit/section-title.vue";
import { api } from "~/api/api";

// Данные страницы
const { data: page, load } = usePageContent("team", "pages");
const img = ref<any>(null);

// Загрузка картинки
const getPostImg = async (mediaId: number) => {
  if (!mediaId) return;

  try {
    const res = await api.get(`/wp/v2/media/${mediaId}`);
    img.value = res.data;
  } catch (err) {
    console.error("Ошибка при получении изображения:", err);
  }
};

// Инициализация
onMounted(async () => {
  await load();
  if (page.value?.featured_media) {
    await getPostImg(page.value.featured_media);
  }
});

watchEffect(() => {
  useSeoMeta(840);
});
</script>

<style scoped lang="scss">
.team {
  padding: 6rem 0;
  @include bp($point_2) {
    padding: 3rem 0;
  }

  .big {
    margin-bottom: 4rem;
    text-align: center;
  }
}

.team_main__img {
  margin-bottom: 7rem;
  @include bp($point_4) {
    margin-bottom: 4rem;
  }

  img {
    width: 100%;
  }
}

.team-list {
  li {
    @include bp($point_4) {
      position: relative;
    }

    :deep(.templateHero__content::before) {
      width: 103%;
      left: -0.3rem;
    }

    :deep(.templateHero__main) {
      @include bp($point_4) {
        padding: 2rem;
      }
    }

    :deep(.templateHero__main img) {
      margin-left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    :deep(.template-hero) {
      border: none;
    }

    &:nth-child(2n + 2) {
      :deep(.templateHero__content) {
        order: 1;
      }
    }
  }
}
</style>
