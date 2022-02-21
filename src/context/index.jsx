import React, { createContext, useEffect, useState } from 'react'
import { fire } from '../services'
export const UserContext = createContext()

const useGetUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fire.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })
  }, [])

  return user
}

const Context = (props) => {
  const user = useGetUser()
  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default Context
