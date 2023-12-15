<script setup lang="ts" name="appPage">
import { onMounted, ref } from 'vue';

const data = ref();

onMounted(async () => {
  console.log(data.value);
});
</script>

<template>
  <router-view />
</template>
