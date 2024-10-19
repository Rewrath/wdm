<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps<{
  criteria: { name: string; weight: number }[];
}>();

const emit = defineEmits(['update:criteria']);

const localCriteria = ref(props.criteria);
const newCriterion = ref('');
const newWeight = ref(5);
const inputRef = ref<HTMLInputElement | null>(null);

watch(
  localCriteria,
  (newValue) => {
    emit('update:criteria', newValue);
  },
  { deep: true }
);

const addCriterion = () => {
  if (
    newCriterion.value.trim() &&
    !localCriteria.value.some((c) => c.name === newCriterion.value.trim())
  ) {
    localCriteria.value.push({
      name: newCriterion.value.trim(),
      weight: newWeight.value,
    });
    newCriterion.value = '';
    newWeight.value = 5;
    inputRef.value?.focus();
  }
};

const removeCriterion = (index: number) => {
  localCriteria.value.splice(index, 1);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addCriterion();
  }
};

const isValid = computed(() => {
  return (
    localCriteria.value.length >= 2 &&
    localCriteria.value.every((c) => c.name.trim() !== '')
  );
});

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <div class="text-center">
    <h2 class="text-2xl font-semibold mb-4">Enter evaluation criteria</h2>
    What is important? The affordability(price)? The quality? The Speed?
    <div class="flex mb-4">
      <input
        ref="inputRef"
        v-model="newCriterion"
        type="text"
        placeholder="Enter a criterion"
        @keydown="handleKeydown"
        class="input flex-grow mr-2"
      />
      <div class="flex items-center">
        <input
          v-model="newWeight"
          type="range"
          min="1"
          max="10"
          class="w-24 mr-2"
        />
        <span class="w-8">{{ newWeight }}</span>
      </div>
      <button
        @click="addCriterion"
        :disabled="!newCriterion.trim()"
        class="btn ml-2"
      >
        Add
      </button>
    </div>
    <ul class="space-y-2">
      <li
        v-for="(criterion, index) in localCriteria"
        :key="index"
        class="flex items-center bg-gray-100 p-2 rounded"
      >
        <input
          v-model="criterion.name"
          type="text"
          @input="criterion.name = criterion.name.trim()"
          class="input flex-grow mr-2"
        />
        <div class="flex items-center">
          <input
            v-model="criterion.weight"
            type="range"
            min="1"
            max="10"
            class="w-24 mr-2"
          />
          <span class="w-8">{{ criterion.weight }}</span>
        </div>
        <button
          @click="removeCriterion(index)"
          class="text-red-500 hover:text-red-700 ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>
