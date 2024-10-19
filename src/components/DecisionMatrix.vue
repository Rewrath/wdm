<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['next']);

const showExplanation = ref(false);

const toggleExplanation = () => {
  showExplanation.value = !showExplanation.value;
};
</script>

<template>
  <div class="text-center">
    <h2 class="text-2xl font-semibold mb-4">Welcome to the Decision Helper</h2>
    <p class="mb-4">
      This app will guide you through creating a Weighted Decision Matrix to
      help you make a decision.
    </p>
    <!--<button @click="toggleExplanation" class="btn mb-4">{{ showExplanation ? 'Hide' : 'Show' }} Explanation</button>
    <div v-if="showExplanation" class="bg-gray-100 rounded-lg p-4 mb-4 text-left">
      <h3 class="font-semibold mb-2">How it works:</h3>
      <ol class="list-decimal list-inside">
        <li>You'll enter your decision question.</li>
        <li>You'll list the options you're considering.</li>
        <li>You'll define evaluation criteria and their importance (weight).</li>
        <li>You'll rank each option for each criterion.</li>
        <li>The app will calculate the best option based on your input.</li>
      </ol>
    </div>
    <button @click="emit('next')" class="btn">Start</button>-->
  </div>
</template>
