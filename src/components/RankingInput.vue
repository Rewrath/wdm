<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  options: string[]
  criteria: { name: string; weight: number }[]
  rankings: { [option: string]: { [criterion: string]: number } }
}>()

const emit = defineEmits(['update:rankings'])

const localRankings = ref(props.rankings)
const currentCriterionIndex = ref(0)

watch(localRankings, (newValue) => {
  emit('update:rankings', newValue)
}, { deep: true })

const initializeRankings = () => {
  props.options.forEach(option => {
    if (!localRankings.value[option]) {
      localRankings.value[option] = {}
    }
    props.criteria.forEach(criterion => {
      if (!localRankings.value[option][criterion.name]) {
        localRankings.value[option][criterion.name] = 5
      }
    })
  })
}

initializeRankings()

const currentCriterion = computed(() => props.criteria[currentCriterionIndex.value])

const isComplete = computed(() => {
  return currentCriterionIndex.value >= props.criteria.length
})

const nextCriterion = () => {
  if (currentCriterionIndex.value < props.criteria.length - 1) {
    currentCriterionIndex.value++
  }
}

const prevCriterion = () => {
  if (currentCriterionIndex.value > 0) {
    currentCriterionIndex.value--
  }
}
</script>

<template>
  <div class="ranking-input">
    <h2>Rank options for each criterion</h2>
    <div v-if="!isComplete">
      <h3>{{ currentCriterion.name }} (Weight: {{ currentCriterion.weight }})</h3>
      <p>Rate all options for {{ currentCriterion.name }}:</p>
      <div v-for="option in options" :key="option" class="option-ranking">
        <span>{{ option }}:</span>
        <div class="slider-container">
          <input
            v-model="localRankings[option][currentCriterion.name]"
            type="range"
            min="1"
            max="10"
            class="slider"
          >
          <span>{{ localRankings[option][currentCriterion.name] }}</span>
        </div>
      </div>
      <div class="navigation">
        <button @click="prevCriterion" :disabled="currentCriterionIndex === 0">Previous Criterion</button>
        <button @click="nextCriterion" :disabled="currentCriterionIndex === criteria.length - 1">Next Criterion</button>
      </div>
    </div>
    <div v-else>
      <p>All criteria have been ranked!</p>
    </div>
  </div>
</template>

<style scoped>
.ranking-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.option-ranking {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.slider-container {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.slider {
  width: 200px;
  margin-right: 1rem;
}

.navigation {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>