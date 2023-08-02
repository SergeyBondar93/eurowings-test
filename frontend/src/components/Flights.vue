<script setup lang="ts">
import Offer from './Offer.vue'
import Loader from './Loader.vue'
import { useFlightsStore } from '../stores/flights'
import { storeToRefs } from 'pinia'

const flightsStore = useFlightsStore()

const { flights, isLoading, error } = storeToRefs(flightsStore)
</script>

<template>
  <div class="offers-wrapper" data-testid="offers-block">
    <div class="loader-wrapper" v-if="isLoading">
      <Loader />
    </div>
    <span class="offers-error" v-if="error">Something went wrong while loading offers</span>

    <Offer
      v-for="(flight, index) in flights"
      :key="index"
      :origin="flight.origin"
      :destination="flight.destination"
      :seatAvailability="flight.seatAvailability"
      :price="flight.price"
      :data-testid="`flight-offer-${flight.origin}-${flight.destination}-${flight.price}`"
    ></Offer>
  </div>
</template>

<style lang="scss">
.offers-error {
  color: $error-message-color;
}
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
