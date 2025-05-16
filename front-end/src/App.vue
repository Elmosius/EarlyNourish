<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

const layouts = {
  MainLayout,
  DefaultLayout,
};

const route = useRoute();
const layout = computed(() => layouts[route.meta.layout] || DefaultLayout);
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
