<script lang="ts" setup>
// import { createClient } from "@supabase/supabase-js";

// const config = useRuntimeConfig();

const eventItems = ["5k", "10k", "Half Marathon", "Marathon"];
const event = ref("5k");
const goal = ref("");

// const supabase = createClient(
//   config.public.supabaseUrl,
//   config.public.supabaseKey,
//   {
//     accessToken: () => {
//       return Clerk.session?.getToken();
//     },
//   }
// );

const submit = () => {};
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
