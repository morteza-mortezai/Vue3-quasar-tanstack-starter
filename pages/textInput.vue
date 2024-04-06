<template>
  <input :value="props.modelValue" @input="handleInput" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props=defineProps<{
  modelValue:string
}>()
const emit=defineEmits(['update:modelValue'])

// const inputValue = ref(props.modelValue)

function handleInput(event: any) {
  // inputValue.value = event.target.value;
  emit('update:modelValue', event.target.value);
}

</script>
