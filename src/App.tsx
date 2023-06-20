import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { createTheme, CssBaseline, Paper, ThemeProvider } from '@mui/material'

import MainLayout from './layouts/MainLayout.tsx'
import { Favorite, Home, NotFound, TaskPage } from './pages'
import { selectTasks } from './redux/tasks/selectors.ts'
import { useSelector } from 'react-redux'

const App: React.FC = () => {
  const { themeMode } = useSelector(selectTasks)

  const theme =
    createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: themeMode === 'light' ? '#2aa198' : '#bb86fc',
          light: '#ee69af',
          dark: themeMode === 'light' ? '#2aa171' : '#bb86fc',
          contrastText: '#fff',
        },
        secondary: {
          main: '#03dac6',
          light: '#78ffd6',
          dark: '#00a896',
          contrastText: '#000',
        },
        background: {
          paper: themeMode === 'light' ? '#fdf6e3' : '#121212',
          default: themeMode === 'light' ? '#fdf6e3' : '#1c1c1c',
        },
        text: {
          primary: themeMode === 'light' ? '#657b83' : '#fff',
          secondary: themeMode === 'light' ? '#91a1a1' : '#a5a5a5',
        },
        info: {
          main: themeMode === 'light' ? '#03dac6' : '#bb86fc',
        }
      },
      typography: {
        fontFamily: 'Roboto',
      },
    })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper sx={{ height: 'auto', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="task/:id" element={<TaskPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Paper>
    </ThemeProvider>
  )
}

export default App
