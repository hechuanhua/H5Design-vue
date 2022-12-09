<template>
  <GridLayout v-model:layoutData="layoutData"></GridLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import GridLayout from "@/components/bak/GridLayout.vue";

const layoutData = ref<any>([]);
</script>
