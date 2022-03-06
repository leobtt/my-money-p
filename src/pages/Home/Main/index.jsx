import React from 'react'
import './main.scss'
import Header from './Header'
import CardInfo from '../../../components/CardInfo'
import TransactionCard from '../../../components/TransactionCard'

import { fire } from '../../../services'
import AlertMessage from '../../../components/AlertMessage'

const Main = () => {
  const sair = () => {
    fire.auth().signOut()
    localStorage.removeItem('uid')
  }

  return (
    <div className="main">
      <Header />
      <div className="main__content">
        <div className="main__content__transactions">
          <CardInfo />
          <TransactionCard />
        </div>
        <div className="main__content__graphics">
          <button type="button" onClick={sair} style={{ padding: '20px' }}>
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main
