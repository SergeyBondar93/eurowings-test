<script setup lang="ts">
import Backdrop from "./Backdrop.vue";
import Input from "./Input.vue";
import RemoveIcon from "@assets/highlight_off_24px.svg";
import { computed, onUpdated, ref } from "vue";

type Option = {
  label: string;
  value: string;
  subLabel?: string;
};

interface Props {
  name: string;
  label: string;
  options: Option[];
  title: string;
  selected: string;
}

const listWrapperRef = ref<HTMLDivElement | null>(null);

const props = defineProps<Props>();
const { label, name, title } = props;

const options = computed(() => props.options);
const selected = computed(() => props.selected);

const selectedOption = computed(() => {
  return options.value.find((option) => option.value === selected.value);
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref("");
const isOpen = ref(false);

const changeIsOpen = () => {
  isOpen.value = true;
};

function clearInput() {
  inputValue.value = "";
}

const selectedIndex = ref(-1);

function onFocus() {
  isOpen.value = true;
}

function onBlur() {
  isOpen.value = false;
  selectedIndex.value = -1;
}

function onKeyDown(event: any) {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      navigateOptions(1);
      scrollIntoView();
      break;
    case "ArrowUp":
      event.preventDefault();
      navigateOptions(-1);
      scrollIntoView();
      break;
    case "Enter":
      if (isOpen.value && selectedIndex.value !== -1) {
        selectOption(options.value[selectedIndex.value].value);
      } else {
        isOpen.value = !isOpen.value;
      }
      break;
    case "Escape":
      isOpen.value = false;
      selectedIndex.value = -1;
      break;
    default:
      break;
  }
}

onUpdated(() => {
  if (isOpen.value) {
    document.addEventListener("keydown", onKeyDown);
  } else {
    document.removeEventListener("keydown", onKeyDown);
  }
});

function navigateOptions(direction: number) {
  let newIndex = selectedIndex.value + direction;
  newIndex = Math.max(Math.min(newIndex, options.value.length - 1), 0);
  selectedIndex.value = newIndex;
}

function scrollIntoView() {
  const activeElement = listWrapperRef.value!.children[selectedIndex.value];
  activeElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function selectOption(newValue: string) {
  isOpen.value = false;
  emit("update:modelValue", newValue);
}
</script>

<template>
  <Backdrop :isShow="isOpen" @update:isShow="isOpen = $event" />

  <div
    class="select-button"
    @click="changeIsOpen"
    tabindex="1"
    @focus="onFocus"
    @blur="onBlur"
  >
    <span class="prefix-icon-wrapper">
      <slot name="input-prefix"></slot>
    </span>

    <div class="text-wrapper">
      <span :class="['label', { filled: !!inputValue }]">{{ label }}</span>
      <span class="value">{{ selectedOption?.label }}</span>
    </div>

    <span class="clear-icon-wrapper" @click="clearInput">
      <RemoveIcon />
    </span>

    <div
      v-if="isOpen"
      class="select-wrapper"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
    >
      <div class="input-wrapper">
        <Input
          :name="name"
          :isClearable="true"
          :value="inputValue"
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
            v-for="(item, index) in options"
            :key="item.value"
            @click="selectOption(item.value)"
            :aria-selected="index === selectedIndex"
          >
            <div
              :class="[
                'list-item',
                { 'selected-item': index === selectedIndex },
              ]"
            >
              <span class="prefix-wrapper">
                <slot name="option-prefix"></slot>
              </span>

              <div class="option-text-wrapper">
                <span>
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

<style scoped>
.select-button {
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--select-border-color);
  border-radius: var(--border-radius-main);
  height: 55px;
  padding: 0px 56px 0px 8px;
  cursor: pointer;
  position: relative;
}

.select-button:focus {
  border: 2px solid red;
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
  background: var(--background-color-thirdly);
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
  border: 2px solid var(--brand-color);
}

.option-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.option-sublabel {
  font-size: var(--font-size-secondary);
  color: var(--font-color-secondary);
}

.list-item:hover {
  background-color: var(--background-color-secondary);
  border-left: 2px solid var(--brand-color);
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
}
.icon {
  width: 24px;
  height: 24px;
}
.text-wrapper {
  margin-left: 8px;
}
.value {
  color: var(--font-color-primary);
  display: block;
  font-size: var(--font-size-primary);
}
.label {
  color: var(--font-color-secondary);
  font-size: var(--font-size-primary);
  display: block;
}
.filled {
  font-size: var(--font-size-secondary);
}

.select-wrapper {
  width: calc(100% + 30px);
  position: absolute;
  left: -15px;
  height: 400px;
  top: -16px;
  background: var(--background-color-primary);
  border-radius: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  width: calc(100%);
  border-bottom: 1px solid var(--select-border-color);
  height: calc(56px + 30px);
  padding: 15px;
  flex-shrink: 0;
}
</style>
