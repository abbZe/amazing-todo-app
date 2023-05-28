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
            <div>TITLE: {task.taskTitleValue}</div>
            <div>TASK: {task.taskBodyValue} </div>
            <div>TAGS: {task.tags.join(", ")} </div>
          </>
        ) : null
      )}
    </>
  )
}
