import React from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNav, Header } from '../containers'

const MainLayout: React.FC = () => (
  <>
    <Header />
    <Outlet />
    <BottomNav />
  </>
)

export default MainLayout
