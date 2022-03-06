import React from 'react'
import { CheckCircle } from '@mui/icons-material'
import './alertMessage.scss'

const data = {
  error: 'erro',
  success: 'Item cadastrado',
  active: true,
}

const AlertMessage = ({ message, alert }) => {
  setTimeout(() => {
    alert(false)
  }, 2500)

  return (
    <div className="alertMessage active">
      <CheckCircle style={{ fontSize: '25px', color: 'green' }} />
      <span>{message}</span>
      <div className="alertMessage__progressBar active"></div>
    </div>
  )
}

export default AlertMessage
