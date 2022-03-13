import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context'
import { fire } from '../services'

const useGetData = (path) => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState(null)
  useEffect(() => {
    // pegando os dados da base de dados

    const ref = fire.database().ref(localStorage.getItem('uid') + path)
    ref.on('value', (snapshot) => {
      setData(snapshot.val())
    })
    return () => {
      ref.off()
    }
  }, [path])
  return data
}

export default useGetData
