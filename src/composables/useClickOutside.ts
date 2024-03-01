import { onMounted } from 'vue'

export default function useClickOutside(
  component: any,
  callback: Function,
  excludedComponent: any = null
) {
  excludedComponent === null ? (excludedComponent = component) : null
  const listener = (event: Event) => {
    if (
      event.target === component.value ||
      event.composedPath().includes(component.value) ||
      event.target === excludedComponent.value ||
      event.composedPath().includes(excludedComponent.value)
    ) {
      return
    }
    callback()
  }

  onMounted(() => {
    window.addEventListener('click', listener)
  })
}
