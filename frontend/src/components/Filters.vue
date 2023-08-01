<script setup lang="ts">
import Select from "./Select.vue";
import Button from "./Button.vue";

import PlaneTakeoffIcon from "@assets/flight_takeoff_24px.svg";
import PlaneLandIcon from "@assets/flight_land_24px.svg";
import PlaneIcon from "@assets/flight_24px.svg";
import { useDictionariesStore, Airport } from "../stores/dictionaries";
import { useFlightsStore } from "../stores/flights";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const dictionariesStore = useDictionariesStore();
const flightsStore = useFlightsStore();

const { airports } = storeToRefs(dictionariesStore);
const { destination, origin } = storeToRefs(flightsStore);

const airportToOption = (airport: Airport) => ({
  value: airport.iataCode,
  label: `${airport.city} • ${airport.iataCode}`,
  subLabel: airport.country,
});

const originsOptions = computed(() => {
  return airports.value
    .filter((airport) => {
      return airport.iataCode !== destination.value;
    })
    .map(airportToOption);
});

const destinationsOptions = computed(() => {
  return airports.value
    .filter((airport) => {
      return airport.iataCode !== origin.value;
    })
    .map(airportToOption);
});

const changeOrigin = (newOrigin: string) => {
  flightsStore.setOrigin(newOrigin);
};
const changeDestination = (newDestination: string) => {
  flightsStore.setDestination(newDestination);
};
</script>

<template>
  <div class="filter-wrapper">
    <Select
      label="Departure airport"
      name="departure"
      :options="originsOptions"
      title="National airports (A-Z)"
      :selected="origin"
      @update:modelValue="changeOrigin"
    >
      <template v-slot:input-prefix>
        <PlaneTakeoffIcon />
      </template>

      <template v-slot:option-prefix>
        <span class="option-prefix">
          <PlaneIcon />
        </span>
      </template>
    </Select>

    <Select
      label="Destination airport"
      name="destination"
      :options="destinationsOptions"
      title="National airports (A-Z)"
      :selected="destination"
      @update:modelValue="changeDestination"
    >
      <template v-slot:input-prefix>
        <PlaneLandIcon />
      </template>

      <template v-slot:option-prefix>
        <span class="option-prefix">
          <PlaneIcon />
        </span>
      </template>
    </Select>

    <Button>Lol kek</Button>
  </div>
</template>

<style scoped>
.filter-wrapper {
  width: 100%;
  padding: 24px;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 16px;
  grid-template-areas: ". . .";
}

.option-prefix {
  transform: rotate(90deg);
}
</style>
