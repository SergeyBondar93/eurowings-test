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
    <div class="origin-selector">
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
    </div>
    <div class="destination-selector">
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
    </div>

    <div class="search-button">
      <Button>Lol kek</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.origin-selector {
  grid-area: origin;
}
.destination-selector {
  grid-area: destination;
}
.search-button {
  grid-area: search;
}
.filter-wrapper {
  width: 100%;
  padding: 24px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr;
  row-gap: 16px;
  grid-template-areas:
    "origin"
    "destination"
    "search";
}

@media (min-width: $mobile-breakpoint) {
  .filter-wrapper {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
    column-gap: 16px;
    grid-template-areas:
      "origin destination"
      "search search";
  }
}

@media (min-width: $tablet-breakpoint) {
  .filter-wrapper {
    grid-template-columns: 2fr 2fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "origin destination search";
  }
}

.option-prefix {
  transform: rotate(90deg);
}
</style>
