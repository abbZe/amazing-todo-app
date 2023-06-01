import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTasks } from '../redux/tasks/selectors'
import { TaskValue } from '../components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { updateInputTaskBodyValue } from '../redux/tasks'
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

  if (id) {
    return (
      <>
        <TaskValue id={id} tasks={tasks} />
        <form>
          <CKEditor editor={CustomEditor} data={inputTaskBodyValue} onChange={taskBodyInputHandler} />
          <SubmitBtn>APPLY CHANGES</SubmitBtn>
        </form>
        <Link to="/">Назад</Link>
      </>
    )
  } else {
    return <div>"Loading..."</div>
  }
}

const SubmitBtn = styled.button``
