<script lang="ts" setup>
import type { Database } from "~/database.types";

const { code } = useRoute().query;

const supabase = useSupabaseClient<Database>();

const { data: userData } = await supabase.auth.getUser();
if (!userData.user) {
  const { data, error } = await supabase.auth.signInAnonymously();
}

try {
  const { data } = await useFetch(`/api/strava/exchange?code=${code}`, {
    method: "POST",
  });
  console.log(data);
  await navigateTo("/"); // Redirect to the main page

  // TODO redirect to the main page
} catch (error) {
  console.error("Error exchanging code for token:", error);
}
</script>

<template>Connecting with Strava...</template>
