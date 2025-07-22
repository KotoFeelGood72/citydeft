<template>
  <div class="contacts" v-if="options">
    <div class="container">
      <section-title :title="$t('ui.contactsTitle')" class="big center" />
      <div class="contacts_main">
        <div class="contacts__info">
          <ul>
            <li>
              <span>{{ $t("ui.itsWork") }}:</span>
              <p>
                {{ $t("ui.itsWork") }} —<br />
                {{ $t("ui.dayStartTime") }}<br />
                {{ $t("ui.dayEndTime") }}<br />
                {{ $t("ui.dayEnd") }}
              </p>
            </li>
            <li>
              <span>{{ $t("ui.phone") }}:</span>
              <a :href="`tel:+905077060007`">+90 507 706 00 07</a>
              <p>{{ $t("ui.online") }} 24/7</p>
            </li>
            <li>
              <span>{{ $t("ui.email") }}:</span>
              <a :href="`mailto:info@citydeft.com`">info@citydeft.com</a>
            </li>
            <li>
              <span>{{ $t("ui.office") }}:</span>
              <p>Saray Mah. Oral Cad. 25/B Öztürk 2 Apt. Alanya / Antalya</p>
            </li>
            <li>
              <span>{{ $t("ui.socialName") }}:</span>
              <ul class="contacts-social">
                <li
                  v-for="(item, i) in options.contacts.social"
                  :key="`social-footer-${i}`"
                >
                  <a :href="item.link" target="_blank" rel="noopener">
                    <icons v-if="item.icon" :icon="item.icon" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="contacts__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3205.1453456787017!2d31.986186191973747!3d36.55060826481347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dca3954b67a575%3A0x7bf2e9fe1bf2662b!2sDeft%20Group!5e0!3m2!1sru!2sru!4v1707590843049!5m2!1sru!2sru"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import sectionTitle from "../components/ui-kit/section-title.vue";
import icons from "../components/icons/icons.vue";
import { useOptionsStoreRefs } from "~/store/useOptionsStore";
import { useRoute } from "vue-router";
import { useSeoMeta } from "@/composables/useSeoMeta";
const route = useRoute();
const { options } = useOptionsStoreRefs();

watch(
  () => route,
  () => {
    useSeoMeta(854);
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="scss">
.contacts {
  padding: 6rem 0;
  @include bp($point_2) {
    padding: 2rem 0 4rem 0;
  }
  .big {
    margin-bottom: 6rem;
    @include bp($point_2) {
      margin-bottom: 4rem;
    }
  }
}
.contacts_main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 6rem;
}
.contacts__map {
  width: 100%;
}
.contacts__info {
  span {
    font-size: 2.2rem;
    color: $dark-light;
    font-family: $font_2;
    font-weight: 500;
    display: block;
    margin-bottom: 1rem;
  }
  p,
  a {
    font-size: 1.8rem;
    font-family: $font_2;
    display: block;
  }
  a {
    margin-bottom: 0.5rem;
  }
  & > ul > li {
    &:not(:last-child) {
      margin-bottom: 3rem;
    }
  }
}
.contacts-social {
  @include flex-start;
  flex-wrap: wrap;
  margin: -2rem -2rem 0 0;
  li {
    padding: 2rem 2rem 0 0;
    a {
      width: 4rem;
      height: 4rem;
      @include flex-center;
      background-color: #dddddd;
      border-radius: 0.5rem;
      &:hover {
        background-color: #b3b3b3;
      }
    }
  }
}
</style>
