import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js'
import { data } from './chartData'
import useGetData from '../../../../../hooks/useGetData'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement)

const arrayMonth = [
  'Error',
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

const LineChart = () => {
  const schema = useGetData(`/meses/`)

  const [{ date, receitas, despesas, saldo }, setValues] = useState({
    date: [],
    receitas: [],
    despesas: [],
    saldo: [],
  })

  useEffect(() => {
    /* Formatando a data '02-2022' to Fev/22 */
    if (schema) {
      const month = Object.keys(schema).map((item) => {
        const formatMonth = parseInt(item.split('-')[0])
        const year = item.split('-')[1].substr(-2)
        return [`${arrayMonth[formatMonth]}/${year}`]
      })

      /* Pegando os valores separadamente */
      const entradas = []
      const saidas = []
      const saldoTotal = []

      const values = Object.values(schema).map((item) => {
        entradas.push(item.entradas)
        saidas.push(item.saidas)
        saldoTotal.push(item.saldo)
      })

      setValues({
        date: month,
        receitas: entradas,
        despesas: saidas,
        saldo: saldoTotal,
      })
    }

    return () => {
      setValues(null)
    }
  }, [schema])

  return (
    <div>
      <h3>Receita e depesas dos mesês</h3>
      <Line
        data={data(date, receitas, despesas, saldo)}
        width={500}
        height={300}
        options={{
          maintainAspectRatio: true,
        }}
      />
    </div>
  )
}

export default LineChart
