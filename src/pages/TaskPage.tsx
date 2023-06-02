import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTasks } from '../redux/tasks/selectors'
import { TaskValue } from '../components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { editTask, setEditorValueSimiliarToTaskBody, updateInputTaskBodyValue } from '../redux/tasks'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import CustomEditor from 'ckeditor5-custom-build'
import { useState } from 'react'

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
      <>
        <TaskValue id={id} tasks={tasks} />
        <EditTaskBtn onClick={() => setIsHide(!isHide)}>EDIT TASK</EditTaskBtn>
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
        <Link to="/">Назад</Link> </>
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
const EditTaskBtn = styled.button``
