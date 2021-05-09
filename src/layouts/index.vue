<template>
  <div class="layout">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'layout'
});
</script>

<style lang="scss" scoped>
.layout {
  font-size: 24px;

  &-s {
    font-size: 12px;
  }
}
</style>
