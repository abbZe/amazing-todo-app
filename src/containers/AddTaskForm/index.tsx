import { CKEditor } from '@ckeditor/ckeditor5-react'
import AddIcon from '@mui/icons-material/Add'
import { Button, FormControl, FormGroup, Paper, TextField, Tooltip, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectTasks } from '../../redux/tasks/selectors'
import { v4 } from 'uuid'
import CustomEditor from 'ckeditor5-custom-build'
import { TTasksObj, addTask, toggleAddNote, updateInputTaskBodyValue, updateInputTaskTitleValue } from '../../redux/tasks'
import { AnimatePresence, motion } from 'framer-motion'
import { isSet } from 'util/types'

export const AddTaskForm = () => {
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

      dispatch(updateInputTaskTitleValue(''))
      dispatch(toggleAddNote(!isAddNoteShows))
    } else alert('task title is empty')
  }

  return (
    <AnimatePresence>
      {isAddNoteShows &&
        <motion.div animate={{ y: '-60px' }}>
          <Paper elevation={1} sx={{ p: '1rem' }}>
            <FormGroup>
              <Typography component="h1" variant="h4">
                Создать заметку
              </Typography>
              <FormControl component="form" onSubmit={createTaskHandler} sx={{ gap: 2, width: '100%' }}>
                <TextField
                  type="search"
                  value={inputTaskTitleValue}
                  onChange={taskTitleInputHandler}
                  required
                  label="заголовок"
                />

                <CKEditor editor={CustomEditor} data={inputTaskBodyValue} onChange={taskBodyInputHandler} />

                <Tooltip title="Добавить заметку">
                  <Button color="primary" variant="contained" type="submit" size="medium" startIcon={<AddIcon />} />
                </Tooltip>
              </FormControl>
            </FormGroup>
          </Paper>
        </motion.div>

      }
    </AnimatePresence>
  )
}
