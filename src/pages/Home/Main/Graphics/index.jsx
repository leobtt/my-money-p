import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './graphics.scss'
import _ from 'lodash'
import { data } from './chartData'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import useGetData from '../../../../hooks/useGetData'

ChartJS.register(ArcElement, Tooltip, Legend)

const Graphics = () => {
  const [chartData, setChartData] = useState(null)
  const { date } = useParams()
  const datafromapi = useGetData('/movimentacoes/' + date)

  const loadData = (data) => {
    const negativeFilter = data.filter((item) => item.receita === false)
    const values = _.groupBy(negativeFilter, (values) => values.categoria)

    const result = _.map(values, (value, key) => {
      return [_.sumBy(values[key], (v) => v.valor)]
    })

    setChartData({ index: Object.keys(values), values: result })
  }

  useEffect(() => {
    if (datafromapi) {
      loadData(Object.values(datafromapi))
    }
  }, [datafromapi])

  return (
    <div>
      {chartData && (
        <Pie
          data={data(chartData)}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Grafico de despesas',
              },
            },
          }}
        />
      )}
    </div>
  )
}

export default Graphics
