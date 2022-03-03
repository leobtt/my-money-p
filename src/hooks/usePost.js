import { fire } from '../services'
import { useContext, useState } from 'react'
import { UserContext } from '../context'
import useGetData from './useGetData'

const usePost = () => {
  const { user } = useContext(UserContext)
  const [status, setStatus] = useState(null)

  const saveData = async (date, data) => {
    const ref = await fire.database().ref(`${user.uid}/movimentacoes/${date}`)

    // pegando os dados do realtime
    const snapshot = await ref.get()

    // verificando se a coleção do realtime existe
    if (!snapshot.exists()) {
      return ref.set({ createdAt: new Date().getTime() }, (err) => {
        if (err) console.log(err.message)
      })
    } else if (data !== undefined) {
      return ref.push(data, (err) => {
        if (err) console.log(err.message)
      })
    }
  }

  return { saveData }
}

export default usePost
