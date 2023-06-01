import { TaskBody, TaskTitle } from '..'
import { TTasksObj } from '../../redux/tasks'
import { v4 } from 'uuid'

type TaskValueProps = {
  id: string
  tasks: Array<TTasksObj>
}

export const TaskValue: React.FC<TaskValueProps> = ({ id, tasks }) => {
  return (
    <>
      {tasks.map((task: TTasksObj) =>
        task.id === id ? (
          <div key={v4()}>
            <TaskTitle title={task.taskTitleValue} />
            <TaskBody body={task.taskBodyValue} />
          </div>
        ) : null
      )}
    </>
  )
}
