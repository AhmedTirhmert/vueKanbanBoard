<script setup lang="ts">
import AppHeader from '@/components/appHeader.vue'
import Actions from '@/components/actions.vue'
import TasksContainer from './components/tasksContainer.vue'
import addTaskModel from './components/addTaskModel.vue'
import { onMounted, ref } from 'vue'
import shareModel from './components/shareModel.vue'
import { useTaskStore, type Task } from './stores/tasks'
import defaultStatuses from '@constants/defaulsStatuses'
import editTaskModel from './components/editTaskModel.vue'
import DeleteTaskModel from './components/deleteTaskModel.vue'

const taskStore = useTaskStore()

const isNewTaskModelVisible = ref<boolean>(false)
const isEditTaskModelVisible = ref<boolean>(false)
const isDeleteTaskModelVisible = ref<boolean>(false)
const isShareModelVisible = ref<boolean>(false)
const newTaskstatus = ref<string>('')
const selectedTask = ref<Task>()

const openNewTaskModel = (status: string) => {
  newTaskstatus.value = status
  isNewTaskModelVisible.value = true
}

const openEditTaskModel = (taskId: string) => {
  selectedTask.value = { ...taskStore.getTaskById(taskId) }
  isEditTaskModelVisible.value = true
}

const openDeleteTaskModel = (taskId: string) => {
  selectedTask.value = { ...taskStore.getTaskById(taskId) }
  isDeleteTaskModelVisible.value = true
}

const deleteTask = () => {
  taskStore.deleteTask(selectedTask.value?.id || '')
  isDeleteTaskModelVisible.value = false
}
onMounted(() => {
  taskStore.initStatuses(defaultStatuses)
})
</script>

<template>
  <AppHeader />
  <main class="w-11/12 mx-auto pt-24 pb-5 h-screen max-h-screen font-jost flex flex-col gap-6">
    <Actions
      :default-status="taskStore.getDefaultStatus"
      @open-new-task-model="openNewTaskModel"
      @open-share-model="isShareModelVisible = true"
      @filter-tasks-by-priority="taskStore.filterTasksByPriority"
    />
    <TasksContainer
      :statuses="taskStore.getStatuses"
      @open-new-task-model="openNewTaskModel"
      @edit-task="openEditTaskModel"
      @delete-task="openDeleteTaskModel"
    />
  </main>
  <shareModel :toggle-model="isShareModelVisible" @close-model="isShareModelVisible = false" />
  <addTaskModel
    :task-status="newTaskstatus"
    :toggle-model="isNewTaskModelVisible"
    @close-model="isNewTaskModelVisible = false"
  />
  <editTaskModel
    :task="selectedTask"
    :toggle-model="isEditTaskModelVisible"
    @close-model="isEditTaskModelVisible = false"
  />
  <DeleteTaskModel
    :task="selectedTask"
    @delete-task="deleteTask"
    :toggle-model="isDeleteTaskModelVisible"
    @close-model="isDeleteTaskModelVisible = false"
  />
</template>
