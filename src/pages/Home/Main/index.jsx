import React from 'react'
import CheckboxTheme from '../../../components/CheckboxTheme'
import './main.scss'
import DashboardIcon from '@mui/icons-material/Dashboard'

const Main = () => {
  return (
    <div className="main">
      <div className="main__top">
        <div className="main__top__dash">
          <DashboardIcon className="main__top__dash__icon" />
          <div className="main__top__dash__info">
            <h2>Dashboard</h2>
            <span>Informações do mês</span>
          </div>
        </div>

        <div className="main__top__theme">
          <CheckboxTheme />
          <div className="main__top__theme__logo">My Money</div>
        </div>
      </div>
      <div>Content</div>
    </div>
  )
}

export default Main
