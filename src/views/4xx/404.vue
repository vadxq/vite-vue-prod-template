<template>
  <div class="notFound">
    <p>404 Not Found!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'notFound'
});
</script>

<style lang="scss" scoped>
.notFound {
  font-size: 24px;
}
</style>
