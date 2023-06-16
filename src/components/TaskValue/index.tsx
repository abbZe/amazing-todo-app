import { Paper, Typography } from '@mui/material'
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
            <Paper elevation={2} sx={{ p: '1rem', marginBlock: '1rem' }}>
              {task.taskBodyValue ? <TaskBody body={task.taskBodyValue} /> : <Typography>Описания нет</Typography>}
            </Paper>
          </div>
        ) : null
      )}
    </>
  )
}
