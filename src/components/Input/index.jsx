import React from 'react'
import './input.scss'

const Input = ({ label, name, handleChange, type, pattern, errorField }) => {
  return (
    <>
      <div className="container">
        <span>{label}</span>
        <input
          type={type}
          name={name}
          className="container__input"
          onChange={handleChange}
          autoComplete="nope"
          pattern={pattern}
          onInvalid={(e) => e.preventDefault()}
        />
        <p>{errorField}</p>
      </div>
    </>
  )
}

export default Input
