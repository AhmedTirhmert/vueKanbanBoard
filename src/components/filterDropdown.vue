<template>
  <AppButton class="relative" @click.stop="toggleDropdown">
    <template #content>
      Filter
      <Transition name="slide-fade">
        <div
          ref="dropDown"
          v-if="isDropdownOpen"
          class="absolute z-10 bg-white shadow-md rounded-lg mt-2 py-1 w-fit top-8 left-0 border"
        >
          <div class="flex px-5 py-3 gap-3">
            <button
              class="px-3 py-0.5 border hover:bg-slate-300/50 transition-colors delay-0 ease-in"
              @click.stop="filterTasksByPriority('all')"
            >
              All
            </button>
            <button
              class="px-3 py-0.5 border hover:bg-cyan-400/25 transition-colors delay-0 ease-in"
              @click.stop="filterTasksByPriority('low')"
            >
              Low
            </button>

            <button
              class="px-3 py-0.5 border hover:bg-orange-400/25 transition-colors delay-0 ease-in"
              @click.stop="filterTasksByPriority('medium')"
            >
              Medium
            </button>
            <button
              class="px-3 py-0.5 border hover:bg-violet-400/25 transition-colors delay-0 ease-in"
              @click.stop="filterTasksByPriority('high')"
            >
              High
            </button>
          </div>
        </div>
      </Transition>
    </template>
  </AppButton>
</template>

<script setup lang="ts">
import AppButton from './partials/appButton.vue'
import { ref } from 'vue'
import useClickOutside from '@/composables/useClickOutside'

const isDropdownOpen = ref(false)
const dropDown = ref<HTMLElement>()
const emit = defineEmits(['filterTasksByPriority'])
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const hideDropdown = () => {
  isDropdownOpen.value = false
}

const filterTasksByPriority = (priority: string) => {
  emit('filterTasksByPriority', priority)
  toggleDropdown()
}

//COMPOSABLES
useClickOutside(dropDown, hideDropdown)
</script>

<style scoped></style>
