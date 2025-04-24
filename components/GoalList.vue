<script lang="ts" setup>
const { data: goals, error } = await useFetch("/api/goal/list");
console.log("goals", goals);
console.log("error", error);
</script>

<template>
  <div v-for="goal in goals" :key="goal.id" class="mb-4 inline-block mr-4">
    <UCard class="w-96">
      <template #header>
        <strong>{{ goal.event }}</strong>
      </template>
      {{ goal.goal }}
      <template #footer>
        <UButton
          icon="i-lucide-trash-2"
          color="error"
          variant="solid"
          @click="deleteGoal(goal.id)"
        />
      </template>
    </UCard>
  </div>
</template>
