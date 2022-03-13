import React from 'react'
import PieChart from './Pie'
import LineChart from './LineChart'
import './graphics.scss'

const Graphics = () => {
  return (
    <>
      <div className="charts">
        <PieChart />
      </div>
      <div className="charts">
        <LineChart />
      </div>
    </>
  )
}

export default Graphics
