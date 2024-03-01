<template>
  <div class="flex flex-col gap-2 text-gray-00">
    <div class="flex draggables-center justify-between gap-4">
      <div class="flex items-center gap-2 flex-1">
        <CheckListIcon v-if="resolveStatus(title) === 'todo'" />
        <span
          v-if="!isRenaming"
          class="font-semibold capitalize py-1 hover:cursor-pointer"
          @dblclick="enableRenaming"
        >
          {{ title }}
        </span>
        <input
          v-else
          ref="columnNameInput"
          class="bg-transparent box-border flex-1 px-2 text-sm py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-200 focus:shadow-md rounded-md"
          type="text"
          name="columnName"
          v-model="columnName"
          @keydown.enter="renameColumn"
          @keydown.esc="isRenaming = false"
        />
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="openNewTaskModel"
          class="p-1.5 rounded-full hover:bg-gray-200 transition-colors delay-75 ease-in"
        >
          <AddIcon />
        </button>
        <TaskColumnDropdown @rename-column="enableRenaming" @delete-column="deleteColumn" />
      </div>
    </div>

    <div
      class="relative tasks-column bg-slate-200 rounded-md flex flex-col gap-2 flex-1 min-h-80 border border-gray-400/50"
    >
      <draggable
        class="list-group flex-1 mg overflow-auto px-2 py-2"
        :list="localTasks"
        group="tasks"
        @add="onDragAdd"
        item-key="id"
        @update="onUpdate"
      >
        <template #item="{ element }">
          <TaskCard
            :task="element"
            @edit-task="(taskId) => emit('editTask', taskId)"
            @delete-task="(taskId) => emit('deleteTask', taskId)"
          />
        </template>
      </draggable>
      <div v-if="isTasksArrayEmpty">
        <AddTaskButton ref="emptyState" class="absolute top-3" @click="openNewTaskModel" />
      </div>
    </div>

    <div v-if="!isTasksArrayEmpty">
      <AddTaskButton @click="openNewTaskModel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckListIcon from '@icones/checkListIcon.vue'
import TaskColumnDropdown from './taskColumnDropdown.vue'
import AddIcon from '@icones/addIcon.vue'
import draggable from 'vuedraggable'
import AddTaskButton from '@/components/addTaskButton.vue'
import { computed, nextTick, ref, watchEffect } from 'vue'
import TaskCard from './TaskCard.vue'
import type { Task } from '@/stores/tasks'
import { resolveStatus } from '@utils/formatters'
// import useClickOutside from '@composables/useClickOutside'

interface Props {
  tasks: Task[]
  title: string
}

//PROPS & EMITS
const emit = defineEmits([
  'openNewTaskModel',
  'updateTaskStatus',
  'deleteColumn',
  'renameColumn',
  'editTask',
  'deleteTask'
])
const props = defineProps<Props>()

//VARIABLES
const localTasks = ref<Task[]>([])
const columnName = ref<string>(props.title)
const columnNameInput = ref<HTMLElement>()
const isRenaming = ref<boolean>(false)

//LOADINGS

//FUNCTIONS
const onDragAdd = (event: any) => {
  emit('updateTaskStatus', {
    taskId: event.item._underlying_vm_.id,
    status: resolveStatus(props.title)
  })
}

const openNewTaskModel = () => {
  emit('openNewTaskModel', resolveStatus(props.title))
}

const onUpdate = (event: any) => {
  const newIndex = event.newIndex

  const removedItem = localTasks.value.splice(newIndex, 1)[0]

  localTasks.value.splice(newIndex, 0, removedItem)
}

const deleteColumn = () => {
  emit('deleteColumn')
}
const renameColumn = () => {
  console.log('RENAMING')
  emit('renameColumn', columnName.value)
  isRenaming.value = false
}

const enableRenaming = async () => {
  isRenaming.value = true
  await nextTick()
  columnNameInput.value?.focus()
}

//COMPOSABLES
// useClickOutside(columnNameInput, renameColumn)
//COMPUTED & WATCHERS
const isTasksArrayEmpty = computed(() => !localTasks.value.length)
watchEffect(() => {
  localTasks.value = props.tasks
})
//LIFE CYCLE HOOKS
</script>

<style scoped></style>
