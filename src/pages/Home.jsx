import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context'
import { Navigate } from 'react-router-dom'
import useGetData from '../hooks/useGetData'

const Home = () => {
  const { user } = useContext(UserContext)
  const data = useGetData('')

  if (!user || user.length <= 1) {
    return <Navigate replace to="/login" />
  }

  return (
    <div>
      <h1>home</h1>
      {user && <pre>{JSON.stringify(user, null, 3)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 3)}</pre>}
    </div>
  )
}

export default Home
