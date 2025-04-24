<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref("");

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: "http://localhost:3000/confirm",
    },
  });
  if (error) console.log(error);
};
</script>
<template>
  <div>
    <UFormField label="Email" class="mb-2">
      <UInput v-model="email" placeholder="" />
    </UFormField>
    <UButton @click="signInWithOtp" color="primary" variant="solid">
      Sign In With Email
    </UButton>
  </div>
</template>
