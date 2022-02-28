import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context'
import { fire } from '../services'

const useGetData = (path) => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (user) {
      const ref = fire.database().ref(user.uid + path)
      ref.on('value', (snapshot) => {
        setData(snapshot.val())
      })
      return () => {
        ref.off()
      }
    }
  }, [])

  return data
}

export default useGetData
