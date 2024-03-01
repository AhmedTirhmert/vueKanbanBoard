<template>
  <div
    class="rounded-full px-2 py-1.5 text-base font-medium outline-dashed outline-1 w-fit"
    :class="{ 'bg-orange-400 outline-none': props.userName }"
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
