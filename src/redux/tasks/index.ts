import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum Priority {
  'low' = 'низкий',
  'medium' = 'средний',
  'high' = 'высокий',
}
export type TTasksObj = {
  task: string
  priority: string
  tags: Array<string>
}
export type TInitialState = {
  tasks: Array<TTasksObj>
  favoriteTasks: Array<TTasksObj>
  inputTaskValue: string
  inputAddTagValue: string
}

const initialState: TInitialState = {
  tasks: [],
  favoriteTasks: [],
  inputTaskValue: '',
  inputAddTagValue: '',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TTasksObj>) {
      const tasks = state.tasks
      const valueFromTaskInput = action.payload

      tasks.push(valueFromTaskInput)
    },
    removeTask(state, action: PayloadAction<number>) {
      const tasks = state.tasks
      const indexOfTaskToRemove = action.payload

      tasks.splice(indexOfTaskToRemove, 1)
    },
    addTaskToFavorite(state, action: PayloadAction<number>) {
      const favTasks = state.favoriteTasks
      const tasks = state.tasks
      const indexOfTaskToAdd = action.payload

      favTasks.push(tasks[indexOfTaskToAdd])
      tasks.splice(indexOfTaskToAdd, 1)
    },
    removeTaskFromFavorite(state, action: PayloadAction<number>) {
      const indexOfTaskToRemove = action.payload
      const favTasks = state.favoriteTasks

      favTasks.splice(indexOfTaskToRemove, 1)
    },
    moveTaskFromFavToTasks(state, action: PayloadAction<number>) {
      const indexOfTaskToMove = action.payload
      const favTasks = state.favoriteTasks
      const tasks = state.tasks
      const taskToMove: TTasksObj = favTasks[indexOfTaskToMove]

      tasks.push(taskToMove)
      favTasks.splice(indexOfTaskToMove, 1)
    },
    updateInputTaskValue(state, action: PayloadAction<string>) {
      const valueFromTaskInput = action.payload

      state.inputTaskValue = valueFromTaskInput
    },
    addPriority(state, action) {
      const { priorityValue, taskIndex } = action.payload
      const tasks = state.tasks

      switch (priorityValue) {
        case 'low':
          tasks[taskIndex].priority = Priority.low
          break
        case 'medium':
          tasks[taskIndex].priority = Priority.medium
          break
        case 'high':
          tasks[taskIndex].priority = Priority.high
          break
      }
    },
    addPriorityFavorite(state, action) {
      const { priorityValue, taskIndex } = action.payload
      const favTasks = state.favoriteTasks

      switch (priorityValue) {
        case 'low':
          favTasks[taskIndex].priority = Priority.low
          break
        case 'medium':
          favTasks[taskIndex].priority = Priority.medium
          break
        case 'high':
          favTasks[taskIndex].priority = Priority.high
          break
      }
    },
    updateAddTagInputValue(state, action) {
      const inputAddTagVal = action.payload

      state.inputAddTagValue = inputAddTagVal

    },
    addTagToTask(state, action) {
      const { inputAddTagValue, indexOfTask } = action.payload
      const { tags } = state.tasks[indexOfTask]

      tags.push(inputAddTagValue)
    },
    addTagToFavTask(state, action) {
      const { inputAddTagValue, indexOfTask } = action.payload
      const { tags } = state.favoriteTasks[indexOfTask]

      tags.push(inputAddTagValue)
    },
  },
})

export default tasksSlice.reducer
export const {
  addTask,
  removeTask,
  addTaskToFavorite,
  removeTaskFromFavorite,
  moveTaskFromFavToTasks,
  updateInputTaskValue,
  addPriority,
  addPriorityFavorite,
  updateAddTagInputValue,
  addTagToTask,
  addTagToFavTask,
} = tasksSlice.actions
