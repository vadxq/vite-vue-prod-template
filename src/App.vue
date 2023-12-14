<template>
  <router-view />
</template>

<script setup lang="ts" name="appPage">
import { onMounted, ref } from 'vue';

const data = ref();

onMounted(async () => {
  console.log(data.value);
});
</script>

<style lang="scss" scoped>
#app {
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
