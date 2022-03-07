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
        else setStatus({ success: 'Data cadastrada' })
      })
    }
    console.log(data)
    if (data !== undefined) {
      return ref.push({ ...data, createdAt: new Date().getTime() }, (err) => {
        if (err) setStatus({ error: err.message })
        else setStatus({ success: 'Item cadastrado' })
      })
    }
  }

  const saveDate = async (date, data) => {
    const ref = await fire.database().ref(`${user.uid}/ultimasDatas/${date}`)

    const timestamps = new Date().getTime()

    //trocar por set ou achar um valor correspondente
    if (data.receita === true) {
      return ref.push({ entradas: timestamps, saldo: timestamps })
    } else if (data.receita === false) {
      return ref.push({ saidas: timestamps, saldo: timestamps })
    }
  }

  return { saveData, saveDate, status }
}

export default usePost
