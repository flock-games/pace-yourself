<script setup lang="ts">
const config = useRuntimeConfig();

const startConnectWithStrava = async () => {
  await navigateTo(
    `http://www.strava.com/oauth/authorize?client_id=${config.public.straveClientId}&response_type=code&redirect_uri=${config.public.redirectUrl}&approval_prompt=force&scope=read,activity:read`,
    {
      external: true,
    }
  );
};
</script>
<template>
  <h1 class="text-3xl font-bold mb-4">Goals</h1>
  <GoalForm class="mb-4" />
  <GoalList />
  <h1 class="text-3xl font-bold mt-8 mb-4">Recent Efforts</h1>
  <img
    @click="startConnectWithStrava"
    src="~/assets/images/btn_strava_connect_with_orange.png"
    alt="Connect with Strava"
    class="cursor-pointer"
  />
</template>
