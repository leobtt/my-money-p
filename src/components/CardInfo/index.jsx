import React, { useDebugValue, useEffect, useState } from 'react'
import './cardInfo.scss'
import { ArrowUpward, ArrowDownward, AttachMoneyOutlined } from '@mui/icons-material'
import useGetData from '../../hooks/useGetData'
import { useParams } from 'react-router-dom'

import { fire } from '../../services'
import { rewriteDateCard } from '../../utils/rewriteDateCard'
import Loading from './Loading.jsx'

/* TESTE */

const CardInfo = () => {
  const { date } = useParams()
  const [data, setData] = useState(null)
  const lastDates = useGetData(`/ultimasDatas/${date}`)

  useEffect(() => {
    const uid = localStorage.getItem('uid')
    const ref = fire.database().ref(uid + '/meses/' + date)
    ref.on('value', (snapshot) => {
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
        icon: <AttachMoneyOutlined style={{ fontSize: 40, color: '#9122E8' }} />,
      }
    }
  }

  return (
    <div className="alignLine">
      {!data && (
        <>
          <Loading />
          <Loading />
          <Loading />
        </>
      )}
      {data &&
        Object.keys(data).map((item, index) => {
          const checkNegativeValue = data[item].toString().startsWith('-')

          const formatValue = checkNegativeValue
            ? parseFloat(data[item].toString().split('-')[1]).toFixed(2)
            : data[item].toFixed(2)
          const formatComma = formatValue.toString().replace(/[.]/g, ',')

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
                {<span className={checkValueColor(data[item])}>R$ {formatComma}</span>}

                {lastDates && lastDates[item] === false && <p>Nenhuma transação encontrada</p>}
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
