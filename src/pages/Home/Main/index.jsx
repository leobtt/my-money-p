import React, { useContext } from 'react'
import './main.scss'
import Header from './Header'
import CardInfo from '../../../components/CardInfo'
import TransactionCard from '../../../components/TransactionCard'

import { fire } from '../../../services'
import Graphics from './Graphics'
import { UserContext } from '../../../context'

const Main = () => {
  const {
    menu: { openMenu },
  } = useContext(UserContext)

  const sair = () => {
    fire.auth().signOut()
    localStorage.removeItem('uid')
  }

  return (
    <div className={`main ${openMenu ? 'open' : ''}`}>
      <Header />
      <div className="main__content">
        <div className="main__content__transactions">
          <CardInfo />
          <TransactionCard />
        </div>
        <div className="main__content__graphics">
          {/* <button type="button" onClick={sair} style={{ padding: '20px' }}>
            Sair
          </button> */}
          <Graphics />
        </div>
      </div>
      <div className="main__alertMessage"></div>
    </div>
  )
}

export default Main
