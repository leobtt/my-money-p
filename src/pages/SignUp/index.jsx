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
    const newUser = await fire.auth().createUserWithEmailAndPassword(form.email, form.password)

    newUser.user.updateProfile({ displayName: form.name })

    navigate(`/${user.uid}`)
  }

  return (
    <Sign>
      <form onSubmit={handleSubmit}>
        <h2>Cadastre-se</h2>
        <Input type="text" name="name" onChange={handleChange} text="Nickname" />
        <Input type="text" name="email" onChange={handleChange} text="Email" />
        <Input type="password" name="password" onChange={handleChange} text="Senha" />
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
