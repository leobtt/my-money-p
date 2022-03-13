import React, { useContext } from 'react'
import { UserContext } from '../../context'
import './sign.scss'

const Sign = ({ children }) => {
  const { globalTheme } = useContext(UserContext)
  return (
    <div className={`theme-dark `}>
      <div className="sign">
        <h1>My Money</h1>
        {children}
      </div>
    </div>
  )
}

export default Sign
