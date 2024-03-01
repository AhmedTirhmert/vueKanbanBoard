<template>
  <Teleport to="body">
    <Transition name="slide-fade">
      <div class="fixed inset-0 flex items-center justify-center z-20" v-if="toggle">
        <div @click="emit('close')" class="fixed inset-0 bg-black opacity-50"></div>
        <div
          class="model-content bg-white px-8 py-4 rounded-lg shadow-lg z-50 w-screen flex flex-col md:w-fit"
        >
          <div class="flex w-full justify-between items-center">
            <span class="capitalize font-semibold text-2xl">
              <slot name="title"></slot>
            </span>
            <CloseIcon
              class="text-xl cursor-pointer justify-self-end hover:text-red-600"
              @click="emit('close')"
            />
          </div>
          <div class="my-4">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import CloseIcon from '@icones/closeIcon.vue'
import { watch } from 'vue'
interface Props {
  toggle: boolean
}
const emit = defineEmits(['close'])
const props = withDefaults(defineProps<Props>(), { toggle: false })

watch(
  () => props.toggle,
  () => {
    document.getElementsByTagName('body')[0].classList.toggle('overflow-hidden')
  }
)
</script>

<style lang="scss" scoped>
.model-content {
  min-height: 20vh;
}
</style>
