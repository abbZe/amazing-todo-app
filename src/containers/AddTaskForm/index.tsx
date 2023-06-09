import { CKEditor } from '@ckeditor/ckeditor5-react'
import AddIcon from '@mui/icons-material/Add'
import { Button, FormControl, FormGroup, Modal, Paper, TextField, Tooltip, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectTasks } from '../../redux/tasks/selectors'
import { v4 } from 'uuid'
//@ts-ignore
import CustomEditor from 'ckeditor5-custom-build'
import {
  TTasksObj,
  addTask,
  toggleAddNote,
  updateInputTaskBodyValue,
  updateInputTaskTitleValue,
} from '../../redux/tasks'
import React from 'react'

export const AddTaskForm: React.FC = () => {
  const { inputTaskTitleValue, inputTaskBodyValue, isAddNoteShows } = useSelector(selectTasks)
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
      dispatch(toggleAddNote(false))
      dispatch(updateInputTaskTitleValue(''))
    } else alert('task title is empty')
  }

  return (
    <Modal
      open={isAddNoteShows}
      onClose={() => dispatch(toggleAddNote(false))}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: '1rem',
          width: { xs: '90vw', md: '80vw', xl: '50vw' },
        }}
      >
        <FormGroup>
          <Typography sx={{ marginBlock: '1rem' }} component="h1" variant="h4">
            Создать заметку
          </Typography>
          <FormControl component="form" onSubmit={createTaskHandler} sx={{ gap: 2, width: '100%' }}>
            <TextField
              type="text"
              value={inputTaskTitleValue}
              onChange={taskTitleInputHandler}
              required
              label="заголовок"
              autoFocus
            />

            <CKEditor editor={CustomEditor} data={inputTaskBodyValue} onChange={taskBodyInputHandler} />

            <Tooltip title="Добавить заметку">
              <Button color="primary" variant="contained" type="submit" size="large" startIcon={<AddIcon />} />
            </Tooltip>
          </FormControl>
        </FormGroup>
      </Paper>
    </Modal>
  )
}
