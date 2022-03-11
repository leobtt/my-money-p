import React, { useState } from 'react'
import './addTransaction.scss'
import { ArrowDownward, ArrowUpward, Close } from '@mui/icons-material'
import usePost from '../../../../hooks/usePost'
import { useParams } from 'react-router-dom'

const category = [
  'Salário',
  'Compras',
  'Saúde',
  'Alimentação',
  'Lazer',
  'Locomoção',
  'Estudos',
  'Outros',
]

const AddTransaction = ({ close }) => {
  const { date } = useParams()
  const { saveData, saveDate, status } = usePost()
  const [alert, setAlert] = useState(null)
  const [form, setForm] = useState({
    descricao: 'Compras',
    valor: null,
    categoria: '',
    receita: null,
  })
  const [color, setColor] = useState({ c1: false, c2: false })

  const handleChange = ({ target }) => {
    const { name, value } = target
    setForm({ ...form, [name]: value })
  }

  const selectColor = (boolean) => {
    setForm({ ...form, receita: boolean })
    if (boolean) {
      setColor({ c1: true, c2: false })
    } else {
      setColor({ c1: false, c2: true })
    }
  }

  const handleSubmit = () => {
    close(false)
    const valor = form.valor.replace(/[,]/g, '.')
    setAlert(true)
    saveData(date, { ...form, valor: parseFloat(valor) })
    saveDate(date, { receita: form.receita })
  }

  return (
    <>
      <div className="form">
        <Close className="closer" onClick={() => close(false)} />

        <h2>Adicionar Transação</h2>

        <input type="text" name="descricao" placeholder="Descrição" onChange={handleChange} />
        <select name="categoria" onChange={handleChange}>
          v
          {category.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <input type="text" name="valor" placeholder="Valor" onChange={handleChange} />
        <div className="form__receita">
          <div
            className={`form__receita__separar ${color.c1 ? 'active' : ''}`}
            onClick={() => selectColor(true)}
          >
            <ArrowUpward />
          </div>
          <div
            className={`form__receita__separar ${color.c2 ? 'active' : ''}`}
            onClick={() => selectColor(false)}
          >
            <ArrowDownward />
          </div>
        </div>
        <button type="button" onClick={handleSubmit}>
          Adicionar
        </button>
      </div>
      {alert && <AlertMessage message={status} alert={setAlert} />}
    </>
  )
}

export default AddTransaction
