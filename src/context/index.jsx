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
  const user = useGetUser()

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default Context
