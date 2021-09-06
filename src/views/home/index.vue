<template>
  <div class="home">
    <p>hello world</p>
    <p></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { fetch } from '@/apis/home';

export default defineComponent({
  name: 'home',
  setup() {
    const data = ref();
    onMounted(async () => {
      data.value = await fetch();
      console.log(data.value);
    });
    return {
      data
    };
  }
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
