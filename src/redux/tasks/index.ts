import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum Priority {
  'low' = 'низкий',
  'medium' = 'средний',
  'high' = 'высокий',
}
export type TTasksObj = {
  id: string
  taskTitleValue: string
  taskBodyValue: string
  priority: string
  tags: Array<string>
  isFavorite: boolean
}
export type TInitialState = {
  tasks: Array<TTasksObj>
  searchResults: Array<TTasksObj>
  searchTagResults: Array<TTasksObj>
  inputTaskTitleValue: string
  inputTaskBodyValue: string
  inputAddTagValue: string
  inputSearchValue: string
}

const initialState: TInitialState = {
  tasks: [],
  searchResults: [],
  searchTagResults: [],
  inputTaskTitleValue: '',
  inputTaskBodyValue: '',
  inputAddTagValue: '',
  inputSearchValue: '',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TTasksObj>) {
      const taskObj = action.payload

      taskObj.taskTitleValue = state.inputTaskTitleValue
      taskObj.taskBodyValue = state.inputTaskBodyValue

      let { tasks } = state

      tasks.push(taskObj)
    },
    removeTask(state, action: PayloadAction<number>) {
      const { tasks } = state
      const indexOfTaskToRemove = action.payload

      tasks.splice(indexOfTaskToRemove, 1)
    },
    updateInputTaskTitleValue(state, action: PayloadAction<string>) {
      const valueFromTaskTitleInput = action.payload

      state.inputTaskTitleValue = valueFromTaskTitleInput
    },
    updateInputTaskBodyValue(state, action: PayloadAction<string>) {
      const valueFromTaskBodyInput = action.payload

      state.inputTaskBodyValue = valueFromTaskBodyInput
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
      const normalizedTagValue = inputAddTagValue.trim().toLowerCase()

      tags.push(normalizedTagValue)
    },
    updateTasksOrder(state, action) {
      state.tasks = action.payload
    },
    updateSearchInputValue(state, action) {
      state.inputSearchValue = action.payload
      if (state.inputSearchValue) {
        state.searchResults = state.tasks.filter(task =>
          task.taskTitleValue.toLowerCase().match(state.inputSearchValue.toLowerCase())
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
    updateSearchTagResults(state, action) {
      const { tasks } = state
      const tagFromHandler = action.payload

      state.searchTagResults = []

      tasks.map(task => {
        if (task.tags.find(tag => tag === tagFromHandler)) {
          state.searchTagResults.push(task)
        }
      })
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
  updateInputTaskTitleValue,
  updateInputTaskBodyValue,
  updateAddTagInputValue,
  updateSearchTagResults,
} = tasksSlice.actions
