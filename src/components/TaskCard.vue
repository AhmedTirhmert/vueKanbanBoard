<template>
  <div
    class="card relative bg-white mb-2 text-gray-800 flex gap-2 px-6 py-4 rounded-md cursor-pointer hover:bg-slate-100 transition-colors ease-in delay-75 border border-gray-300 shadow-md overflow-x-clip"
    :class="{
      'pointer-events-none': readonly
    }"
  >
    <div class="card-actions">
      <button
        class="text-green-500 rounded-bl-md p-2 border border-slate-200 shadow border-r-0 border-t-0 bg-white hover:border-green-500"
        @click.stop="emit('editTask', task.id)"
      >
        <EditIcon height="20" class="" />
      </button>
      <button
        class="text-red-600 rounded-tl-md p-2 border border-slate-200 shadow border-r-0 border-b-0 bg-white hover:border-red-600/50"
        @click.stop="emit('deleteTask', task.id)"
      >
        <TrashIcon height="20" class="" />
      </button>
    </div>
    <checkMarkIcon
      class="mt-0.5"
      :class="{
        'text-green-600': task.status === 'done'
      }"
    />
    <div class="flex flex-col flex-1 gap-1">
      <span class="text-xl font-semibold">{{ task.title }}</span>
      <!-- <span class="text-base font-semibold text-gray-600">Description</span> -->
      <p class="text-sm">
        {{ task.description }}
      </p>
      <TaskPriority :priority="task.priority" @update-task-priority="updateTaskPriority" />
      <div class="flex items-center gap-3">
        <userAvatar class="text-sm font-semibold" :user-name="task.assignTo" />
        <span class="text-sm font-semibold text-gray-500">{{ createdAt }} - {{ duoDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskPriority from './taskPriorityChip.vue'
import checkMarkIcon from './icones/checkMarkIcon.vue'
import userAvatar from './partials/userAvatar.vue'
import type { Task } from '@/stores/tasks'
import { useTaskStore } from '@/stores/tasks'
import { computed } from 'vue'
import EditIcon from './icones/editIcon.vue'
import TrashIcon from './icones/trashIcon.vue'
interface Props {
  task: Task
  readonly: boolean
}

//PROPS & EMITS
const props = defineProps<Props>()
const emit = defineEmits(['editTask', 'deleteTask'])
//COMPOSABLES
const taskStore = useTaskStore()

//VARIABLES
//LOADINGS

//FUNCTIONS
const updateTaskPriority = (priority: string) => {
  taskStore.updateTaskPriority(props.task.id || '', priority)
}

//COMPUTED & WATCHERS
const createdAt = computed(() => {
  return new Date(props.task.createdAt).toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'short'
  })
})
const duoDate = computed(() => {
  return new Date(props.task.dueDate).toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'short'
  })
})

//LIFE CYCLE HOOKS
</script>

<style scoped lang="scss">
.card {
  &-actions {
    @apply absolute right-0 top-0 flex flex-col gap-1 h-full transition-transform delay-75 duration-100 ease-in-out justify-between translate-x-16;
  }
  &:hover &-actions {
    @apply translate-x-0;
  }
}
</style>
