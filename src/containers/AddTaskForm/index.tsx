import { CKEditor } from '@ckeditor/ckeditor5-react'
import AddIcon from '@mui/icons-material/Add'
import { Button, FormControl, FormControlLabel, FormGroup, Paper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectTasks } from '../../redux/tasks/selectors'
import { v4 } from 'uuid'
import CustomEditor from 'ckeditor5-custom-build'
import { TTasksObj, addTask, updateInputTaskBodyValue, updateInputTaskTitleValue } from '../../redux/tasks'

export const AddTaskForm = () => {
  const { inputTaskTitleValue, inputTaskBodyValue } = useSelector(selectTasks)
  const dispatch = useDispatch()

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

  return (
    <Paper elevation={1} sx={{ p: "1rem" }}>
      <FormGroup>
        <Typography component="h1" variant="h4">Создать заметку</Typography>
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
    </Paper>
  )
}
