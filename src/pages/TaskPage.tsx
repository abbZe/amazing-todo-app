import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTasks } from '../redux/tasks/selectors'
import { TaskValue } from '../components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { editTask, setEditorValueSimiliarToTaskBody, updateInputTaskBodyValue } from '../redux/tasks'
import { useDispatch } from 'react-redux'
import CustomEditor from 'ckeditor5-custom-build'
import { useState } from 'react'
import { Button, FormControl, FormGroup, Paper, Stack, Typography } from '@mui/material'

export const TaskPage: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { tasks, inputTaskBodyValue } = useSelector(selectTasks)
  const [isHide, setIsHide] = useState(true)

  const taskBodyInputHandler = (_: any, editor: CustomEditor) => {
    const data = editor.getData()

    dispatch(updateInputTaskBodyValue(data))
  }
  const submitEditTaskHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(editTask(id))
    dispatch(updateInputTaskBodyValue(''))
    setIsHide(!isHide)
  }
  const editorDefaultValueHandler = (id: string) => {
    dispatch(setEditorValueSimiliarToTaskBody(id))
  }

  if (id) {
    return (
      <Paper elevation={1} sx={{ p: '1rem' }}>
        <Stack>
          <TaskValue id={id} tasks={tasks} />
          <Button variant="outlined" color={isHide ? "primary" : "secondary"} onClick={() => setIsHide(!isHide)} >Редактировать</Button>
        </Stack>

        <Stack>
          {isHide ? null : (
            <FormGroup>
              <Typography component="h2" variant="h4">Отредактировать заметку</Typography>
              <FormControl component="form" onSubmit={submitEditTaskHandler} sx={{ gap: 2, width: '100%' }}>
                <CKEditor
                  editor={CustomEditor}
                  data={inputTaskBodyValue}
                  onChange={taskBodyInputHandler}
                  onReady={() => editorDefaultValueHandler(id)}
                />

                <Button type="submit" variant="outlined">ПРИМЕНИТЬ ИЗМЕНЕНИЯ</Button>
              </FormControl>
            </FormGroup>
          )}
        </Stack>
      </Paper>
    )
  } else {
    return <div>"Loading..."</div>
  }
}
