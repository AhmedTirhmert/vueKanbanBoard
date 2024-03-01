import { defineStore } from 'pinia'
import { resolveStatus } from '@/utils/formatters'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
    displayedTasks: [] as Task[],
    statuses: [] as string[]
  }),

  getters: {
    getAllTasks: (state) => {
      return state.displayedTasks
    },
    getStatuses: (state) => {
      return state.statuses
    },
    getTasksByStatus: (state) => (status: string) => {
      return state.displayedTasks.filter((elem: Task) => elem.status === status)
    },
    getDefaultStatus: (state) => {
      return state.statuses[0]
    },
    getTaskById: (state) => (taskId: string) => {
      return state.tasks.filter((task: Task) => task.id === taskId)[0]
    }
  },

  actions: {
    initStatuses(statuses: string[]) {
      this.statuses = statuses
    },

    updateTask(taskId: string, task: Task) {
      const taskIndex = this.tasks.findIndex((task: Task) => task.id === taskId)
      this.tasks[taskIndex] = task
      this.setDisplayedTasks()
    },
    deleteTask(taskId: string) {
      const taskIndex = this.tasks.findIndex((task: Task) => task.id === taskId)
      this.tasks.splice(taskIndex, 1)
      this.setDisplayedTasks()
    },

    setDisplayedTasks() {
      this.displayedTasks = [...this.tasks]
    },
    renameColumn(columnName: string, columnIndex: number) {
      this.updateTasksStatusByColumn(
        resolveStatus(this.statuses[columnIndex]),
        resolveStatus(columnName)
      )
      this.statuses[columnIndex] = columnName
    },

    updateTasksStatusByColumn(oldStatus: string, newStatus: string) {
      this.tasks.forEach(
        (task: Task) => (task.status = task.status === oldStatus ? newStatus : task.status)
      )
      this.setDisplayedTasks()
    },
    deleteColumn(columnIndex: number) {
      const deletedStatus = this.statuses.splice(columnIndex, 1)[0]
      this.deleteTasksByStatus(resolveStatus(deletedStatus))
    },

    deleteTasksByStatus(status: string) {
      this.tasks = this.tasks.filter((task: Task) => task.status !== status)
      this.setDisplayedTasks()
    },

    createTask(task: Task) {
      const taskId = crypto.randomUUID()
      this.tasks.push({ id: taskId, ...task })
      this.displayedTasks.push({ id: taskId, ...task })
    },
    filterTasksByPriority(priority: string) {
      priority === 'all'
        ? this.setDisplayedTasks()
        : (this.displayedTasks = this.tasks.filter((task: Task) => task.priority === priority))
    },
    updateTaskPriority(taskId: string, priority: string) {
      this.tasks[this.tasks.findIndex((task: Task) => task.id === taskId)].priority = priority
      this.displayedTasks[
        this.displayedTasks.findIndex((task: Task) => task.id === taskId)
      ].priority = priority
    },
    updateTaskStatus(taskId: string, status: string) {
      this.tasks[this.tasks.findIndex((task: Task) => task.id === taskId)].status = status
      this.displayedTasks[
        this.displayedTasks.findIndex((task: Task) => task.id === taskId)
      ].status = status
    }
  }
})

export interface Task {
  id?: string
  title: string
  description: string
  assignTo: string
  priority: string
  dueDate: string
  status: string
  createdAt: string
}
