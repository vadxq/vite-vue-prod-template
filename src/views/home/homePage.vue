<template>
  <div class="home-page">
    <p class="text-lg">hello world</p>
    <p>store: {{ store.items }}</p>
  </div>
</template>

<script setup lang="ts" name="homePage">
import { onMounted, ref } from 'vue';
import { fetch } from '@/apis/home';
import { useMainStore } from '@/store';

const data = ref();
const store = useMainStore();

onMounted(async () => {
  data.value = await fetch();
  console.log(data.value);
});
</script>

<style lang="scss" scoped>
.home-page {
  font-size: 28px;
  background-color: aqua;
  width: 750px;
}
</style>
