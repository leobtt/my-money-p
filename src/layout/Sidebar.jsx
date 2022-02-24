import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../context'

const Sidebar = () => {
  const { user } = useContext(UserContext)

  return (
    <div>
      Sidebar
      <Outlet />
    </div>
  )
}

export default Sidebar
