export const data = (data, entradas, saidas, saldo) => {
  return {
    labels: data,
    datasets: [
      {
        label: 'Receita',
        data: entradas,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Despesa',
        data: saidas,
        fill: false,
        borderColor: '#742774',
      },
      {
        label: 'Saldo',
        data: saldo,
        fill: false,
        borderColor: '#742124',
      },
    ],
  }
}
