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
  dateOfCreate: string
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
      const today = new Date()

      const year = today.getFullYear()
      const month = today.getMonth() + 1 // January gives 0, so +1 ;)
      const day = today.getDate()
      const hours = Number.parseInt(Number(today.getHours()).toFixed(2))
      const minutes = Number.parseInt(Number(today.getMinutes()).toFixed(2))
      const seconds = Number.parseInt(Number(today.getSeconds()).toFixed(2))

      const date = `${day}/${month}/${year} ${hours}ч:${minutes}м:${seconds}с`

      taskObj.taskTitleValue = state.inputTaskTitleValue
      taskObj.taskBodyValue = state.inputTaskBodyValue
      taskObj.dateOfCreate = date

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

      if (state.searchTagResults.length > 0) {
        state.searchTagResults = []
      } else {
        state.searchTagResults = []

        tasks.map(task => (task.tags.find(tag => tag === tagFromHandler) ? state.searchTagResults.push(task) : null))

        // Maybe i shoud stay with IF ELSE...
        //tasks.map(task => {
        //if (task.tags.find(tag => tag === tagFromHandler)) {
        //state.searchTagResults.push(task)
        //}
        //})
      }
    },
    editTask(state, action) {
      const idOfTask = action.payload

      state.tasks.map(task => {
        if (task.id === idOfTask) {
          task.taskBodyValue = state.inputTaskBodyValue
        }
      })
    },
    setEditorValueSimiliarToTaskBody(state, action) {
      const idOfTask = action.payload

      state.tasks.map(task => {
        if (task.id === idOfTask) {
          state.inputTaskBodyValue = task.taskBodyValue
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
  editTask,
  setEditorValueSimiliarToTaskBody,
  updateTasksOrder,
  updateSearchInputValue,
  updateInputTaskTitleValue,
  updateInputTaskBodyValue,
  updateAddTagInputValue,
  updateSearchTagResults,
} = tasksSlice.actions
