import React from 'react'
import './main.scss'
import Header from './Header'
import CardInfo from '../../../components/CardInfo'

const Main = () => {
  return (
    <div className="main">
      <Header />
      <div className="content">
        <div className="transactions">
          <CardInfo />
        </div>
        <div className="graphics"></div>
      </div>
    </div>
  )
}

export default Main
