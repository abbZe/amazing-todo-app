import { Alert, Box, Typography } from '@mui/material'
import { TaskBody } from '..'
import { TTasksObj } from '../../redux/tasks'
import { v4 } from 'uuid'
import { memo } from 'react'

type TaskValueProps = {
  id: string
  tasks: Array<TTasksObj>
}

export const TaskValue: React.FC<TaskValueProps> = memo(({ id, tasks }) => {
  return (
    <>
      {tasks.map((task: TTasksObj) =>
        task.id === id ? (
          <Box key={v4()}>

            <Typography sx={{ textAlign: 'center', position: 'sticky', top: '0' }} variant="h4">
              {task.taskTitleValue}
            </Typography>

            {task.taskBodyValue ? (
              <TaskBody body={task.taskBodyValue} />
            ) : (
              <Alert sx={{ marginBlock: '1rem' }} severity="info">Описания нет, самое время добавить</Alert>
            )}
          </Box>
        ) : null
      )}
    </>
  )
})
