<script lang="ts" setup>
const { code } = useRoute().query;
try {
  const { data } = await useFetch(`/api/strava/exchange?code=${code}`, {
    method: "POST",
  });
  console.log(data);
  // TODO redirect to the main page
} catch (error) {
  console.error("Error exchanging code for token:", error);
}
</script>

<template>Connecting with Strava...</template>
