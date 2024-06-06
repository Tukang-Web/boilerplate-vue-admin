import { createApp } from 'vue';
import App from './App.vue';
import PageHeader from "@/components/page-header.vue";
import Layout from "@/views/layouts/main.vue";
import Vue3EasyDataTable from 'vue3-easy-data-table'
import BootstrapVue from 'bootstrap-vue-next';
import VueApexCharts from 'vue3-apexcharts';
import VueSweetalert2 from 'vue-sweetalert2';
import * as VueGoogleMaps from 'vue3-google-map';
import VueYoutube from 'vue3-youtube';
import Vue3Toastify from 'vue3-toastify';
import 'vue-multiselect/dist/vue-multiselect.css'
import { Multiselect } from 'vue-multiselect';
import { createPinia } from 'pinia'
import { vMaska } from "maska";

import vco from "v-click-outside";

import router from './router';
import store from '@/state/store';
import i18n from './i18n';

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import "@/assets/scss/app.scss";
import '@/assets/css/custom.css';
import 'vue3-easy-data-table/dist/style.css'
import 'sweetalert2/src/sweetalert2.scss';



const app = createApp(App);
app.config.productionTip = false;
app.use(VueYoutube);
app.use(BootstrapVue);
app.use(vco);
app.use(VueSweetalert2);
app.use(VueGoogleMaps);
app.use(VueApexCharts);
app.use(router);
app.use(Vue3EasyDataTable);
app.use(store);
app.use(i18n);
app.use(createPinia());
app.use(Vue3Toastify, {
  autoClose: 3000,
});
app.directive("maska", vMaska);
app.component('EasyDataTable', Vue3EasyDataTable)
app.component('Multiselect', Multiselect)
app.component('PageHeader', PageHeader)
app.component('Layout', Layout)
app.mount("#app");
