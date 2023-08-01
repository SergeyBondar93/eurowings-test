<script setup lang="ts"></script>

<template>
  <button class="button"><slot></slot></button>
</template>

<style scoped>
.button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--font-color-opposite);
  font-size: var(--font-size-primary);
  font-weight: 700;
  background: var(--brand-color);
  border-radius: var(--border-radius-main);
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
