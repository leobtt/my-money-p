import React from 'react'
import { DeleteForever } from '@mui/icons-material'
import SpanValue from '../SpanValue'
import WhichIcon from './WhichIcon'

const LoopCard = ({ data }) => {
  const createdAt = new Date(data.createdAt)
  const composition = `${createdAt.getDate().toString().padStart(2, '0')}/${(
    createdAt.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${createdAt.getFullYear().toString().substr(-2)}`

  return (
    <div className="transaction" key={data.valor}>
      <div className="transaction__value">
        <SpanValue value={data.valor} revenue={data.receita} />

        <span>{data.descricao}</span>
      </div>
      <div className="transaction__category">
        <WhichIcon category={data.categoria} />
        <span>{data.categoria}</span>
      </div>
      <div className="transaction__date">
        <span>{composition}</span>

        <DeleteForever className="transaction__date__icon" />
      </div>
    </div>
  )
}

export default LoopCard
