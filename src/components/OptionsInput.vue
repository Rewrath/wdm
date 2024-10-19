<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  options: string[]
}>()

const emit = defineEmits(['update:options', 'next'])

const localOptions = ref(props.options)
const newOption = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(localOptions, (newValue) => {
  emit('update:options', newValue)
}, { deep: true })

const addOption = () => {
  if (newOption.value.trim() && !localOptions.value.includes(newOption.value.trim())) {
    localOptions.value.push(newOption.value.trim())
    newOption.value = ''
    inputRef.value?.focus()
  }
}

const removeOption = (index: number) => {
  localOptions.value.splice(index, 1)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (event.ctrlKey) {
      emit('next')
    } else {
      addOption()
    }
  }
}

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <div class="text-center">
    <h2 class="text-2xl font-semibold mb-4">Enter your options</h2>
    <div class="flex mb-4">
      <input
        ref="inputRef"
        v-model="newOption"
        type="text"
        placeholder="Enter an option"
        @keydown="handleKeydown"
        class="input flex-grow mr-2"
      >
      <button @click="addOption" :disabled="!newOption.trim()" class="btn">Add</button>
    </div>
    <ul class="space-y-2">
      <li v-for="(option, index) in localOptions" :key="index" class="flex items-center bg-gray-100 p-2 rounded">
        <span class="flex-grow">{{ option }}</span>
        <button @click="removeOption(index)" class="text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>