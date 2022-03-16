import React, { useState } from 'react'
import './input.scss'

const Input = ({ label, name, handleChange, type, pattern, errorField }) => {
  const [focused, setFocused] = useState(false)

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
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
          required
        />
        <p>{errorField}</p>
      </div>
    </>
  )
}

export default Input
