import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context'
import { Navigate } from 'react-router-dom'
import { fire } from '../services'

const Home = () => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState(null)

  /* redirecionando */
  if (!user) {
    return <Navigate replace to="/login" />
  }

  /* pegando dados */
  useEffect(() => {
    const ref = fire.database().ref(`${user.uid}/`)
    ref.on('value', (snapshot) => {
      setData(snapshot.val())
    })
  }, [])

  return (
    <div>
      <h1>home</h1>
      {user && <pre>{JSON.stringify(user, null, 3)}</pre>}
      {<pre>{JSON.stringify(data, null, 3)}</pre>}
    </div>
  )
}

export default Home
