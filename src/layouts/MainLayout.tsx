import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../containers'

const MainLayout: React.FC = () => (
  <>
    <Outlet />
    <Footer />
  </>
)

export default MainLayout
