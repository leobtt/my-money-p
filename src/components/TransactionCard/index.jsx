import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetData from '../../hooks/useGetData'
import './transactionCard.scss'

import { fire } from '../../services'
import LoopCard from './LoopCard'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

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
        const data = snapshot.val()

        /* console.log('data sem ordem', data[listSnap].createdAt) */
        snapshot.forEach((values) => {
          Object.keys(data).forEach((listSnap) => {
            const value = values.val()
            // ordenando e encontrando index
            if (value.createdAt === data[listSnap].createdAt) {
              feed.push([{ value, index: listSnap }])
            }
          })
        })

        setOrder(feed)
      })
  }, [date])
  return (
    <>
      <div className="alignTitle">
        <h2 className="alignTitle__title">Transações</h2>
        <button className="button-30">
          <span className="text">
            <AddCircleOutlineIcon />
          </span>
        </button>
      </div>

      <div className="alignTransaction">
        {order?.map((item, index) => {
          return (
            <div key={index}>
              <LoopCard key={index} data={item[0]} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HistoricCard
