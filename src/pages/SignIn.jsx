import React, { useState, useContext } from 'react'
import { fire } from '../services'
import { useNavigate, Navigate } from 'react-router-dom'
import { UserContext } from '../context'

const SignIn = () => {
  const [form, setForm] = useState({ email: null, password: null })
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  if (user) {
    return <Navigate replace to="/" />
  }

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async () => {
    const login = await fire
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
    console.log('login', login)
    navigate(`/${user.uid}/02-2022`)
  }

  return (
    <div>
      <form>
        <input type="text" name="email" onChange={handleChange} />
        <input type="password" name="password" onChange={handleChange} />
        <button type="button" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <pre>{JSON.stringify(form)}</pre>
    </div>
  )
}

export default SignIn
