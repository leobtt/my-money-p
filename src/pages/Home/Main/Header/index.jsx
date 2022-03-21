import React, { useContext } from 'react'
import './header.scss'
import CheckboxTheme from '../../../../components/CheckboxTheme'
import { Dashboard, Menu, Close, Logout } from '@mui/icons-material'
import { UserContext } from '../../../../context'
import { fire } from '../../../../services'
import { useNavigate } from 'react-router-dom'

const index = () => {
  const {
    menu: { setOpenMenu, openMenu },
  } = useContext(UserContext)
  const navigate = useNavigate()

  const logout = () => {
    fire.auth().signOut()
    localStorage.removeItem('uid')
    navigate('/entrar')
  }

  return (
    <header className="top">
      <div className="top__dash">
        <div className="top__dash__icon">
          <Dashboard className="top__dash__icon" />
        </div>
        <div className="top__dash__menu">
          {!openMenu && (
            <Menu style={{ fontSize: '3.4rem' }} onClick={() => setOpenMenu(!openMenu)} />
          )}

          {openMenu && (
            <Close style={{ fontSize: '3.4rem' }} onClick={() => setOpenMenu(!openMenu)} />
          )}
        </div>
        <div className="top__dash__info">
          <h2>Dashboard</h2>
          <span>Informações do mês</span>
        </div>
      </div>

      <div className="top__theme">
        <CheckboxTheme />
        <div className="top__theme__logo">MyMoney</div>
        <div className="logout" onClick={logout}>
          <Logout />
        </div>
      </div>
    </header>
  )
}

export default index
