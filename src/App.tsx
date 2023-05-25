import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import MainLayout from './layouts/MainLayout.tsx'
import './App.css'
import { Home } from './pages/Home.tsx'

const App: React.FC = () => (
  <AppWrapper>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  </AppWrapper>
)

export default App

const AppWrapper = styled.div`
  /* Box model */
  display: grid;
  place-content: center;
  padding: 2rem;
  gap: 1rem;

  /* Typography */
  color: #268bd2;
  font-size: 1.4rem;

  /* Visual */
  background-color: #262626;
`
