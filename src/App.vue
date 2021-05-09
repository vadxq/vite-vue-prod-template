<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'app',
  setup() {
    return {};
  }
});
</script>

<style lang="scss">
#app {
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
