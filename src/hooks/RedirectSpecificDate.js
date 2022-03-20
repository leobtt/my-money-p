import { useState } from 'react'
import { fire } from '../services'

const RedirectSpecificDate = (uid) => {
  const [data, setData] = useState('')
  const redirectDate = fire.database().ref(`${uid}/movimentacoes`).limitToFirst(1)
  redirectDate.on('value', (snapshot) => {
    setData(Object.keys(snapshot.val())[0])
  })
  console.log('teste hook', data)
  return data
}

export default RedirectSpecificDate
