<template>
  <div>
    <Model :toggle="toggleModel" @close="closeModel">
      <template #title> Share Workspace </template>
      <template #content>
        <form @submit.prevent="copieLink" class="w-80">
          <div class="inline-flex flex-col items-start gap-3 w-full justify-between">
            <label for="title" class="block text-md font-medium text-gray-500 min-w-24">Link</label>
            <input
              required
              name="title"
              class="text-gray-400 border-2 border-gray-100 rounded-md px-2 py-0.5 font-jost bg-gray-50 flex-1 w-full focus:outline-none"
              type="text"
              readonly
              :value="workspaceLink"
            />
          </div>
          <div
            class="flex justify-end align-middle items-center mt-5"
            :class="{ 'justify-between': isLinkCopied }"
          >
            <Transition name="fade">
              <span v-if="isLinkCopied" class="text-sm text-green-700"
                >Link Copied to Clipboard</span
              >
            </Transition>
            <input
              class="text-white px-8 py-1.5 bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm cursor-pointer delay-75 transition-colors ease-in"
              type="submit"
              value="Copy Link"
            />
          </div>
        </form>
      </template>
    </Model>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Model from './partials/model.vue'
interface Props {
  toggleModel: boolean
}

const emit = defineEmits(['closeModel'])
const props = withDefaults(defineProps<Props>(), { toggleModel: false })

const workspaceLink = ref<string>('https://vuetaskmanager.na')
const isLinkCopied = ref(false)
const copieLink = () => {
  navigator.clipboard.writeText(workspaceLink.value)
  isLinkCopied.value = true
}

const closeModel = () => {
  isLinkCopied.value = false
  emit('closeModel')
}
</script>
