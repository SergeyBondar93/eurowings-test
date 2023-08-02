<script setup lang="ts">
import Offer from "./Offer.vue";
import Loader from "./Loader.vue";
import { useFlightsStore } from "../stores/flights";
import { storeToRefs } from "pinia";

const flightsStore = useFlightsStore();

const { flights, isLoading } = storeToRefs(flightsStore);
</script>

<template>
  <div class="offers-wrapper">
    <div class="loader-wrapper" v-if="isLoading">
      <Loader />
    </div>

    <Offer
      v-for="(flight, index) in flights"
      :key="index"
      :origin="flight.origin"
      :destination="flight.destination"
      :seatAvailability="flight.seatAvailability"
      :price="flight.price"
    ></Offer>
  </div>
</template>

<style>
.offers-wrapper {
  padding: 24px;
}

.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>
