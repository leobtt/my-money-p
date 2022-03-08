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
      ref.set('vazio', (err) => {
        if (err) setStatus({ error: err.message })
      })
    }
    if (data !== undefined) {
      setStatus({ success: 'Item cadastrado' })
      return ref.push({ ...data, createdAt: parseInt(`-${new Date().getTime()}`) }, (err) => {
        if (err) setStatus({ error: err.message })
      })
    }
  }

  const saveDate = async (date, data) => {
    const ref = await fire.database().ref(`${user.uid}/ultimasDatas/${date}`)

    const timestamps = new Date().getTime()

    if (data.receita === true) {
      ref.transaction((currentValue) => {
        return { ...currentValue, saldo: timestamps, entradas: timestamps }
      })
    } else if (data.receita === false) {
      return ref.transaction((currentValue) => {
        return {
          ...currentValue,
          saldo: timestamps,
          saidas: timestamps,
        }
      })
    }
  }

  return { saveData, saveDate, status: 'Transação cadastrada' }
}

export default usePost
