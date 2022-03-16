import React, { useContext, useState } from 'react'
import fire from '../../services/firebase-config'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context'
import Sign from '../../components/Sign'
import Input from '../../components/Input'

const initialState = {
  name: '',
  email: '',
  password: '',
}

const SingUp = () => {
  const [form, setForm] = useState(initialState)
  const navigate = useNavigate()

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(form)
    try {
      const newUser = await fire.auth().createUserWithEmailAndPassword(form.email, form.password)

      newUser.user.updateProfile({ displayName: form.name })

      navigate(`/${user.uid}`)
    } catch (error) {
      console.log(error.code)
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
      label: 'Senha',
      pattern: form.password,
      errorField: 'Senha não corresponde',
      handleChange,
    },
  ]

  return (
    <Sign>
      <form onSubmit={handleSubmit}>
        <h2>Cadastre-se</h2>
        <Input type="text" name="name" handleChange={handleChange} label="Nickname" />
        <Input type="text" name="email" handleChange={handleChange} label="Email" />
        <Input type="password" name="password" handleChange={handleChange} label="Senha" />
        <button type="submit">
          <span>Cadastrar</span>
        </button>
        <Link to="/entrar" className="link">
          Logar
        </Link>
      </form>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </Sign>
  )
}

export default SingUp
