<template>
  <div class="not-found">
    <p>404 Not Found!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound'
});
</script>

<style lang="scss" scoped>
.not-found {
  font-size: 24px;
}
</style>
