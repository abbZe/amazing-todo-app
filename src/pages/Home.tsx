import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTasks } from '../redux/tasks/selectors.ts'
import {
  TTasksObj,
  addTask,
  updateInputTaskBodyValue,
  updateInputTaskTitleValue,
  updateSearchInputValue,
} from '../redux/tasks'
import { Tasks } from '../containers'
import { v4 } from 'uuid'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import CustomEditor from 'ckeditor5-custom-build'
import { Button, FormControl, FormGroup, InputAdornment, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { inputTaskTitleValue, inputTaskBodyValue, inputSearchValue } = useSelector(selectTasks)

  const taskTitleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    dispatch(updateInputTaskTitleValue(inputValue))
  }
  const taskBodyInputHandler = (_: any, editor: CustomEditor) => {
    const data = editor.getData()

    dispatch(updateInputTaskBodyValue(data))
  }
  const createTaskHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    const taskObj: TTasksObj = {
      id: v4(),
      taskTitleValue: '',
      taskBodyValue: '',
      priority: '',
      tags: [],
      isFavorite: false,
      dateOfCreate: '',
    }

    if (inputTaskTitleValue) {
      dispatch(addTask(taskObj))

      dispatch(updateInputTaskTitleValue(''))
      dispatch(updateInputTaskBodyValue(''))
    } else alert('task title is empty')
  }
  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = event.target.value

    dispatch(updateSearchInputValue(searchInputValue))
  }

  return (
    <Stack spacing={6} justifyContent="flex-start">
      <TextField
        sx={{ width: '100' }}
        type="search"
        label={inputSearchValue ? null : 'ищем...'}
        value={inputSearchValue}
        onChange={searchInputHandler}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <FormGroup>
        <FormControl component="form" onSubmit={createTaskHandler} sx={{ gap: 2, width: '100%' }}>
          <TextField
            type="search"
            value={inputTaskTitleValue}
            onChange={taskTitleInputHandler}
            required
            autoFocus
            label="заголовок"
          />

          <CKEditor editor={CustomEditor} data={inputTaskBodyValue} onChange={taskBodyInputHandler} />

          <Button variant="contained" type="submit" size="medium" startIcon={<AddIcon />} />
        </FormControl>
      </FormGroup>

      <Tasks />
    </Stack>
  )
}
