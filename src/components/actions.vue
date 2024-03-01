<template>
  <div class="grid grid-cols-2 grid-rows-1 gap-2 w-full">
    <section class="flex flex-col w-full items-start gap-2 lg:flex-row lg:items-end lg:gap-4">
      <AppButton @click="emit('openNewTaskModel', defaultStatus)">
        <template #content>
          <AddIcon />
          Add Task
        </template>
      </AppButton>
      <FilterDropdown @filter-tasks-by-priority="filterTasksByPriority" />
    </section>
    <section class="flex flex-col items-end gap-2 lg:flex-row lg:justify-end lg:gap-4">
      <ConnectedUsers />
      <AppButton @click="emit('openShareModel')">
        <template #content>
          <ShareIcon />
          Share
        </template>
      </AppButton>
    </section>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/partials/appButton.vue'
import FilterDropdown from '@/components/filterDropdown.vue'
import ConnectedUsers from '@/components/connectedUsers.vue'
import AddIcon from '@icones/addIcon.vue'
import ShareIcon from '@icones/shareIcon.vue'

interface Props {
  defaultStatus: string
}
const props = defineProps<Props>()
const emit = defineEmits(['openNewTaskModel', 'openShareModel', 'filterTasksByPriority'])

const filterTasksByPriority = (priority: string) => {
  emit('filterTasksByPriority', priority)
}
</script>

<style scoped></style>
