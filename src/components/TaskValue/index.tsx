import { TTasksObj } from '../../redux/tasks'

type TaskValueProps = {
  id: string
  tasks: Array<TTasksObj>
}

export const TaskValue: React.FC<TaskValueProps> = ({ id, tasks }) => {

  return (
    <>
      {tasks.map((task: TTasksObj, index: number) => (
        task.id === id ? <div>{task.taskValue}</div> : null
      ))}
    </>
  )
}
