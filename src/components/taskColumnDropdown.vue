<template>
  <button
    @click="toggleDropdown"
    ref="dropDown"
    class="relative p-1.5 rounded-full hover:bg-gray-200 transition-colors delay-75 ease-in"
  >
    <DotsIcon />
    <Transition name="slide-fade">
      <div
        v-if="isDropdownOpen"
        class="absolute z-10 bg-white shadow-md rounded-lg mt-2 py-1 w-fit top-5 -right-5 border cursor-default"
      >
        <div class="flex flex-col px-0 py-3 gap-1 min-w-36">
          <div
            @click="emit('renameColumn')"
            class="flex gap-2 pl-5 py-1 items-center hover:bg-slate-200/75 cursor-pointer transition-all hover:font-medium"
          >
            <EditIcon height="20" width="20" class="" /><span class="flex-1 text-start"
              >Rename</span
            >
          </div>
          <div
            @click="emit('deleteColumn')"
            class="flex gap-2 pl-5 py-1 items-center hover:bg-slate-200/75 cursor-pointer transition-all hover:font-medium"
          >
            <TrashIcon height="20" width="20" class="text-red-700" /><span class="flex-1 text-start"
              >Delete</span
            >
          </div>
        </div>
      </div>
    </Transition>
  </button>
</template>

<script setup lang="ts">
import DotsIcon from '@icones/dotsIcon.vue'
import { ref } from 'vue'
import useClickOutside from '@/composables/useClickOutside'
import EditIcon from './icones/editIcon.vue'
import TrashIcon from './icones/trashIcon.vue'

//PROPS & EMITS
const emit = defineEmits(['renameColumn', 'deleteColumn'])

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

//COMPOSABLES
useClickOutside(dropDown, hideDropdown)

//COMPUTED & WATCHERS

//LIFE CYCLE HOOKS
</script>

<style scoped></style>
