import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp, SignIn, Home, Sidebar } from './pages'
import { UserContext } from './context'

function App() {
  const { user } = useContext(UserContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="Cadastrar" element={<SignUp />} />
        <Route path="Login" element={<SignIn />} />

        <Route path={`${user?.uid}/movimentacoes/:data`} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
