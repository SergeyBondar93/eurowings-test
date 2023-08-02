<script setup lang="ts">
import ArrowDownIcon from '@assets/keyboard_arrow_down_24px.svg'
import CommitIcon from '@assets/commit_24px.svg'
import { toRefs } from 'vue'

interface Props {
  origin: string
  destination: string
  seatAvailability: number
  price: number
}

const props = defineProps<Props>()
const { origin, destination, price } = toRefs(props)

// i think that it should be in API, but it was not :(
const timeFrom = `6:00`.padStart(5, '0')
const ampmFrom = 'PM'
const timeTo = `9:00`.padStart(5, '0')
const ampmTo = 'AM'
const duration = '3:00'.padStart(5, '0')
</script>

<template>
  <div class="offer-wrapper" tabindex="0">
    <div class="route">
      <div class="route-place">
        <span class="route-place-airport">{{ origin }}</span>
        <span class="route-place-time"
          >{{ timeFrom }}<span class="route-place-time-ampm">{{ ampmFrom }}</span></span
        >
      </div>
      <CommitIcon class="commit-icon"></CommitIcon>
      <div class="route-place">
        <span class="route-place-airport">{{ destination }}</span>
        <span class="route-place-time"
          >{{ timeTo }}<span class="route-place-time-ampm">{{ ampmTo }}</span></span
        >
      </div>
    </div>

    <div class="time-stops">
      <div class="time">
        <span class="time-label">Travel time</span>
        <time class="time-text">{{ duration }}h </time>
      </div>

      <div class="divider"></div>

      <div class="stops">
        <div class="stops-label">Flight connection</div>
        <div class="stops-text">Nonstop</div>
      </div>
    </div>
    <div class="price">
      <div class="price-label">Flight from:</div>

      <div class="price-text">€{{ price }}</div>
    </div>

    <button class="open-button">
      <ArrowDownIcon />
    </button>
  </div>
</template>

<style lang="scss">
.offer-wrapper {
  border-radius: $border-radius-main;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  margin-bottom: 10px;
  transition: 0.3s;
}

.commit-icon {
  height: 21px;
}

.route {
  display: flex;
  justify-content: space-between;
  gap: 4px;
  width: 148px;
  align-items: flex-end;
}
.route-place {
  display: flex;
  flex-direction: column;
  gap: 0px;
}
.route-place-airport {
  font-size: $font-size-thirdly;
}
.route-place-time {
  font-size: $font-size-time-small;
  font-weight: 700;
}

.route-place-time-ampm {
  font-size: $font-size-thirdly;
  font-weight: 400;
}

.divider {
  width: 4px;
  height: 4px;
  background-color: $font-color-primary;
  margin-bottom: 2px;
}

.time-stops {
  order: 1;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-top: 26px;
}

.time {
  display: flex;
  flex-direction: row;
  margin-left: 0px;
  gap: 0px;
  order: 0;
}
.time-label {
  display: none;
}
.time-text {
  font-weight: 400;
  font-size: $font-size-thirdly;
}
.stops {
  flex-grow: 1;
  order: 2;
  font-size: $font-size-thirdly;
}
.stops-label {
  display: none;
}

.stops-text {
  font-weight: 400;
}

.price {
  min-width: 130px;
}
.price-label {
  text-align: right;
  font-size: $font-size-thirdly;
  margin-bottom: 5px;
}
.price-text {
  text-align: right;
  font-size: $font-size-price-small;
  font-weight: 600;
}

.open-button {
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  transform: scale(2.4);
  margin-right: 14px;
  display: none;
}
.open-button:focus,
.offer-wrapper:focus {
  outline: $focus-outline;
}
.offer-wrapper:focus {
  transform: scale(0.99);
}

@media (min-width: $tablet-breakpoint) {
  .offer-wrapper {
    padding: 21px;
    flex-wrap: nowrap;
  }

  .time-stops {
    order: 0;
    margin-top: 0px;
  }

  .route {
    gap: 12px;
    width: 168px;
  }

  .route-place {
    gap: 6px;
  }

  .route-place-time-ampm {
    font-size: $font-size-secondary;
  }

  .time {
    flex-direction: column;
    margin-left: 32px;
    gap: 6px;
  }

  .time-text {
    font-weight: 400;
  }

  .stops {
    order: 0;
  }

  .price-label {
    font-size: $font-size-primary;
  }

  .price-text {
    font-size: $font-size-price-medium;
  }

  .open-button {
    transform: scale(1.4);
    display: initial;
    margin-left: 38px;
  }
}

@media (min-width: $desktop-breakpoint) {
  .divider {
    display: none;
  }

  .time {
    width: 122px;
    margin-left: 115px;
  }
  .time-label {
    display: initial;
  }
  .time-text {
    font-weight: 700;
    font-size: $font-size-primary;
  }
  .stops {
    margin-top: 4px;
    font-size: $font-size-primary;
  }
  .stops-label {
    display: initial;
  }
  .stops-text {
    margin-top: 6px;
    font-weight: 700;
  }
  .price-text {
    font-size: $font-size-price-big;
  }

  .open-button {
    transform: scale(2.4);
  }
}
</style>
