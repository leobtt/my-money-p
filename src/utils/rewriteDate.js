export const rewriteDate = (date) => {
  const month = date.split('-')[0]

  const format = (value) => {
    return `${value} de ${date.split('-')[1]}`
  }

  if (month === '01') {
    return format('Janeiro')
  }
  if (month === '02') {
    return format('Fevereiro')
  }
  if (month === '03') {
    return format('Março')
  }
  if (month === '04') {
    return format('Abril')
  }
  if (month === '05') {
    return format('Maio')
  }
  if (month === '06') {
    return format('Junho')
  }
  if (month === '07') {
    return format('Julho')
  }
  if (month === '08') {
    return format('Agosto')
  }
  if (month === '09') {
    return format('Setembro')
  }
  if (month === '10') {
    return format('Outubro')
  }
  if (month === 11) {
    return format('Novembro')
  }
  if (month === 12) {
    return format('Dezembro')
  }
}
