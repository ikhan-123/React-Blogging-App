import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navBar'

const Layout = () => {
  return (
    <>
    {/* <Navbar /> */}
    <Outlet />
    </>
  )
}

export default Layout