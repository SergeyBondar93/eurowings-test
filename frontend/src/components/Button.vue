<script setup lang="ts"></script>

<template>
  <button class="button"><slot></slot></button>
</template>

<style scoped lang="scss">
.button {
  height: 100%;
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
}
</style>
