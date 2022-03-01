import React from 'react'
import { useParams } from 'react-router-dom'
import useGetData from '../../hooks/useGetData'
import './historicCard.scss'

const HistoricCard = () => {
  const { date } = useParams()
  const data = useGetData(`/movimentacoes/${date}`)
  return <div>HistoricCard</div>
}

export default HistoricCard
