import React from 'react'
import './main.scss'
import Header from './Header'
import CardInfo from '../../../components/CardInfo'
import HistoricCard from '../../../components/HistoricCard'

const Main = () => {
  return (
    <div className="main">
      <Header />
      <div className="main__content">
        <div className="main__content__transactions">
          <CardInfo />
          <HistoricCard />
        </div>
        <div className="main__content__graphics">AQUI</div>
      </div>
    </div>
  )
}

export default Main
