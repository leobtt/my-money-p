import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetData from '../../hooks/useGetData'
import './historicCard.scss'

import { fire } from '../../services'
import LoopCard from './LoopCard'

const HistoricCard = () => {
  const { date } = useParams()
  const data = useGetData(`/movimentacoes/${date}`)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    fire
      .database()
      .ref(`${localStorage.getItem('uid')}/movimentacoes/${date}`)
      .orderByChild('createdAt')
      .on('value', (snapshot) => {
        const feed = []

        snapshot.forEach((listSnap) => {
          const list = listSnap.val()
          feed.push(list)
        })

        setOrder(feed)
      })
  }, [date])
  return (
    <>
      <h2 className="title">Transações</h2>
      <div className="alignTransaction">
        <div className="transaction">
          <div className="transaction__value">
            <span>R$1000,00</span>
            <span>Convênio</span>
          </div>
          <div className="transaction__category">
            {/* <Dashboard style={{ fontSize: '40px' }} /> */}
            <span>Salário</span>
          </div>
          <div className="transaction__date">
            <span>24/04/12</span>
          </div>
        </div>
        {order &&
          Object.keys(order).map((item, index) => {
            return <LoopCard key={index} data={order[item]} />
          })}
      </div>
    </>
  )
}

export default HistoricCard
