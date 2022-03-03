import Dashboard from '@mui/icons-material/Dashboard'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetData from '../../hooks/useGetData'
import './historicCard.scss'

import { fire } from '../../services'
import SpanValue from '../SpanValue'

const HistoricCard = () => {
  const { date } = useParams()
  const data = useGetData(`/movimentacoes/${date}`)
  const [order, setOrder] = useState([])

  useEffect(() => {
    fire
      .database()
      .ref(`${localStorage.getItem('uid')}/movimentacoes/${date}`)
      .orderByChild('createdAt')
      .on('value', (snapshot) => {
        const feed = []
        console.log(snapshot.val())

        snapshot.forEach((listSnap) => {
          const list = listSnap.val()
          feed.push(list)
          setOrder(feed)
        })
      })
  }, [date])

  console.log(order)
  return (
    <>
      <h2 className="title">Transações</h2>

      <div className="transaction">
        <div className="transaction__value">
          <span>R$1000,00</span>
          <span>Convênio</span>
        </div>
        <div className="transaction__category">
          <Dashboard style={{ fontSize: '40px' }} />
          <span>Salário</span>
        </div>
        <div className="transaction__date">
          <span>24/04/12</span>
        </div>
      </div>
      {data &&
        Object.keys(data).map((item, index) => {
          //formatando data
          const createdAt = new Date(data[item].createdAt)
          const composition = `${createdAt
            .getDate()
            .toString()
            .padStart(2, '0')}/${(createdAt.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${createdAt.getFullYear().toString().substr(-2)}`
          return (
            <div className="transaction" key={index}>
              <div className="transaction__value">
                {/* <span>R$ {data[item].valor}</span> */}
                <SpanValue
                  value={data[item].valor}
                  revenue={data[item].receita}
                />

                <span>{data[item].descricao}</span>
              </div>
              <div className="transaction__category">
                <Dashboard style={{ fontSize: '40px' }} />
                <span>{data[item].categoria}</span>
              </div>
              <div className="transaction__date">
                <span>{composition}</span>
              </div>
            </div>
          )
        })}
    </>
  )
}

export default HistoricCard
