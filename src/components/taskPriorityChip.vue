<template>
  <div class="my-2 relative">
    <Chip :class="chipColorClass" @click.stop="toggleDropdown"> {{ priority }} </Chip>
    <Transition name="slide-fade">
      <div
        ref="dropDown"
        v-if="isDropdownOpen"
        class="absolute z-10 bg-white shadow-md rounded-lg mt-2 py-1 w-fit top-3.5 left-0 border cursor-default"
      >
        <div class="flex flex-col px-5 py-3 gap-3">
          <Chip
            class="bg-cyan-400/75 cursor-pointer hover:bg-cyan-400"
            @click.stop="updateTaskPriority('low')"
            >Low</Chip
          >
          <Chip
            class="bg-orange-400/75 cursor-pointer hover:bg-orange-400"
            @click.stop="updateTaskPriority('medium')"
            >Medium</Chip
          >
          <Chip
            class="bg-violet-400/75 cursor-pointer hover:bg-violet-400"
            @click.stop="updateTaskPriority('high')"
            >High</Chip
          >
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Chip from './partials/chip.vue'
import useClickOutside from '@/composables/useClickOutside'
interface Props {
  priority: string
}
//PROPS & EMITS
const props = defineProps<Props>()
const emit = defineEmits(['updateTaskPriority'])

//VARIABLES
const isDropdownOpen = ref<boolean>(false)
const dropDown = ref<HTMLElement>()
//LOADINGS

//FUNCTIONS
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const hideDropdown = () => {
  isDropdownOpen.value = false
}

const updateTaskPriority = (priority: string) => {
  emit('updateTaskPriority', priority)
  toggleDropdown()
}

//COMPOSABLES
useClickOutside(dropDown, hideDropdown)

//COMPUTED & WATCHERS
const chipColorClass = computed(() => {
  switch (props.priority) {
    case 'low':
      return 'bg-cyan-400/85'
    case 'medium':
      return 'bg-orange-400/85'
    case 'high':
      return 'bg-violet-400/85'
  }
})

//LIFE CYCLE HOOKS
</script>

<style scoped></style>
