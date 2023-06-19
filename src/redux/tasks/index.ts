import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum Priority {
  'low' = 'низкий',
  'medium' = 'средний',
  'high' = 'высокий',
  'none' = 'нет',
}

export type TTagsObj = {
  id: string
  tagValue: string
}

export type TTasksObj = {
  id: string
  taskTitleValue: string
  taskBodyValue: string
  priority: string
  tags: Array<TTagsObj>
  isFavorite: boolean
  dateOfCreate: string
}

export type TInitialState = {
  themeMode: 'light' | 'dark'
  tasks: Array<TTasksObj>
  searchResults: Array<TTasksObj>
  searchTagResults: Array<TTasksObj>
  searchTagValue: string
  isSearchShows: boolean
  isAddNoteShows: boolean
  inputTaskTitleValue: string
  inputTaskBodyValue: string
  inputAddTagValue: string
  inputSearchValue: string
}

const initialState: TInitialState = {
  themeMode: 'dark',
  tasks: [],
  searchResults: [],
  searchTagResults: [],
  searchTagValue: '',
  isSearchShows: false,
  isAddNoteShows: false,
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

      const { tasks } = state

      tasks.push(taskObj)
    },
    removeTask(state, action: PayloadAction<string>) {
      const { tasks } = state
      const idOfTaskToRemove = action.payload

      state.tasks.map((task, index) => {
        if (task.id === idOfTaskToRemove) {
          tasks.splice(index, 1)
        }
      })
    },
    updateInputTaskTitleValue(state, action: PayloadAction<string>) {
      const valueFromTaskTitleInput = action.payload

      state.inputTaskTitleValue = valueFromTaskTitleInput
    },
    updateInputTaskBodyValue(state, action: PayloadAction<string>) {
      const valueFromTaskBodyInput = action.payload

      state.inputTaskBodyValue = valueFromTaskBodyInput
    },
    selectPriority(state, action) {
      const { priorityValue, taskId } = action.payload

      state.tasks.map(task => {
        if (task.id === taskId) {
          switch (priorityValue) {
            case 'none':
              task.priority = ''
              break
            case 'low':
              task.priority = Priority.low
              break
            case 'medium':
              task.priority = Priority.medium
              break
            case 'high':
              task.priority = Priority.high
              break
          }
        }
      })
    },
    updateAddTagInputValue(state, action) {
      const inputAddTagVal = action.payload

      state.inputAddTagValue = inputAddTagVal
    },
    addTagToTask(state, action) {
      const { tagObj, taskId } = action.payload

      state.tasks.map(task => {
        if (task.id === taskId) {
          if (!task.tags.find(tag => tag.tagValue === tagObj.tagValue)) {
            task.tags.push(tagObj)
          }
        }
      })
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
    toggleFav(state, action) {
      const taskId = action.payload

      state.tasks.map(task => {
        if (task.id === taskId) {
          task.isFavorite = !task.isFavorite
        }
      })
    },
    updateSearchTagResults(state, action) {
      const { tasks } = state
      const tagValue = action.payload

      if (state.searchTagResults.length > 0) {
        state.searchTagResults = []
      } else {
        state.searchTagResults = []

        tasks.map(task =>
          task.tags.find(tag => {
            tag.tagValue === tagValue ? state.searchTagResults.push(task) : null
          })
        )
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
    removeTag(state, action) {
      const { taskId, tagId } = action.payload

      state.tasks.map(task => {
        if (taskId === task.id) {
          const index = task.tags.findIndex(tag => tag.id === tagId)
          task.tags.splice(index, 1)
        }
      })
    },
    toggleSearch(state, action) {
      state.isSearchShows = action.payload
    },
    toggleAddNote(state, action) {
      state.isAddNoteShows = action.payload
    },
    updateThemeMode(state) {
      state.themeMode === 'dark' ? (state.themeMode = 'light') : (state.themeMode = 'dark')
    },
    updateSearchTagValue(state, action) {
      state.searchTagValue === action.payload ? (state.searchTagValue = '') : (state.searchTagValue = action.payload)
    },
  },
})

export default tasksSlice.reducer
export const {
  addTask,
  selectPriority,
  addTagToTask,
  removeTask,
  removeTag,
  editTask,
  setEditorValueSimiliarToTaskBody,
  updateTasksOrder,
  updateSearchInputValue,
  updateInputTaskTitleValue,
  updateInputTaskBodyValue,
  updateAddTagInputValue,
  updateSearchTagResults,
  updateThemeMode,
  updateSearchTagValue,
  toggleSearch,
  toggleFav,
  toggleAddNote,
} = tasksSlice.actions
