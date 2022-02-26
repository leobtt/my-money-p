import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context'
import { Navigate } from 'react-router-dom'
import useGetData from '../../hooks/useGetData'
import Sidebar from './Sidebar'

const Home = () => {
  const { user } = useContext(UserContext)
  const data = useGetData('')
  const [theme, setTheme] = useState(false)

  if (!user || user.length <= 1) {
    return <Navigate replace to="/entrar" />
  }

  return (
    <div className={`${theme === false ? 'theme-dark' : 'theme-light'}`}>
      <Sidebar />

      {/* {user && <pre>{JSON.stringify(user.uid, null, 3)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 3)}</pre>} */}
    </div>
  )
}

export default Home
