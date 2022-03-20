import React, { useContext } from 'react'
import './header.scss'
import CheckboxTheme from '../../../../components/CheckboxTheme'
import { Dashboard, Menu } from '@mui/icons-material'
import { UserContext } from '../../../../context'

const index = () => {
  const {
    menu: { setOpenMenu, openMenu },
  } = useContext(UserContext)

  return (
    <header className="top">
      <div className="top__dash">
        <div className="top__dash__icon">
          <Dashboard className="top__dash__icon" />
        </div>
        <div className="top__dash__menu">
          <Menu style={{ fontSize: '3.4rem' }} onClick={() => setOpenMenu(!openMenu)} />
        </div>
        <div className="top__dash__info">
          <h2>Dashboard</h2>
          <span>Informações do mês</span>
        </div>
      </div>

      <div className="top__theme">
        <CheckboxTheme />
        <div className="top__theme__logo">My Money</div>
      </div>
    </header>
  )
}

export default index
