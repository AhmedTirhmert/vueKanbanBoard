<template>
  <div
    class="grid grid-cols-1 gap-12 flex-1 md:grid-cols-2"
    :class="`xl:grid-cols-${statuses.length}`"
  >
    <!-- <div class="hidde grid-cols-3"></div> -->
    <TasksColumn
      v-for="(status, index) in statuses"
      :title="status"
      :tasks="taskStore.getTasksByStatus(resolveStatus(status))"
      @open-new-task-model="openNewTaskModel"
      @update-task-status="updateTaskPriority"
      @rename-column="(newName: string) => taskStore.renameColumn(newName, index)"
      @delete-column="taskStore.deleteColumn(index)"
      @edit-task="(taskId) => emit('editTask', taskId)"
      @delete-task="(taskId) => emit('deleteTask', taskId)"
    />
  </div>
</template>

<script setup lang="ts">
import TasksColumn from './tasksColumn.vue'
import { useTaskStore } from '@/stores/tasks'
import { resolveStatus } from '@/utils/formatters'
interface Props {
  statuses: string[]
}
//PROPS & EMITS
const props = defineProps<Props>()
const emit = defineEmits(['openNewTaskModel', 'editTask', 'deleteTask'])

//COMPOSABLES
const taskStore = useTaskStore()

//VARIABLES

//LOADINGS

//FUNCTIONS
const updateTaskPriority = ({ taskId, status }) => {
  taskStore.updateTaskStatus(taskId, status)
}
const openNewTaskModel = (status: string = 'todo') => {
  emit('openNewTaskModel', status)
}

//COMPUTED & WATCHERS

//LIFE CYCLE HOOKS
</script>

<style scoped></style>
