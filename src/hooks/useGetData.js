import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context'
import { fire } from '../services'

const useGetData = (path, order) => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState(null)
  useEffect(() => {
    // pegando os dados da base de dados
    if (user && order === undefined) {
      const ref = fire.database().ref(user.uid + path)
      ref.on('value', (snapshot) => {
        setData(snapshot.val())
      })
      return () => {
        ref.off()
      }
    }

    // pegando o ultimo dado adicionado a base de dados
    if (user && order === true) {
      const fn = async () => {
        const d = await fire
          .database()
          .ref(`${user.uid}${path}`)
          .orderByChild('createdAt')
          .limitToLast(1)
          .once('value', (snapshot) => {
            setData(snapshot.val())
          })

        return () => {
          ref.off()
        }
      }
      fn()
    }
  }, [order, path])

  return data
}

export default useGetData
