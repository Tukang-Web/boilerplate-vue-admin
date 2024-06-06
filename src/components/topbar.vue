<script setup>
import { ref } from "vue";
import simplebar from "simplebar-vue";
import i18n from "../i18n";
import idFlag from "@/assets/images/flags/indonesia.png";
import enFlag from "@/assets/images/flags/us.jpg";
import { useAuthStore } from '@/stores/auth';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { user, logout, checkAuth } = useAuthStore();

if (!user) {
  checkAuth();
}

const languages = ref([
  {
    flag: idFlag,
    title: "Indonesia",
    language: "id",
  },
  {
    flag: enFlag,
    title: "English",
    language: "en",
  },
]);

const current_language = ref("id");
const flag = ref(idFlag);
const title = ref("Indonesia");

function toggleMenu() {
  document.body.classList.toggle("sidebar-enable");
  if (document.body.classList.contains("sidebar-enable")) {
    document.body.classList.remove("vertical-collpsed");
  } else {
    document.body.classList.add("vertical-collpsed");
  }
}

function initFullScreen() {
  document.body.classList.toggle("fullscreen-enable");
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement
  ) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

function toggleRightSidebar() {
  document.body.classList.toggle("right-bar-enabled");
}

function setLanguage(locale, country, flagImage) {
  i18n.global.locale.value = locale;
  current_language.value = locale;
  flag.value = flagImage;
  title.value = country;
}

function handleLogout() {
  Swal.fire({
    title: t('alert.logout.title'),
    text: t('alert.logout.text'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: t('alert.logout.confirm'),
    cancelButtonText: t('alert.logout.cancel'),
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
    }
  });
}
</script>



<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-tw.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-tw.png" alt height="20" />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo-tw.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-tw.png" alt height="20" />
            </span>
          </router-link>
        </div>

        <button @click="toggleMenu" type="button" class="btn btn-sm px-3 font-size-24 header-item waves-effect"
          id="vertical-menu-btn">
          <i class="ri-menu-2-line align-middle"></i>
        </button>

        <!-- App Search-->
        <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input type="text" class="form-control" :placeholder="$t('navbar.search.text')" />
            <span class="ri-search-line"></span>
          </div>
        </form>
      </div>

      <div class="d-flex">
        <div class="dropdown d-inline-block d-lg-none ms-2">
          <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="ri-search-line"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
            aria-labelledby="page-header-search-dropdown">
            <form class="p-3">
              <div class="form-group m-0">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search ..." />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="submit">
                      <i class="ri-search-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <BDropdown variant="white" right toggle-class="header-item">
          <template #button-content> <img class :src="flag" alt="Header Language" height="16" /> </template>
          <BDropdownItem class="notify-item" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
            @click="setLanguage(entry.language, entry.title, entry.flag)"
            :link-class="{ active: entry.language === current_language }">
            <img :src="entry.flag" alt="Header Language" height="16" class="me-1" />
            <span class="align-middle">{{ entry.title }}</span>
          </BDropdownItem>
        </BDropdown>

        <div class="dropdown d-none d-lg-inline-block ms-1">
          <button type="button" class="btn header-item noti-icon waves-effect" @click="initFullScreen">
            <i class="ri-fullscreen-line"></i>
          </button>
        </div>

        <BDropdown variant="white" right toggle-class="header-item" menu-class="dropdown-menu-end"
          class="d-inline-block user-dropdown">
          <template #button-content>
            <img class="rounded-circle header-profile-user" src="@/assets/images/users/avatar-2.jpg"
              alt="Header Avatar" />
            <span class="d-none d-xl-inline-block ms-1">
              {{ user?.name ?? user?.email }}
            </span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <BDropdownItem href="#">
            <i class="ri-user-line align-middle me-1"></i>
            {{ $t("navbar.dropdown.account.list.profile") }}
          </BDropdownItem>
          <BDropdownItem class="d-block" href="#">
            <span class="badge badge-success float-end mt-1">11</span>
            <i class="ri-settings-2-line align-middle me-1"></i>
            {{ $t("navbar.dropdown.account.list.settings") }}
          </BDropdownItem>
          <BDropdownDivider />
          <BDropdownItem class="text-danger" @click="handleLogout">
            <i class="ri-shut-down-line align-middle me-1 text-danger"></i>
            {{ $t("navbar.dropdown.account.list.logout") }}
          </BDropdownItem>
        </BDropdown>

        <div class="dropdown d-inline-block">
          <button type="button" class="btn header-item noti-icon right-bar-toggle waves-effect toggle-right"
            @click="toggleRightSidebar">
            <i class="ri-settings-2-line toggle-right"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.notify-item {
  .active {
    color: #16181b;
    background-color: #f8f9fa;
  }
}
</style>