<script setup lang="ts">
import type { Database } from "~/database.types";

const supabase = useSupabaseClient<Database>();
const config = useRuntimeConfig();

let id = null;
const { data: userData } = await supabase.auth.getUser();
if (!userData.user) {
  const { data, error } = await supabase.auth.signInAnonymously();
  id = data.user?.id;
} else {
  id = userData.user.id;
}

const { data } = await useFetch("/api/strava/token");
const token = data.value?.token;

const startConnectWithStrava = async () => {
  await navigateTo(
    `http://www.strava.com/oauth/authorize?client_id=${config.public.straveClientId}&response_type=code&redirect_uri=${config.public.stravaRedirectUrl}&approval_prompt=force&scope=read,activity:read`,
    {
      external: true,
    }
  );
};
</script>
<template>
  {{ id }}<br />
  {{ token }}<br />
  <h1 class="text-3xl font-bold mb-4">Goals</h1>
  <GoalForm class="mb-4" />
  <GoalList />
  <h1 class="text-3xl font-bold mt-8 mb-4">Recent Efforts</h1>
  <img
    v-if="!token"
    @click="startConnectWithStrava"
    src="~/assets/images/btn_strava_connect_with_orange.png"
    alt="Connect with Strava"
    class="cursor-pointer"
  />
  <RecentEfforts v-else :token="token" />
</template>
