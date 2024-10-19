<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue', 'next'])

const localQuestion = ref(props.modelValue)
const inputRef = ref<HTMLInputElement | null>(null)

watch(() => props.modelValue, (newValue) => {
  localQuestion.value = newValue
})

const updateQuestion = () => {
  emit('update:modelValue', localQuestion.value)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    updateQuestion()
    emit('next')
  }
}

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <div class="text-center">
    <h2 class="text-2xl font-semibold mb-4">What's your decision question?</h2>
    <input
      ref="inputRef"
      v-model="localQuestion"
      type="text"
      placeholder="E.g., Which car should I buy?"
      @input="updateQuestion"
      @keydown="handleKeydown"
      class="input mb-4"
    >
  </div>
</template>