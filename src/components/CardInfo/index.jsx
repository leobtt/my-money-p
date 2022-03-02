import React, { useContext, useDebugValue, useEffect, useState } from 'react'
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

/* TESTE */

const CardInfo = () => {
  const { date } = useParams()
  const [data, setData] = useState(null)
  const lastDates = useGetData('/ultimasDatas')
  useDebugValue(data ?? 'loading...')

  useEffect(() => {
    const uid = localStorage.getItem('uid')
    const ref = fire.database().ref(uid + '/meses/' + date)
    ref.on('value', (snapshot) => {
      console.log('data', snapshot.val())
      setData(snapshot.val())
    })
  }, [date])

  const getTitle = (title) => {
    if (title === 'entradas') {
      return {
        title: 'Receitas',
        icon: <ArrowUpward style={{ fontSize: 40, color: '#3B9654' }} />,
      }
    } else if (title === 'saidas') {
      return {
        title: 'Despesas',
        icon: <ArrowDownward style={{ fontSize: 40, color: '#FF1313' }} />,
      }
    } else if (title === 'saldo') {
      return {
        title: 'Saldo',
        icon: (
          <AttachMoneyOutlined style={{ fontSize: 40, color: '#9122E8' }} />
        ),
      }
    }
  }

  return (
    <div className="alignLine">
      {data &&
        Object.keys(data).map((item, index) => {
          const checkNegativeValue = data[item].toString().startsWith('-')

          const formatValue = checkNegativeValue
            ? data[item].toString().split('-')[1]
            : data[item]

          const checkValueColor = (color) => {
            const zeroValue = data[item].toString().startsWith('0')

            if (zeroValue) {
              return 'zero'
            } else if (!checkNegativeValue) {
              return 'greenValue'
            } else {
              return 'redValue'
            }
          }

          return (
            <div className="card" key={index}>
              <div className="card__info">
                <h3>{item && getTitle(item).title}</h3>
                {item && getTitle(item).icon}
              </div>
              <div className="card__value">
                {
                  <span className={checkValueColor(data[item])}>
                    R$ {parseFloat(formatValue).toFixed(2)}
                  </span>
                }

                {lastDates && lastDates[item] === false && (
                  <p>Nenhuma transação encontrada</p>
                )}
                {lastDates && lastDates[`${item}`] !== false && (
                  <p>
                    Última transação dia{' '}
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
