import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context'
import { Navigate, Outlet } from 'react-router-dom'
import useGetData from '../../hooks/useGetData'
import Sidebar from './Sidebar'
import Main from './Main'

const Home = () => {
  const { globalTheme } = useContext(UserContext)

  if (localStorage.getItem('uid') === null) {
    return <Navigate replace to="/entrar" />
  }

  return (
    <div className={`${globalTheme}`}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Home
