<template>
  <button 
    class="px-5 py-1 w-full rounded-md flex justify-center items-center gap-2 text-gray-600 font-semibold hover:bg-slate-200 hover:text-gray-800 transition-colors delay-75 ease-in"
  >
    <AddIcon />
    <span>Add Task</span>
  </button>
</template>

<script setup lang="ts">
import AddIcon from './icones/addIcon.vue'
</script>

<style scoped></style>
