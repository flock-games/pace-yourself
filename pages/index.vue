<script setup lang="ts">
const test = () => {
  console.log("test");
};
</script>
<template>
  <UContainer>
    <h1>Hello</h1>
    <UButton @click="test">Button</UButton>
  </UContainer>
</template>
