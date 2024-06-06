<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "../../../components/page-header.vue";
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onMounted } from 'vue'

const { success } = storeToRefs(useAuthStore())

const title = "Dashboard";
const items = [
  {
    text: "Nazox"
  },
  {
    text: "Dashboard",
    active: true
  }
];

onMounted(() => {
  if (success.value) {
    toast.success(success.value)
  }
})

setTimeout(() => {
  success.value = ''
}, 3000)
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
  </Layout>
</template>