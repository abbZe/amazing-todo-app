import { Alert } from '@mui/material'
import React from 'react'
import { TasksPlaceholderCanvas } from '..'

type TasksPlaceholderProps = {
  themeMode: 'light' | 'dark'
}

export const TasksPlaceholder: React.FC<TasksPlaceholderProps> = ({ themeMode }) => {
  const alertBg = () => themeMode === 'dark' ? '#121212' : '#fdf6e3'
  const alertText = () => themeMode === 'dark' ? '#fff' : '#657b83'

  return (
    <>
      {location.pathname === '/favorite' ? (
        <Alert sx={{ backgroundColor: `${alertBg()}`, color: `${alertText()}` }} severity="info">
          Пусто, самое время добавить что-нибудь в избранное
        </Alert>
      ) : (
        <Alert sx={{ backgroundColor: `${alertBg()}`, color: `${alertText()}` }} severity="info">
          Время создать заметку
        </Alert>
      )}
      <TasksPlaceholderCanvas themeMode={themeMode} />
    </>
  )
}
