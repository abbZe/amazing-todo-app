import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTasks } from '../redux/tasks/selectors'
import { TaskValue } from '../components'
import styled from 'styled-components'

export const TaskPage: React.FC = () => {
  const { id } = useParams()
  const { tasks } = useSelector(selectTasks)

  if (id) {
    return (
      <>
        <TaskValue id={id} tasks={tasks} />
        <Link to="/">Назад</Link>
      </>
    )
  } else {
    return <div>"Loading..."</div>
  }
}

