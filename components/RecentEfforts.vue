<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui/runtime/components/Table.vue.js";

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
});

const { data } = await useFetch(
  `/api/strava/activities/list?token=${props.token}`
);
if (!data) {
  console.error("No data returned from API");
}
console.log(data);
</script>

<template>
  <UTable :data="data" class="flex-1" />
</template>
