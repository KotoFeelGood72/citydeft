<template>
  <div class="short">
    <div class="price">
      <span>Стоимость:</span>
      <p>{{ formattedPrice }}</p>
    </div>
    <div class="add-favorite" @click="addToFavorites()">
      <div class="icon-heart" :style="{ color: isFavorites ? '#FE753F' : '' }">
        <icons icon="mdi:heart" />
      </div>
      <p>{{ isFavorites ? "Удалить из избранного" : "Добавить в избранное" }}</p>
    </div>
    <div class="group-btn">
      <v-btn
        :name="!isStatus ? 'Оставить заявку' : 'Продано'"
        @click.native="!isStatus ? open('form') : ''"
        :class="{ disabled: isStatus }"
        :disabled="isStatus"
      />
      <v-btn
        name="Подобрать другой вариант"
        class="border owner"
        @click.native="open('form')"
      />
    </div>
    <div class="card-info">
      <ul>
        <li v-for="(item, i) in info.acf.short" :key="'info-list-' + i">
          <div class="info_item__icon">
            <icons :icon="item.icon.value" />
          </div>
          <span class="short-label">{{ item.icon.label }}: </span>
          <div v-if="item.value">
            <template v-if="Array.isArray(item.value)">
              <p v-for="(value, key) in item.value" :key="key">{{ value }}</p>
            </template>
            <template v-else>
              <p>{{ item.value }}</p>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import icons from "@/components/icons/icons.vue";
import vBtn from "../ui-kit/v-btn";
// import { mapGetters } from "vuex";

export default {
  components: {
    vBtn,
    icons,
  },
  props: ["info"],
  data() {
    return {
      isFavorites: false,
    };
  },
  computed: {
    // ...mapGetters(['getFavorites']), // Убедитесь, что getFavorites возвращает массив
    formattedPrice() {
      return Number(this.info.acf.price).toLocaleString("de-DE");
    },
    isStatus() {
      if (this.info.acf || Array.isArray(this.info.acf.status)) {
        return this.info.acf.status.some((s) => s.label === "Продано");
      }
      return false;
    },
  },
  methods: {
    open(modal) {
      this.$store.commit("openPopup", modal);
    },
    checkFavorite() {
      // Проверяем, находится ли товар в списке избранных
      const isFavorite = this.getFavorites.some((p) => p.id === this.info.id);
      this.isFavorites = isFavorite; // Устанавливаем начальное состояние
    },
    addToFavorites() {
      // Убедитесь, что getFavorites всегда возвращает массив
      const isFavorite = this.getFavorites.some((p) => p.id === this.info.id);

      if (isFavorite) {
        this.$store.dispatch("removeFromFavorites", this.info.id);
        this.$toast("Объект удален из избранного", { type: "error" });
        this.isFavorites = false; // Обновляем состояние
      } else {
        this.$store.dispatch("addToFavorites", this.info);
        this.$toast("Успешно добавлено в избранное", { type: "success" });
        this.isFavorites = true; // Обновляем состояние
      }
    },
  },
  mounted() {
    this.checkFavorite();
  },
};
</script>

<style lang="scss" scoped>
.short {
}

.price {
  text-align: center;
  margin-bottom: 2.1rem;
  span {
    font-size: 2rem;
    font-weight: 400;
    display: block;
  }

  p {
    font-size: 3.6rem;
    font-family: $font_2;
    font-weight: 700;
    color: $orange;
    &:after {
      content: " €";
    }
  }
}

.add-favorite {
  @include flex-center;
  cursor: pointer;
  margin-bottom: 3rem;
  .icon-heart {
    @include flex-center;
    color: $gray;
    width: 2.3rem;
    height: 2.1rem;
    margin-right: 0.9rem;
  }

  p {
    font-size: 2rem;
    color: $dark-light;
    font-family: $font_2;
  }
}

.group-btn {
  margin-bottom: 1.8rem;
  .button {
    width: 100%;
    &:first-child {
      margin-bottom: 1.4rem;
    }
  }
}

.card-info {
  background-color: $gray;
  padding: 2rem 3rem;
  border-radius: 1rem;

  ul {
    li {
      @include flex-start;
      font-family: $font_2;
      font-weight: 400;

      &:not(:last-child) {
        margin-bottom: 2.2rem;
      }

      .info_item__icon {
        width: 2.4rem;
        @include flex-center;
        margin-right: 1.5rem;
        color: $dark-light;
      }
    }
  }
}

.short-label {
  margin-right: 0.5rem;
}

.owner {
  padding: 1.1rem 2.5rem;
}

.disabled {
  // pointer-events: none;
  cursor: not-allowed;
}
</style>
