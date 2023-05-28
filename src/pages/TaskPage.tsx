import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTasks } from '../redux/tasks/selectors'
import { TaskValue } from '../components'

export const TaskPage: React.FC = () => {
  const { id } = useParams()
  const { tasks } = useSelector(selectTasks)

  return (
    <>
      <TaskValue id={id} tasks={tasks} />
      <Link to="/">Назад</Link>
    </>
  )
}
