import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Paper } from '@mui/material'
import './App.css'

import MainLayout from './layouts/MainLayout.tsx'
import { Home, NotFound, TaskPage } from './pages'

const App: React.FC = () => (
  <Paper elevation={1} sx={{ p: '2rem', m: '1rem' }}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="task/:id" element={<TaskPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Paper>
)

export default App
