<script setup lang="ts">
import { onBeforeMount } from "vue";
import Filters from "./components/Filters.vue";
import { useDictionariesStore } from "./stores/dictionaries";

const dictionariesStore = useDictionariesStore();

onBeforeMount(() => {
  dictionariesStore.getAirports();
});
</script>

<template>
  <Filters />
</template>
