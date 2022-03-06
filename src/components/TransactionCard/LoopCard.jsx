import React, { useState } from 'react'
import { DeleteForever } from '@mui/icons-material'
import SpanValue from '../SpanValue'
import WhichIcon from './WhichIcon'
import useDelete from '../../hooks/useDelete'
import { useParams } from 'react-router-dom'
import AlertMessage from '../AlertMessage'

const LoopCard = ({ data }) => {
  const [remove, status] = useDelete()
  const { date } = useParams()
  const [alert, setAlert] = useState(false)
  const createdAt = new Date(data.value.createdAt)
  const composition = `${createdAt.getDate().toString().padStart(2, '0')}/${(
    createdAt.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${createdAt.getFullYear().toString().substr(-2)}`

  const handleRemove = () => {
    remove(`/movimentacoes/${date}/${data.index}`)
    setAlert(true)
  }

  return (
    <>
      <div className="transaction">
        <div className="transaction__value">
          <SpanValue value={data.value.valor} revenue={data.value.receita} />

          <span>{data.value.descricao}</span>
        </div>
        <div className="transaction__category">
          <WhichIcon category={data.value.categoria} />
          <span>{data.value.categoria}</span>
        </div>
        <div className="transaction__date">
          <span>{composition}</span>

          <DeleteForever className="transaction__date__icon" onClick={handleRemove} />
        </div>
      </div>
      {alert && <AlertMessage message={status.success} alert={setAlert} />}
    </>
  )
}

export default LoopCard
