import './signIn.scss'
import React, { useState } from 'react'
import { fire } from '../../services'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import Input from '../../components/Input'
import Sign from '../../components/Sign'

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const date = `${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${new Date().getFullYear()}`

  /* if (user) {
    return <Navigate replace to={`/${date}`} />
  } */

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async () => {
    const login = await fire.auth().signInWithEmailAndPassword(form.email, form.password)
    console.log('login', login)
    localStorage.setItem('uid', login.user.uid)
    navigate(`/`)
  }

  return (
    <Sign>
      <form>
        <h2>Login</h2>
        <Input text="E-mail" name="email" handleChange={handleChange} type="text" />
        <Input text="Senha" name="password" handleChange={handleChange} type="password" />

        <button type="button" onClick={handleSubmit}>
          <span>Entrar</span>
        </button>
        <Link to="/cadastrar" className="link">
          Cadastre-se
        </Link>
      </form>
      <pre>{JSON.stringify(form)}</pre>
    </Sign>
  )
}

export default SignIn
