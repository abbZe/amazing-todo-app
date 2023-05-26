import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum Priority {
  'low' = 'низкий',
  'medium' = 'средний',
  'high' = 'высокий',
}
export type TTasksObj = {
  id: string
  taskValue: string
  priority: string
  tags: Array<string>
  isFavorite: boolean
}
export type TInitialState = {
  tasks: Array<TTasksObj>
  searchResults: Array<TTasksObj>
  inputTaskValue: string
  inputAddTagValue: string
  inputSearchValue: string
}

const initialState: TInitialState = {
  tasks: [],
  searchResults: [],
  inputTaskValue: '',
  inputAddTagValue: '',
  inputSearchValue: '',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TTasksObj>) {
      const valueFromTaskInput = action.payload
      let { tasks } = state

      tasks.push(valueFromTaskInput)
    },
    removeTask(state, action: PayloadAction<number>) {
      const { tasks } = state
      const indexOfTaskToRemove = action.payload

      tasks.splice(indexOfTaskToRemove, 1)
    },
    updateInputTaskValue(state, action: PayloadAction<string>) {
      const valueFromTaskInput = action.payload

      state.inputTaskValue = valueFromTaskInput
    },
    addPriority(state, action) {
      const { priorityValue, taskIndex } = action.payload
      const { tasks } = state

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
    updateAddTagInputValue(state, action) {
      const inputAddTagVal = action.payload

      state.inputAddTagValue = inputAddTagVal
    },
    addTagToTask(state, action) {
      const { inputAddTagValue, indexOfTask } = action.payload
      const { tags } = state.tasks[indexOfTask]

      tags.push(inputAddTagValue)
    },
    updateTasksOrder(state, action) {
      state.tasks = action.payload
    },
    updateSearchInputValue(state, action) {
      state.inputSearchValue = action.payload
      if (state.inputSearchValue) {
        state.searchResults = state.tasks.filter(task =>
          task.taskValue.toLowerCase().match(state.inputSearchValue.toLowerCase())
        )
      } else {
        state.searchResults = []
      }
    },
    addTaskToFav(state, action) {
      const indexOfTask = action.payload
      let task = state.tasks[indexOfTask]

      task.isFavorite ? (task.isFavorite = false) : (task.isFavorite = true)
    },
  },
})

export default tasksSlice.reducer
export const {
  addTask,
  addPriority,
  addTagToTask,
  addTaskToFav,
  removeTask,
  updateTasksOrder,
  updateSearchInputValue,
  updateInputTaskValue,
  updateAddTagInputValue,
} = tasksSlice.actions
