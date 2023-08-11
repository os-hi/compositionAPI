<script setup lang="ts">
import { RouterView} from 'vue-router'
</script>
<template>
    <div class="navBar">
      <a href="/">Home</a>
      <a href="/login">Login</a>
    </div>
    <RouterView />
</template>

<style scoped>

</style>