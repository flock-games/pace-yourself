<script lang="ts" setup>
const eventItems = [
  { label: "5k", value: "5k" },
  { label: "10k", value: "10k" },
  { label: "Half Marathon", value: "half marathon" },
  { label: "Marathon", value: "marathon" },
];
const event = ref("5k");
const goal = ref("");

const submit = async () => {
  const { data, error } = await useFetch(`/api/goal/create`, {
    method: "POST",
    body: {
      event: event.value,
      goal: goal.value,
    },
  });
  console.log("data", data);
  console.log("error", error);
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
