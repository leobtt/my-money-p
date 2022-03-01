import React, { useContext } from 'react'
import { UserContext } from '../../context'
import './index.scss'

const CheckboxTheme = () => {
  const { setGlobalTheme, globalTheme } = useContext(UserContext)

  const handleClick = (e) => {
    setGlobalTheme(e.target.checked ? 'theme-light' : 'theme-dark')
  }
  return (
    <>
      <input
        type="checkbox"
        id="theme"
        className="toggle"
        onClick={handleClick}
      />
      <label htmlFor="theme"></label>
    </>
  )
}

export default CheckboxTheme
