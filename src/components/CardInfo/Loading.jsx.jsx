import React from 'react'
import './cardInfo.scss'

const Loading = () => {
  return (
    <>
      <div className="card ">
        <div className="card__info">
          <h3
            className="loading"
            style={{
              padding: '12px',
              width: '35%',
              borderRadius: '5px',
            }}
          ></h3>
          <span
            className="loading"
            style={{
              padding: '20px',
              width: '5%',
              borderRadius: '5px',
            }}
          >
            {' '}
          </span>
        </div>

        <div className="card__value">
          <div
            className="loading"
            style={{
              padding: '14px 10px',
              width: '30%',
              borderRadius: '5px',
            }}
          ></div>

          <div
            className="loading"
            style={{
              padding: '8px',
              width: '50%',
              borderRadius: '5px',
              marginTop: '5px',
            }}
          ></div>
        </div>
      </div>
    </>
  )
}

export default Loading
