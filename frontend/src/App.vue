<script setup lang="ts">
import { onBeforeMount } from 'vue'
import Filters from './components/Filters.vue'
import Flights from './components/Flights.vue'
import { useDictionariesStore } from './stores/dictionaries'

const dictionariesStore = useDictionariesStore()

onBeforeMount(() => {
  dictionariesStore.getAirports()
})
</script>

<template>
  <div data-testid="app">
    <Filters />
    <Flights />
  </div>
</template>
