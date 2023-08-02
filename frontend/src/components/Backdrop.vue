<script setup lang="ts">
defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:isShow'])
const closeBackdrop = () => emit('update:isShow', false)
</script>

<template>
  <div v-if="isShow" class="backdrop" @click="closeBackdrop"></div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(33, 37, 41, 0.25);
  backdrop-filter: blur(4px);
  z-index: 1;
}
</style>
