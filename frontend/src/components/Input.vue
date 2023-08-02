<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import RemoveIcon from '@assets/highlight_off_24px.svg'

const { value, isClearable, autofocus } = defineProps({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  isClearable: {
    type: Boolean,
    required: false
  },
  autofocus: {
    type: Boolean,
    required: false
  }
})
const inputRef = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['update:modelValue'])

function clearInput() {
  emit('update:modelValue', '')
  ;(inputRef.value as HTMLInputElement).focus()
}

function onInput(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value
  emit('update:modelValue', inputValue)
}

const withClearIcon = computed(() => {
  return isClearable && value !== ''
})

onMounted(() => {
  if (autofocus) {
    ;(inputRef.value as HTMLInputElement).focus()
  }
})
</script>

<template>
  <div class="custom-input">
    <span class="input-prefix" aria-hidden="true">
      <slot name="prefix"></slot>
    </span>
    <label :class="['label', { 'label-visible': !!value }]" :for="name">
      {{ label }}
    </label>
    <input
      :id="name"
      v-bind="$attrs"
      :class="['input-field', { clearable: withClearIcon, filled: !!value }]"
      :value="value"
      @input="onInput"
      ref="inputRef"
      :placeholder="label"
    />
    <span v-if="isClearable" class="input-postfix" @click="clearInput">
      <RemoveIcon />
    </span>
  </div>
</template>

<style scoped lang="scss">
.custom-input {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.input-prefix {
  width: 55px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 0;
}

.label {
  visibility: hidden;
  position: absolute;
  left: 56px;
  top: 11px;
  font-size: 13px;
}

.label.label-visible {
  visibility: visible;
}

.input-postfix {
  width: 40px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  z-index: 1;
  margin: 0px 8px;
}

.input-field {
  position: relative;
  z-index: 1;
  border: 1px solid $select-border-color;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 0px 55px 0px 55px;
  outline: none;
  background: transparent;
  font-size: $font-size-primary;
}

.input-field.filled {
  padding: 30px 55px 14px 55px;
}

.input-field:focus {
  border: 1px solid $brand-color;
}
</style>
