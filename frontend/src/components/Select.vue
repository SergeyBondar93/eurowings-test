<script setup lang="ts">
import Backdrop from './Backdrop.vue'
import Input from './Input.vue'
import Loader from './Loader.vue'
import RemoveIcon from '@assets/highlight_off_24px.svg'
import { computed, onUpdated, ref } from 'vue'

export type SelectorExpose = { buttonRef: HTMLButtonElement }

type Option = {
  label: string
  value: string
  subLabel?: string
}

interface Props {
  name: string
  label: string
  options: Option[]
  title: string
  selected: string | null
  disabled?: boolean
  isLoading?: boolean
}

const listWrapperRef = ref<HTMLDivElement | null>(null)

const props = defineProps<Props>()
const { label, name, title } = props

const options = computed(() => props.options)
const selected = computed(() => props.selected)
const disabled = computed(() => props.disabled)
const isLoading = computed(() => props.isLoading)
const buttonRef = ref<HTMLButtonElement | null>(null)

defineExpose({
  buttonRef,
})

const inputValue = ref('')

const selectedOption = computed(() => {
  return options.value.find((option) => option.value === selected.value)
})

const normalizeString = (s?: string) => s?.toLocaleLowerCase().trim() || ''

const filteredOptions = computed(() => {
  return options.value.filter((option) => {
    return [
      normalizeString(option.label),
      normalizeString(option.subLabel),
      normalizeString(option.value),
    ].some((text) => {
      return text?.includes(inputValue.value.trim().toLocaleLowerCase())
    })
  })
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const changeIsOpen = () => {
  isOpen.value = !isOpen.value
}

function clearValue() {
  inputValue.value = ''
  selectOption(null)
}

const selectedIndex = ref(-1)

function onFocus() {
  console.log('!FOCUS', label)
}

function onBlur() {
  console.log('!BLUR', label)
  selectedIndex.value = -1
}

function onKeyDown(event: any) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      navigateOptions(1)
      scrollIntoView()
      break
    case 'ArrowUp':
      event.preventDefault()
      navigateOptions(-1)
      scrollIntoView()
      break
    case 'Enter':
      if (isOpen.value && selectedIndex.value !== -1) {
        selectOption(filteredOptions.value[selectedIndex.value].value)
      } else {
        isOpen.value = !isOpen.value
      }
      break
    case 'Tab':
    case 'Escape':
      isOpen.value = false
      selectedIndex.value = -1
      break
    default:
      break
  }
}

onUpdated(() => {
  if (isOpen.value) {
    document.addEventListener('keydown', onKeyDown)
  } else {
    document.removeEventListener('keydown', onKeyDown)
  }
})

function navigateOptions(direction: number) {
  let newIndex = selectedIndex.value + direction
  newIndex = Math.max(Math.min(newIndex, filteredOptions.value.length - 1), 0)
  selectedIndex.value = newIndex
}

function scrollIntoView() {
  const activeElement = listWrapperRef.value!.children[selectedIndex.value]
  activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

function selectOption(newValue: string | null) {
  isOpen.value = false
  emit('update:modelValue', newValue)
}
</script>

<template>
  <Backdrop :isShow="isOpen" @update:isShow="isOpen = $event" />

  <div :class="['select-wrapper', { 'select-wrapper-disabled': disabled }]">
    <button
      :class="['select-button', { 'select-button-disabled': disabled }]"
      @click="changeIsOpen"
      @focus="onFocus"
      @blur="onBlur"
      :disabled="disabled"
      ref="buttonRef"
      :data-testid="`selector-${name}`"
    >
      <span class="prefix-icon-wrapper">
        <slot name="input-prefix"></slot>
      </span>

      <div class="text-wrapper">
        <span :class="['label', { filled: !!selectedOption }]">{{ label }}</span>
        <span class="value">{{ selectedOption?.label }}</span>
      </div>

      <button
        :class="['clear-icon-wrapper', { 'clear-icon-wrapper-disabled': disabled }]"
        @click="clearValue"
        tabindex="0"
        :disabled="disabled"
        v-if="!isLoading"
      >
        <RemoveIcon />
      </button>
      <div class="loader-wrapper" v-else><Loader /></div>
    </button>
    <div
      v-if="isOpen"
      class="select-content-wrapper"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      aria-modal="true"
    >
      <div class="input-wrapper">
        <Input
          :name="name"
          :isClearable="true"
          :value="selectedOption?.label || inputValue"
          :autofocus="isOpen"
          :label="label"
          @update:model-value="inputValue = $event"
        >
          <template #prefix>
            <slot name="input-prefix"></slot>
          </template>
        </Input>
      </div>

      <div class="list-wrapper">
        <div class="list-title">{{ title }}</div>

        <ul ref="listWrapperRef">
          <li
            v-for="(item, index) in filteredOptions"
            :key="item.value"
            @click="selectOption(item.value)"
            :aria-selected="index === selectedIndex"
          >
            <div :class="['list-item', { 'selected-item': index === selectedIndex }]">
              <span class="prefix-wrapper">
                <slot name="option-prefix"></slot>
              </span>

              <div class="option-text-wrapper">
                <span class="option-label">
                  {{ item.label }}
                </span>

                <span class="option-sublabel" v-if="item.subLabel">
                  {{ item.subLabel }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader-wrapper {
  transform: scale(0.5);
  position: absolute;
  right: -10px;
}
.select-wrapper {
  position: relative;
}

.select-wrapper.select-wrapper-disabled {
  opacity: 0.7;
}

.select-button.select-button-disabled,
.clear-icon-wrapper.clear-icon-wrapper-disabled {
  cursor: not-allowed;
}

.select-button {
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid $select-border-color;
  border-radius: $border-radius-main;
  height: 55px;
  padding: 0px 56px 0px 8px;
  cursor: pointer;
  position: relative;
  background: transparent;
  text-align: start;
}

.select-button:focus {
  outline: $focus-outline;
}

.select-content-wrapper:active {
  transform: scale(1);
}

.list-wrapper {
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.list {
  list-style-type: none;
}

.list-title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.4px;
  padding: 6px 15px;
  display: block;
  background: $background-color-thirdly;
}

.list-item {
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 75px;
  padding: 16px;
  border-left: 2px solid transparent;
}
.list-item.selected-item {
  outline: $focus-outline;
}

.option-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.option-label {
  font-size: $font-size-primary;
}
.option-sublabel {
  font-size: $font-size-secondary;
  color: $font-color-secondary;
}

.list-item:hover {
  background-color: $background-color-secondary;
  border-left: 2px solid $brand-color;
}

.prefix-wrapper {
  margin-right: 14px;
}

.prefix-icon-wrapper {
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.clear-icon-wrapper {
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  cursor: pointer;
  background: transparent;
  border: none;
}
.clear-icon-wrapper:focus {
  outline: $focus-outline;
}

.icon {
  width: 24px;
  height: 24px;
}
.text-wrapper {
  margin-left: 8px;
}
.value {
  color: $font-color-primary;
  display: block;
  font-size: $font-size-primary;
}
.label {
  color: $font-color-secondary;
  font-size: $font-size-primary;
  display: block;
}
.filled {
  font-size: $font-size-secondary;
}

.select-content-wrapper {
  width: calc(100% + 30px);
  position: absolute;
  left: -15px;
  height: 400px;
  top: -16px;
  background: $background-color-primary;
  border-radius: $border-radius-main;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  width: calc(100%);
  border-bottom: 1px solid $select-border-color;
  height: calc(56px + 30px);
  padding: 15px;
  flex-shrink: 0;
}
</style>
