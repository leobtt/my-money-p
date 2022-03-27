import React, { useState } from 'react'
import { DeleteForever } from '@mui/icons-material'
import SpanValue from '../SpanValue'
import WhichIcon from './WhichIcon'
import useDelete from '../../hooks/useDelete'
import { useParams } from 'react-router-dom'
import AlertMessage from '../AlertMessage'
import ReactDom from 'react-dom'

const LoopCard = ({ data }) => {
  const { remove, status } = useDelete()
  const { date } = useParams()
  const [alert, setAlert] = useState(false)

  const negativeDate = data.value.createdAt.toString().split('-')[1]
  const createdAt = new Date(parseInt(negativeDate))
  const composition = `${createdAt.getDate().toString().padStart(2, '0')}/${(
    createdAt.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${createdAt.getFullYear().toString().substr(-2)}`

  const handleRemove = () => {
    remove(`/movimentacoes/${date}/${data.index}`)

    /* const root = document.querySelector('.main__alertMessage')
    console.log('render', root)
    ReactDom.render(<AlertMessage message="Transação removida" />, root) */
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
        </div>
        <DeleteForever className="transaction__date__icon" onClick={handleRemove} />
      </div>
      {/* arrumar alert message, don't show in the screen */}
      {alert && <AlertMessage message={status.success} setAlert={setAlert} alert={alert} />}
    </>
  )
}

export default LoopCard
