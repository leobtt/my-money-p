import React, { useState } from 'react'
import createUserDocument from '../services/createUserDocument'
import fire from '../services/firebase-config'
import { useNavigate } from 'react-router-dom'

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

  if (user) {
    return <Navigate replace to={`/${user.uid}`} />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    /* Criando usuário */
    const newUser = await fire
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
    console.log(newUser.user)
    /* Atualizando usuário */
    newUser.user.updateProfile({ displayName: form.name })
    /* Criando documento de usuário no banco */
    createUserDocument(newUser.user)

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
