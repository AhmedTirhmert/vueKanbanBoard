<template>
  <div
    class="rounded-full flex items-center justify-center min-w-7 min-h-7 text-sm font-medium outline-1"
    :class="{
      'bg-orange-400  outline-orange-400 outline': props.userName,
      'outline-dashed': !props.userName
    }"
  >
    <span v-if="props.userName">{{ userNameAbr }}</span>
    <PersonIcon class="" v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PersonIcon from '../icones/personIcon.vue'

interface Props {
  userName?: string
}

const props = defineProps<Props>()

const userNameAbr = computed(() => {
  return props.userName
    ?.split(' ')
    .map((elem: string) => elem.charAt(0).toUpperCase())
    .join('')
})
</script>

<style scoped></style>
