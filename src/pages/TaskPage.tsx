import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTasks } from '../redux/tasks/selectors'
import { TaskValue } from '../components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { editTask, updateInputTaskBodyValue } from '../redux/tasks'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import CustomEditor from 'ckeditor5-custom-build'

export const TaskPage: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { tasks, inputTaskBodyValue } = useSelector(selectTasks)

  const taskBodyInputHandler = (_: any, editor: CustomEditor) => {
    const data = editor.getData()

    dispatch(updateInputTaskBodyValue(data))
  }
  const editTaskHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(editTask(id))
    dispatch(updateInputTaskBodyValue(''))
  }

  if (id) {
    return (
      <>
        <TaskValue id={id} tasks={tasks} />

        <InputForm onSubmit={editTaskHandler}>
          <CKEditor editor={CustomEditor} data={inputTaskBodyValue} onChange={taskBodyInputHandler} />

          <AddTaskBtn type="submit">ПРИМЕНИТЬ ИЗМЕНЕНИЯ</AddTaskBtn>
        </InputForm>
        <Link to="/">Назад</Link>
      </>
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
const AddTaskBtn = styled.button``
