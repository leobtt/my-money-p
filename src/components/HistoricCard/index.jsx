import Dashboard from '@mui/icons-material/Dashboard'
import React from 'react'
import { useParams } from 'react-router-dom'
import useGetData from '../../hooks/useGetData'
import './historicCard.scss'

const HistoricCard = () => {
  const { date } = useParams()
  const data = useGetData(`/movimentacoes/${date}`)
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
    </>
  )
}

export default HistoricCard
