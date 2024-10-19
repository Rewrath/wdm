<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  question: string
  options: string[]
  criteria: { name: string; weight: number }[]
  rankings: { [option: string]: { [criterion: string]: number } }
}>()

const weightedScores = computed(() => {
  const scores: { [option: string]: number } = {}
  props.options.forEach(option => {
    scores[option] = props.criteria.reduce((total, criterion) => {
      return total + (props.rankings[option][criterion.name] * criterion.weight)
    }, 0)
  })
  return scores
})

const bestOption = computed(() => {
  return Object.entries(weightedScores.value).reduce((a, b) => a[1] > b[1] ? a : b)[0]
})

const sortedOptions = computed(() => {
  return props.options.sort((a, b) => weightedScores.value[b] - weightedScores.value[a])
})
</script>

<template>
  <div class="result">
    <h2>Decision Result</h2>
    <p><strong>Question:</strong> {{ question }}</p>
    <p><strong>Best Option:</strong> {{ bestOption }}</p>
    <h3>Ranking:</h3>
    <ol>
      <li v-for="option in sortedOptions" :key="option">
        {{ option }} (Score: {{ weightedScores[option].toFixed(2) }})
      </li>
    </ol>
    <h3>Detailed Scores:</h3>
    <table>
      <thead>
        <tr>
          <th>Option</th>
          <th v-for="criterion in criteria" :key="criterion.name">
            {{ criterion.name }} ({{ criterion.weight }})
          </th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="option in options" :key="option">
          <td>{{ option }}</td>
          <td v-for="criterion in criteria" :key="criterion.name">
            {{ rankings[option][criterion.name] }}
          </td>
          <td><strong>{{ weightedScores[option].toFixed(2) }}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
}

table {
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

ol {
  text-align: left;
}
</style>