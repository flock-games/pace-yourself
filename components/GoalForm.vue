<script lang="ts" setup>
const goalStore = useGoalsStore();

const eventItems = [
  { label: "5k", value: "5k" },
  { label: "10k", value: "10k" },
  { label: "Half Marathon", value: "half marathon" },
  { label: "Marathon", value: "marathon" },
];
const event = ref("5k");
const goal = ref("");

const submit = () => {
  goalStore.create(event.value, goal.value);

  // Reset the form
  goal.value = "";
  event.value = "5k";
};
</script>

<template>
  <div class="flex mb-4 items-end">
    <UFormField label="Event" class="mr-2">
      <USelect v-model="event" :items="eventItems" class="w-48" />
    </UFormField>
    <UFormField label="Goal Time" class="mr-2">
      <UInput v-model="goal" placeholder="HH:MM:SS" />
    </UFormField>
    <UButton
      @click="submit"
      icon="i-lucide-plus"
      color="primary"
      variant="solid"
    />
  </div>
</template>
