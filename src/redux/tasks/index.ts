import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TInitialState = {
  tasks: Array<string>
  favoriteTasks: Array<string>
  inputTaskValue: string
}

const initialState: TInitialState = {
  tasks: [],
  favoriteTasks: [],
  inputTaskValue: '',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
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
      const taskToMove = favTasks[indexOfTaskToMove]

      tasks.push(taskToMove)
      favTasks.splice(indexOfTaskToMove, 1)
    },
    updateInputTaskValue(state, action: PayloadAction<string>) {
      const valueFromTaskInput = action.payload

      state.inputTaskValue = valueFromTaskInput
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
} = tasksSlice.actions
