import { Alert, Box, Paper, Typography } from '@mui/material'
import { TaskBody } from '..'
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
          <Box key={v4()}>

            <Typography sx={{ textAlign: 'center', position: 'sticky', top: '0' }} variant="h4">
              {task.taskTitleValue}
            </Typography>

            <Paper elevation={2} sx={{ p: '1rem', marginBlock: '1rem' }}>
              {task.taskBodyValue ? (
                <TaskBody body={task.taskBodyValue} />
              ) : (
                <Alert severity="info">Описания нет, самое время добавить</Alert>
              )}
            </Paper>

          </Box>
        ) : null
      )}
    </>
  )
}
