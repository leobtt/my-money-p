import React, { useState } from 'react'
import './addTransaction.scss'
import { ArrowDownward, ArrowUpward, Close } from '@mui/icons-material'
import usePost from '../../../../hooks/usePost'
import { useParams } from 'react-router-dom'
import { border } from '@mui/system'

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
  const [focused, setFocused] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [form, setForm] = useState({
    descricao: 'Compras',
    valor: null,
    categoria: 'Salário',
    receita: null,
  })

  const handleChange = (e) => {
    let { name, value } = e.target

    if (name === 'valor') {
      const format = value.replace(/[.]/g, '').replace(',', '.')
      value = format
    }

    setForm({ ...form, [name]: value })
    console.log(JSON.stringify(form, null, 2))
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

    return <AlertMessage message={status} alert={setAlert} />
  }

  const moneyMask = (e) => {
    let value = e.target.value

    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9]{2})$/g, ',$1')

    if (value.length > 6 && value.length < 9) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
    }
    if (value.length >= 9) {
      value = value.replace(/([0-9]{3})([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3')
    }

    e.target.value = value
    if (value == 'NaN') e.target.value = ''
  }

  const handleInvalid = (e) => {
    e.preventDefault()
    setSubmit(true)
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <Close className="closer" onClick={() => close(false)} />

        <h2>Adicionar Transação</h2>
        {submit && <span className="textInvalid">Campo obrigatório</span>}
        <input
          className={`${submit && form.descricao === null ? 'errorIn' : ''}`}
          type="text"
          name="descricao"
          placeholder="Descrição"
          onChange={handleChange}
          autoComplete="nope"
          onInvalid={handleInvalid}
          submit={submit.toString()}
          required
        />
        <select name="categoria" onChange={handleChange}>
          <option disabled>Categorias...</option>
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
          onInput={(e) => moneyMask(e)}
          onInvalid={handleInvalid}
          submit={submit.toString()}
          required
        />

        <div className={`form__receita ${submit && form.receita === null ? 'invalid' : ''}`}>
          <div style={{ width: '100%' }}>
            <input
              type="radio"
              id="arrowUp"
              name="receita"
              value={true}
              onChange={handleChange}
              required
            />
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
              required
            />
            <label htmlFor="arrowDown">
              <ArrowDownward style={{ color: '#fe3030' }} />
            </label>
          </div>
        </div>

        <button type="submit">Adicionar</button>
      </form>
      {/* {alert && <AlertMessage message={status} alert={setAlert} />} */}
    </>
  )
}

export default AddTransaction
