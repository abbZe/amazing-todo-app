import { TaskBody, TaskTitle } from '..'
import { TTasksObj } from '../../redux/tasks'

type TaskValueProps = {
  id: string
  tasks: Array<TTasksObj>
}

export const TaskValue: React.FC<TaskValueProps> = ({ id, tasks }) => {
  return (
    <>
      {tasks.map((task: TTasksObj) =>
        task.id === id ? (
          <>
            <TaskTitle title={task.taskTitleValue} />
            <TaskBody body={task.taskBodyValue} />
          </>
        ) : null
      )}
    </>
  )
}
