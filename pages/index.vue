<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();

const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey,
  {
    accessToken: () => {
      return Clerk.session?.getToken();
    },
  }
);

console.log(supabase);

const test = () => {
  console.log("test");
};
</script>
<template>
  <SignedOut>
    <SignInButton />
  </SignedOut>
  <SignedIn>
    <UserButton />
  </SignedIn>
  <h1>Hello</h1>
  <UButton @click="test">Button</UButton>
</template>
