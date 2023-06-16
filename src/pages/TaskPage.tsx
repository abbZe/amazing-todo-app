import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTasks } from '../redux/tasks/selectors'
import { TaskValue } from '../components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { editTask, setEditorValueSimiliarToTaskBody, updateInputTaskBodyValue } from '../redux/tasks'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import CustomEditor from 'ckeditor5-custom-build'
import { useState } from 'react'
import { Button, Paper } from '@mui/material'

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
        <TaskValue id={id} tasks={tasks} />
        <Button variant="outlined" onClick={() => setIsHide(!isHide)}>EDIT TASK</Button>
        {isHide ? null : (
          <InputForm onSubmit={submitEditTaskHandler}>
            <CKEditor
              editor={CustomEditor}
              data={inputTaskBodyValue}
              onChange={taskBodyInputHandler}
              onReady={() => editorDefaultValueHandler(id)}
            />

            <ApplyChangesBtn type="submit">ПРИМЕНИТЬ ИЗМЕНЕНИЯ</ApplyChangesBtn>
          </InputForm>
        )}
      </Paper>
    )
  } else {
    return <div>"Loading..."</div>
  }
}

const InputForm = styled.form`
  /* Box model */
  display: flex;
  gap: 1rem;
`
const ApplyChangesBtn = styled.button``
