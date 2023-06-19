import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box, createTheme, Paper, ThemeProvider } from '@mui/material'

import MainLayout from './layouts/MainLayout.tsx'
import { Favorite, Home, NotFound, TaskPage } from './pages'
import { selectTasks } from './redux/tasks/selectors.ts'
import { useSelector } from 'react-redux'
import './App.css'

const App: React.FC = () => {
  const { themeMode } = useSelector(selectTasks)

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: '#bb86fc',
            light: '#ee69af',
            dark: '#9b3cb9',
            contrastText: '#fff',
          },
          secondary: {
            main: '#03dac6',
            light: '#78ffd6',
            dark: '#00a896',
            contrastText: '#000',
          },
          background: {
            paper: themeMode === 'light' ? '#fafafa' : '#121212',
            default: themeMode === 'light' ? '#fff' : '#1c1c1c',
          },
          text: {
            primary: themeMode === 'light' ? '#000' : '#fff',
            secondary: themeMode === 'light' ? '#656565' : '#a5a5a5',
          },
        },
        typography: {
          fontFamily: 'Roboto',
        },
      }),
    [themeMode]
  )

  return (
    <ThemeProvider theme={theme}>
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
