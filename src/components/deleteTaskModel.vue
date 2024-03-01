<template>
  <div>
    <Model :toggle="toggleModel" @close="emit('closeModel')">
      <template #title> Delete Task </template>
      <template #content>
        <form @submit.prevent="emit('deleteTask')" @reset="emit('closeModel')" class="px-8 pt-3">
          <div class="inline-flex flex-col items-center gap-3 w-full justify-between">
            <h1 class="text-3xl font-semibold text-center">Are you sure?</h1>
            <h2 class="text-sm text-center">
              Are you sure you want to delete the task below,<br />
              this action can not be reverted
            </h2>
            <TaskCard class="w-full" :task="task" readonly />
          </div>
          <div class="flex justify-center align-middle items-center mt-5 gap-1">
            <input
              class="text-white px-8 py-1.5 bg-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm cursor-pointer delay-75 transition-colors ease-in"
              type="reset"
              value="Cancel"
            /><input
              class="text-white px-8 py-1.5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm cursor-pointer delay-75 transition-colors ease-in"
              type="submit"
              value="Confirm"
            />
          </div>
        </form>
      </template>
    </Model>
  </div>
</template>

<script setup lang="ts">
import Model from './partials/model.vue'
import type { Task } from '@/stores/tasks'
import TaskCard from './TaskCard.vue'
interface Props {
  toggleModel: boolean
  task: Task
}

const emit = defineEmits(['closeModel', 'deleteTask'])
const props = withDefaults(defineProps<Props>(), { toggleModel: false })
</script>
