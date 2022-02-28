import React, { useState, useRef } from 'react'
import useGetData from '../../../hooks/useGetData'
import usePost from '../../../hooks/usePost'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { rewriteDate } from '../../../utils/rewriteDate'
import './sidebar.scss'

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState()
  const { saveData } = usePost()

  const month = useRef()
  const year = useRef()
  const data = useGetData('/meses')
  const location = useLocation()

  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1]
    setActiveIndex(curPath)
  }, [location])

  const handleClick = () => {
    saveData(`${month.current.value}-${year.current.value}`)
  }

  return (
    <div className="sidebar">
      <h2>LISTA DE MESES</h2>
      <div className="sidebar__menu">
        {data &&
          Object.keys(data).map((month, index) => {
            return (
              <Link
                to={month}
                key={index}
                className={`sidebar__menu__link ${
                  month === activeIndex ? 'active' : ''
                }`}
              >
                {rewriteDate(month)}
              </Link>
            )
          })}
      </div>
      <div className="sidebar__month">
        <select name="month" defaultValue="01" ref={month}>
          <option value="01">01</option>
          <option value="05">05</option>
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
