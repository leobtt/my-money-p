import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp, SignIn, Home } from './pages'
import Sidebar from './layout/Sidebar'
import { UserContext } from './context'

function App() {
  const { user } = useContext(UserContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="Cadastrar" element={<SignUp />} />
        <Route path="Login" element={<SignIn />} />

        <Route path="" element={<Sidebar />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
