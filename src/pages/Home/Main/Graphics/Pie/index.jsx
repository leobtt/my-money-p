import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { Pie } from 'react-chartjs-2'
import { data } from './chartData'

import useGetData from '../../../../../hooks/useGetData'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const PieChart = () => {
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
      <h3>Gráfico de despesas</h3>
      {chartData && <Pie data={data(chartData)} width={250} height={250} />}
    </div>
  )
}

export default PieChart
