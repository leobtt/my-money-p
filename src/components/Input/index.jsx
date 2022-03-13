import React from 'react'
import './input.scss'

const Input = ({ text, name, handleChange, type }) => {
  return (
    <>
      <div className="container">
        <span>{text}</span>
        <input type={type} name={name} className="container__input" onChange={handleChange} />
      </div>
    </>
  )
}

export default Input
