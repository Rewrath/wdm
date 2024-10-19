<script setup lang="ts">
import { ref, computed } from 'vue';
import DecisionMatrix from './components/DecisionMatrix.vue';
import QuestionInput from './components/QuestionInput.vue';
import OptionsInput from './components/OptionsInput.vue';
import CriteriaInput from './components/CriteriaInput.vue';
import RankingInput from './components/RankingInput.vue';
import Result from './components/Result.vue';

const currentStep = ref(1);
const question = ref('');
const options = ref<string[]>([]);
const criteria = ref<{ name: string; weight: number }[]>([]);
const rankings = ref<{ [option: string]: { [criterion: string]: number } }>({});

const nextStep = () => {
  currentStep.value++;
};

const prevStep = () => {
  currentStep.value--;
};

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 2:
      return question.value.trim() !== '';
    case 3:
      return options.value.length >= 2;
    case 4:
      return criteria.value.length >= 2;
    case 5:
      return (
        Object.keys(rankings.value).length === options.value.length &&
        criteria.value.every((criterion) =>
          options.value.every(
            (option) => rankings.value[option]?.[criterion.name] !== undefined
          )
        )
      );
    default:
      return true;
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
      >
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Decision Helper
        </h1>
        <div v-if="currentStep === 1">
          <DecisionMatrix @next="nextStep" />
        </div>
        <div v-else-if="currentStep === 2">
          <QuestionInput v-model="question" @next="nextStep" />
        </div>
        <div v-else-if="currentStep === 3">
          <OptionsInput v-model:options="options" @next="nextStep" />
        </div>
        <div v-else-if="currentStep === 4">
          <CriteriaInput v-model:criteria="criteria" />
        </div>
        <div v-else-if="currentStep === 5">
          <RankingInput
            :options="options"
            :criteria="criteria"
            v-model:rankings="rankings"
          />
        </div>
        <div v-else-if="currentStep === 6">
          <Result
            :question="question"
            :options="options"
            :criteria="criteria"
            :rankings="rankings"
          />
        </div>
        <div class="flex justify-between mt-6">
          <button @click="prevStep" :disabled="currentStep === 1" class="btn">
            Previous
          </button>
          <button @click="nextStep" :disabled="!canProceed" class="btn">
            Next <i>(ctrl + enter)</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
