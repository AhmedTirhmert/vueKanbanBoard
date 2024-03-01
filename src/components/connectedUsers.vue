<template>
  <div class="flex items-center gap-3 justify-evenly min-w-40 lg:min-w-fit">
    <userAvatar user-name="Ahmed Tirhmert" />
    <userAvatar />
    <userAvatar />
  </div>
</template>

<script setup lang="ts">
import userAvatar from './partials/userAvatar.vue'
</script>

<style scoped></style>
