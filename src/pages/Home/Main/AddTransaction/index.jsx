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
    categoria: 'Salário',
    receita: null,
  })

  const handleChange = ({ target }) => {
    const { name, value } = target

    setForm({ ...form, [name]: value })
    console.log(form)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    close(false)
    const valor = form.valor.replace(/[,]/g, '.')
    setAlert(true)
    saveData(date, {
      ...form,
      valor: parseFloat(valor),
      receita: form.receita == 'true' ? true : false,
    })
    saveDate(date, { receita: form.receita == 'true' ? true : false })
    console.log(status)
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <Close className="closer" onClick={() => close(false)} />

        <h2>Adicionar Transação</h2>
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          onChange={handleChange}
          autoComplete="nope"
        />
        <select name="categoria" onChange={handleChange}>
          <option disabled>Categorias...</option>v
          {category.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="valor"
          placeholder="Valor"
          onChange={handleChange}
          autoComplete="nope"
        />

        <div className="form__receita">
          <div style={{ width: '100%' }}>
            <input type="radio" id="arrowUp" name="receita" value={true} onChange={handleChange} />
            <label htmlFor="arrowUp">
              <ArrowUpward style={{ color: '#3b9654' }} />
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="arrowDown"
              name="receita"
              value="false"
              onChange={handleChange}
            />
            <label htmlFor="arrowDown">
              <ArrowDownward style={{ color: '#fe3030' }} />
            </label>
          </div>
        </div>

        <button type="submit">Adicionar</button>
      </form>
      {alert && <AlertMessage message={status} alert={setAlert} />}
    </>
  )
}

export default AddTransaction
