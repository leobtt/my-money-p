import React, { useContext, useState } from 'react'
import fire from '../../services/firebase-config'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context'
import Sign from '../../components/Sign'
import Input from '../../components/Input'
import RedirectSpecificDate from '../../hooks/RedirectSpecificDate'

const initialState = {
  name: '',
  email: '',
  password: '',
}

const SingUp = () => {
  const [form, setForm] = useState(initialState)
  const [errorSignUp, setErrorSignUp] = useState(false)
  const navigate = useNavigate()

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newUser = await fire.auth().createUserWithEmailAndPassword(form.email, form.password)

      /* newUser.user.updateProfile({ displayName: form.name }) */
      localStorage.setItem('uid', newUser.user.uid)
      const date = new Date()
      const redirectDate = `${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getFullYear()}`
      navigate(`/${redirectDate}`)
    } catch (error) {
      setErrorSignUp('E-mail já existente')
    }
  }

  const inputs = [
    {
      name: 'email',
      type: 'text',
      label: 'E-mail',
      pattern: '^[a-zA-z0-9.]+[@][a-z0-9]+[.][a-z]+$',
      errorField: 'Email deve ser válido',
      handleChange,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Senha',
      pattern: '^[a-zA-z0-9]{6,}$',
      errorField: 'Mínimo de 6 caracteres',
      handleChange,
    },
    {
      type: 'password',
      label: 'Confirme a senha',
      pattern: form.password,
      errorField: 'Senha não corresponde',
    },
  ]

  return (
    <Sign>
      <form onSubmit={handleSubmit}>
        <h2>Cadastre-se</h2>
        <div className="errorLogin">{errorSignUp}</div>
        {inputs.map((input, index) => (
          <Input {...input} key={index} />
        ))}

        <button type="submit">
          <span>Cadastrar</span>
        </button>
        <Link to="/entrar" className="link">
          Logar
        </Link>
      </form>
    </Sign>
  )
}

export default SingUp
