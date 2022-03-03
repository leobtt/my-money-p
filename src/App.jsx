import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp, SignIn, Home, Main } from './pages'
import './scss/app.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="Cadastrar" element={<SignUp />} />
        <Route path="Entrar" element={<SignIn />} />

        <Route path="/" element={<Home />}>
          <Route path="/:date" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
