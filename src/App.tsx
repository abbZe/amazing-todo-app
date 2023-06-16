import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'

import MainLayout from './layouts/MainLayout.tsx'
import { Favorite, Home, NotFound, TaskPage } from './pages'

const App: React.FC = () => (
  <Box sx={{ p: '1rem', height: '100%' }}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="task/:id" element={<TaskPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Box>
)

export default App
