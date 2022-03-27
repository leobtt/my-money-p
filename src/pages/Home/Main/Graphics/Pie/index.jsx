import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { Pie } from 'react-chartjs-2'
import { data } from './chartData'
import { fire } from '../../../../../services'
import { responsiveProperty } from '@mui/material/styles/cssUtils'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const PieChart = () => {
  const [chartData, setChartData] = useState({ index: [], value: [] })
  const { date } = useParams()
  const [dataAPI, setDataAPI] = useState([])

  useEffect(() => {
    const uid = localStorage.getItem('uid')
    const ref = fire.database().ref(uid + '/movimentacoes/' + date)
    ref.on('value', (snapshot) => {
      setChartData({ index: [], value: [] })
      setDataAPI(snapshot.val())
    })

    return () => {
      ref.off()
    }
  }, [date])

  const loadData = (data) => {
    const negativeFilter = data.filter((item) => item.receita === false)
    const values = _.groupBy(negativeFilter, (values) => values.categoria)

    const result = _.map(values, (value, key) => {
      return [_.sumBy(values[key], (v) => v.valor)]
    })

    setChartData({ index: Object.keys(values), values: result })
  }

  useEffect(() => {
    if (dataAPI) {
      loadData(Object.values(dataAPI))
    }
  }, [dataAPI])
  return (
    <div>
      {chartData.index.length !== 0 && (
        <>
          <h3>Gráfico de despesas</h3>
          {chartData && <Pie data={data(chartData)} width={250} height={250} />}
        </>
      )}
      {chartData.index.length === 0 && <>Não há dados suficientes para mostrar o gráfico</>}
    </div>
  )
}

export default PieChart
