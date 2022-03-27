import './signIn.scss'
import React, { useState } from 'react'
import { fire } from '../../services'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import Input from '../../components/Input'
import Sign from '../../components/Sign'

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errorLogin, setErrorLogin] = useState('')
  const navigate = useNavigate()

  /* if (user) {
    return <Navigate replace to={`/${date}`} />
  } */

  const handleChange = (evt) => {
    evt.preventDefault()
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const login = await fire.auth().signInWithEmailAndPassword(form.email, form.password)

      localStorage.setItem('uid', login.user.uid)

      /* Buscando a data para redirecionamento de rota */
      const searchNavigate = await fire.database().ref(`${login.user.uid}/meses`).limitToFirst(1)
      searchNavigate.once('value', (snapshot) => {
        navigate(`/${Object.keys(snapshot.val())[0]}`)
      })
    } catch (err) {
      setErrorLogin('Email ou senha inválidos')
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
  ]
  return (
    <Sign>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="errorLogin">{errorLogin}</div>
        {inputs.map((input, index) => (
          <Input key={index} {...input} errorLogin={errorLogin} />
        ))}

        <button>
          <span>Entrar</span>
        </button>

        <Link to="/cadastrar" className="link">
          Cadastre-se
        </Link>
      </form>
    </Sign>
  )
}

export default SignIn
