import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context'
import { Navigate, Outlet } from 'react-router-dom'
import useGetData from '../../hooks/useGetData'
import Sidebar from './Sidebar'
import Main from './Main'

const Home = () => {
  const { user, globalTheme } = useContext(UserContext)
  const data = useGetData('')

  /*  if (!user || user.length <= 1) {
    return <Navigate replace to="/entrar" />
  } */

  return (
    <div className={`${globalTheme}`}>
      <Sidebar />
      <Outlet />
      {/* {user && <pre>{JSON.stringify(user.uid, null, 3)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 3)}</pre>} */}
    </div>
  )
}

export default Home
