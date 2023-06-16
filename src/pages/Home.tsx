import React from 'react'
import { Stack } from '@mui/material'
import { AddTaskForm, Tasks } from '../containers/index.ts'

export const Home: React.FC = () => (
  <Stack spacing={6} justifyContent="flex-start">
    <AddTaskForm />
    <Tasks />
  </Stack>
)
