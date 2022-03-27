import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { fire } from '../../services'

const Home = () => {
  const { globalTheme } = useContext(UserContext)
  const navigate = useNavigate()
  const uid = localStorage.getItem('uid')

  if (uid === null) {
    return <Navigate replace to="/entrar" />
  }

  useEffect(() => {
    if (window.location.pathname === '/') {
      const ref = fire.database().ref(`${uid}/movimentacoes`).limitToFirst(1)
      ref.once('value', (snapshot) => {
        navigate(`/${Object.keys(snapshot.val())[0]}`)
      })
    }
  }, [window.location.pathname])

  return (
    <div className={`${globalTheme}`}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Home
