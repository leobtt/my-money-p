const arrayMes = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]
export const rewriteDateCard = (month, day) => {
  return `${day} de ${arrayMes[month]}`
}
