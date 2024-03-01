<template>
  <div>
    <Model :toggle="toggleModel" @close="emit('closeModel')">
      <template #title> add new task </template>
      <template #content>
        <form
          @submit.prevent="createTask"
          @reset="resetForm"
          ref="form"
          class="flex flex-col gap-4 md:min-w-96"
        >
          <div
            class="inline-flex flex-col items-start gap-3 lg:flex-row lg:items-center w-full justify-between"
          >
            <label for="title" class="block text-md font-medium text-gray-500 min-w-24"
              >Title</label
            >
            <input
              required
              v-model="newTask.title"
              name="title"
              class="text-gray-900 border-2 border-gray-100 rounded-md px-2 py-0.5 font-jost bg-gray-50 flex-1 w-full focus:outline-none focus:border-indigo-500"
              type="text"
            />
          </div>
          <div
            class="inline-flex flex-col items-start gap-3 lg:flex-row lg:items-center w-full justify-between"
          >
            <label for="description" class="block text-md font-medium text-gray-500 min-w-24"
              >Description</label
            >
            <textarea
              required
              v-model="newTask.description"
              name="description"
              class="text-gray-900 border-2 border-gray-100 rounded-md px-2 py-0.5 font-jost bg-gray-50 flex-1 w-full focus:outline-none focus:border-indigo-500"
              type="text"
            />
          </div>
          <div
            class="inline-flex flex-col items-start gap-3 lg:flex-row lg:items-center w-full justify-between"
          >
            <label for="assignTo" class="block text-md font-medium text-gray-500 min-w-24"
              >Assign To</label
            >

            <select
              required
              v-model="newTask.assignTo"
              name="assignTo"
              class="text-gray-900 border-2 border-gray-100 rounded-md px-2 py-0.5 font-jost bg-gray-50 flex-1 w-full focus:outline-none focus:border-indigo-500"
            >
              <option value="ahmed tirhmert">Ahmed Tirhmert</option>
            </select>
          </div>
          <div
            class="inline-flex flex-col items-start gap-3 lg:flex-row lg:items-center w-full justify-between"
          >
            <label for="priority" class="block text-md font-medium text-gray-500 min-w-24"
              >Priority</label
            >
            <select
              required
              v-model="newTask.priority"
              name="priority"
              class="text-gray-900 border-2 border-gray-100 rounded-md px-2 py-0.5 font-jost bg-gray-50 flex-1 w-full focus:outline-none focus:border-indigo-500"
            >
              <option value="high" class="">High</option>
              <option value="medium" class="">Medium</option>
              <option value="low" class="">Low</option>
            </select>
          </div>
          <div
            class="inline-flex flex-col items-start gap-3 lg:flex-row lg:items-center w-full justify-between"
          >
            <label for="date" class="block text-md font-medium text-gray-500 min-w-24">Date</label>
            <input
              required
              v-model="newTask.dueDate"
              name="date"
              class="text-gray-900 border-2 border-gray-100 rounded-md px-2 py-0.5 font-jost bg-gray-50 flex-1 w-full focus:outline-none focus:border-indigo-500"
              type="date"
            />
          </div>
          <div class="flex gap-2 justify-end mt-8">
            <input
              class="text-white px-8 py-1.5 bg-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm cursor-pointer delay-75 transition-colors ease-in"
              type="reset"
              value="cancel"
            />
            <input
              class="text-white px-8 py-1.5 bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm cursor-pointer delay-75 transition-colors ease-in"
              type="submit"
              value="Add"
            />
          </div>
        </form>
      </template>
    </Model>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue'
import Model from './partials/model.vue'
import type { Task } from '@/stores/tasks'
import { useTaskStore } from '@/stores/tasks'
import { resolveStatus } from '@/utils/formatters'

interface Props {
  toggleModel: boolean
  taskStatus: string
}

//COMPOSABLES
const tasksStore = useTaskStore()

//PROPS & EMITS
const emit = defineEmits(['closeModel'])
const props = withDefaults(defineProps<Props>(), { toggleModel: false })

//VARIABLES
const form = ref<HTMLFormElement>()
const newTask = ref<Task>({
  title: '',
  description: '',
  assignTo: '',
  priority: '',
  dueDate: '',
  status: '',
  createdAt: new Date().toLocaleDateString()
})

//LOADINGS

//FUNCTIONS
const createTask = async () => {
  newTask.value.status = resolveStatus(props.taskStatus)
  await tasksStore.createTask(newTask.value)
  resetForm()
}

const resetForm = () => {
  form.value?.reset
  newTask.value = {
    title: '',
    description: '',
    assignTo: '',
    priority: '',
    dueDate: '',
    status: '',
    createdAt: new Date().toLocaleDateString()
  }
  emit('closeModel')
}

//COMPUTED & WATCHERS

//LIFE CYCLE HOOKS
</script>

<style scoped></style>
