import { useParams, Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTasks } from '../redux/tasks/selectors'
import { TaskValue } from '../components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { editTask, setEditorValueSimiliarToTaskBody, updateInputTaskBodyValue } from '../redux/tasks'
import { useDispatch } from 'react-redux'
import CustomEditor from 'ckeditor5-custom-build'
import { useState } from 'react'
import { Box, Button, FormControl, FormGroup, Link, Stack, Typography } from '@mui/material'

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
      <Box sx={{ p: '1rem', height: '100vh' }}>
        <Stack spacing={1}>
          <TaskValue id={id} tasks={tasks} />
          <Button variant="contained" size='large' color={isHide ? 'primary' : 'secondary'} onClick={() => setIsHide(!isHide)}>
            Редактировать
          </Button>
          <Link component={RouterLink} to="/" >
            <Button variant="outlined" size='large' sx={{ width: "100%" }}>
              Назад
            </Button>
          </Link>
        </Stack>

        <Stack>
          {isHide ? null : (
            <FormGroup sx={{ marginBlock: '2rem' }}>
              <Typography component="h2" variant="h4" sx={{ marginBlock: '1rem' }}>
                Отредактировать заметку
              </Typography>
              <FormControl component="form" onSubmit={submitEditTaskHandler} sx={{ gap: 2, width: '100%' }}>
                <CKEditor
                  editor={CustomEditor}
                  data={inputTaskBodyValue}
                  onChange={taskBodyInputHandler}
                  onReady={() => editorDefaultValueHandler(id)}
                />

                <Button type="submit" size='large' variant="outlined">
                  Применить изменения
                </Button>
              </FormControl>
            </FormGroup>
          )}
        </Stack>
      </Box>
    )
  } else {
    return <div>"Loading..."</div>
  }
}
