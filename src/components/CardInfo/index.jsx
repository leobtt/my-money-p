import React, { useCallback, useEffect, useState } from 'react'
import './cardInfo.scss'
import {
  ArrowUpward,
  ArrowDownward,
  AttachMoneyOutlined,
} from '@mui/icons-material'
import useGetData from '../../hooks/useGetData'
import { useParams } from 'react-router-dom'

import { fire } from '../../services'
import { rewriteDateCard } from '../../utils/rewriteDateCard'

const CardInfo = () => {
  const { date } = useParams()
  const data = useGetData(`/meses/${date}`)
  const lastDates = useGetData('/ultimasDatas')
  const [timestamps, setTimestamps] = useState(null)

  const getTitle = (title) => {
    if (title === 'entradas') {
      return {
        title: 'Receitas',
        icon: <ArrowUpward style={{ fontSize: 45, color: '#3B9654' }} />,
      }
    } else if (title === 'saidas') {
      return {
        title: 'Receitas',
        icon: <ArrowDownward style={{ fontSize: 45, color: '#FF1313' }} />,
      }
    } else if (title === 'saldo') {
      return {
        title: 'Receitas',
        icon: (
          <AttachMoneyOutlined style={{ fontSize: 45, color: '#9122E8' }} />
        ),
      }
    }
  }

  return (
    <div className="alignLine">
      {data &&
        Object.keys(data).map((item, index) => {
          return (
            <div className="card" key={index}>
              <div className="card__info">
                <h3>{getTitle(item).title}</h3>
                {getTitle(item).icon}
              </div>
              <div className="card__value">
                <span>R$ {data[item]}</span>
                {lastDates && (
                  <p>
                    Última entrada dia{' '}
                    {rewriteDateCard(
                      new Date(lastDates[`${item}`]).getMonth(),
                      new Date(lastDates[`${item}`]).getDate()
                    )}
                  </p>
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default CardInfo
