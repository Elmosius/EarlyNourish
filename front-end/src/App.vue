<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

const layouts = {
  MainLayout,
  DefaultLayout,
  AuthLayout,
};

const route = useRoute();
const layout = computed(() => layouts[route.meta.layout] || DefaultLayout);
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
