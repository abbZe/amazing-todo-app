import { Alert, Box, Typography } from '@mui/material'
import { TaskBody } from '..'
import { TTasksObj } from '../../redux/tasks'
import { v4 } from 'uuid'
import { memo } from 'react'

type TaskValueProps = {
  id: string
  tasks: Array<TTasksObj>
  themeMode: string
}

export const TaskValue: React.FC<TaskValueProps> = memo(({ id, tasks, themeMode }) => {
  const alertBg = () => themeMode === 'dark' ? '#121212' : '#fdf6e3'
  const alertText = () => themeMode === 'dark' ? '#fff' : '#657b83'

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
              <Alert sx={{ marginBlock: '1rem', backgroundColor: `${alertBg()}`, color: `${alertText()}` }} severity="info">Описания нет, самое время добавить</Alert>
            )}
          </Box>
        ) : null
      )}
    </>
  )
})
