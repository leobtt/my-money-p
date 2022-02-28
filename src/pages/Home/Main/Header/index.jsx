import React from 'react'
import './header.scss'
import CheckboxTheme from '../../../../components/CheckboxTheme'
import DashboardIcon from '@mui/icons-material/Dashboard'

const index = () => {
  return (
    <header className="top">
      <div className="top__dash">
        <DashboardIcon className="top__dash__icon" />
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
