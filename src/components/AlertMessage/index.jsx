import React, { useEffect, useState } from 'react'
import { CheckCircle } from '@mui/icons-material'
import './alertMessage.scss'

let timer = null

const AlertMessage = ({ message, setAlert, alert }) => {
  const [active, setActive] = useState(true)
  console.log('message', message, '     alert', alert)

  return (
    <>
      {message && (
        <div className={`alertMessage ${alert ? 'active' : ''}`}>
          <CheckCircle style={{ fontSize: '25px', color: 'green' }} />
          <span>{message}</span>
          <div className="alertMessage__progressBar active"></div>
        </div>
      )}
    </>
  )
}

export default AlertMessage
