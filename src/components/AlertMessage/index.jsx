import React, { useState } from 'react'
import { CheckCircle } from '@mui/icons-material'
import './alertMessage.scss'

const AlertMessage = ({ message, setAlert, alert }) => {
  const [active, setActive] = useState(true)
  console.log('funfando')

  return (
    <>
      {message && (
        <div className={`alertMessage ${active ? 'active' : ''}`}>
          <CheckCircle style={{ fontSize: '25px', color: 'green' }} />
          <span>{message}</span>
          <div className="alertMessage__progressBar active"></div>
        </div>
      )}
    </>
  )
}

export default AlertMessage
