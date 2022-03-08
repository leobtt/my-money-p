import { useState } from 'react'
import { fire } from '../services'

const useDelete = () => {
  const [status, setStatus] = useState('')

  const remove = (path) => {
    const ref = fire.database().ref(`${localStorage.getItem('uid')}${path}`)
    ref
      .remove()
      .then((data) => {
        setStatus({ success: 'Transação removida' })
      })
      .catch((err) => setStatus({ error: err.message }))
  }

  return { remove, status }
}
export default useDelete
