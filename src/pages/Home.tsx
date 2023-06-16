import React from 'react'
import { Stack } from '@mui/material'
import { Tasks } from '../containers/index.ts'

export const Home: React.FC = () => (
  <Stack spacing={6} justifyContent="flex-start">
    <Tasks />
  </Stack>
)
