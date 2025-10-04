<template>
  <SwitchRoot id="airplane-mode" v-model:checked="switchState" class="switcher">
    <SwitchThumb class="switcher-thumb" />
  </SwitchRoot>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const switchState = ref(props.modelValue)

// Синхронизируем внутреннее состояние с внешним
watch(() => props.modelValue, (newValue) => {
  switchState.value = newValue
}, { immediate: true })

watch(switchState, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style lang="scss">
.switcher {
  width: 44px;
  height: 24px;
  padding: 0;
  border-width: 2px;
  border-style: solid;
  border-radius: 9999px;
  background-color: hsl(240 3.7% 15.9%);
  border-color: hsl(240 3.7% 15.9%);
  transition: all 0.2s ease;

  &[data-state='checked'] {
    background-color: hsl(0 0% 98%);
    border-color: hsl(0 0% 98%);
  }
}

.switcher-thumb {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background-color: hsl(240 10% 3.9%);
  transition: transform 0.2s ease;

  &[data-state='checked'] {
    transform: translateX(20px);
  }
}
</style>
