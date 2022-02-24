import React, { useContext, useState } from 'react'
import fire from '../services/firebase-config'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'

const initialState = {
  name: '',
  email: '',
  password: '',
}

const SingUp = () => {
  const { user } = useContext(UserContext)
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
    const newUser = await fire
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)

    newUser.user.updateProfile({ displayName: form.name })

    navigate(`/${user.uid}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Apelido"
        />
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="E-mail"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Senha"
        />
        <button type="submit">Criar usuário</button>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </form>
    </div>
  )
}

export default SingUp
