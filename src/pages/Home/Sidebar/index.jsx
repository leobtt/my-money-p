import React, { useState, useRef, useContext } from 'react'
import useGetData from '../../../hooks/useGetData'
import usePost from '../../../hooks/usePost'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { rewriteDate } from '../../../utils/rewriteDate'
import './sidebar.scss'
import { UserContext } from '../../../context'
import { CloseRounded, Logout } from '@mui/icons-material'

const ShowMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState()
  const { saveData } = usePost()
  const {
    menu: { openMenu, setOpenMenu },
  } = useContext(UserContext)
  const navigate = useNavigate()

  const month = useRef()
  const year = useRef()
  const data = useGetData('/meses')
  const location = useLocation()

  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1]
    setActiveIndex(curPath)
  }, [location])

  const handleClick = () => {
    const date = `${month.current.value}-${year.current.value}`

    saveData(date, undefined)
    navigate(`/${date}`)
    setOpenMenu(false)
  }

  return (
    <div className={`sidebar ${openMenu ? 'open' : ''}`}>
      <h2>LISTA DE MESES</h2>
      <div className="sidebar__close">
        <CloseRounded style={{ fontSize: '45px' }} onClick={() => setOpenMenu(false)} />
      </div>

      <div className="sidebar__menu">
        {data &&
          Object.keys(data).map((month, index) => {
            return (
              <Link
                to={month}
                key={index}
                className={`sidebar__menu__link ${month === activeIndex ? 'active' : ''}`}
              >
                {rewriteDate(month)}
              </Link>
            )
          })}
      </div>
      <div className="sidebar__month">
        <select name="month" defaultValue="01" ref={month}>
          {ShowMonths.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select name="year" defaultValue={new Date().getFullYear()} ref={year}>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
        <button type="button" onClick={handleClick}>
          Adicionar mês
        </button>
      </div>
    </div>
  )
}

export default Sidebar
