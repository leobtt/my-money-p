import React, { createContext, useEffect, useState } from 'react'
import { fire } from '../services'
export const UserContext = createContext()

const useGetUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getValue = async () => {
      await fire.auth().onAuthStateChanged((currentUser) => {
        if (currentUser) {
          setUser(currentUser)
        } else {
          setUser(null)
        }
      })
    }
    getValue()
  }, [])

  return user
}

const Context = (props) => {
  const [theme, setTheme] = useState('theme-dark')
  const user = useGetUser()

  const value = {
    user,
    globalTheme: theme,
    setGlobalTheme: setTheme,
  }

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  )
}

export default Context
