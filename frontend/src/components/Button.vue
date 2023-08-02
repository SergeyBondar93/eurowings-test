<script setup lang="ts"></script>

<template>
  <button class="button"><slot></slot></button>
</template>

<style scoped lang="scss">
.button {
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $font-color-opposite;
  font-size: $font-size-primary;
  font-weight: 700;
  background: $brand-color;
  border-radius: $border-radius-main;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
}

.button:active {
  transform: scale(0.95);
}
.button[disabled] {
  cursor: not-allowed;
  opacity: 0.7;
  transform: scale(1);
}
.button:focus {
  outline: $focus-outline;
  transform: scale(0.95);
}
</style>
