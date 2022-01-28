<template>
  <div class="home">
    <p>hello world</p>
    <p>store: {{ store.items }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { fetch } from '@/apis/home';
import { useMainStore } from '@/store';

export default defineComponent({
  name: 'home',
  setup() {
    const data = ref();
    const store = useMainStore();
    onMounted(async () => {
      data.value = await fetch();
      console.log(data.value);
    });
    return {
      data,
      store
    };
  }
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
