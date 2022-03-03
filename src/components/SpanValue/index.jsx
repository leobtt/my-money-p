const rewriteValue = ({ value, revenue }) => {
  const checkNegativeValue = value.toString().startsWith('-')

  const formatValue = checkNegativeValue
    ? value.toString().split('-')[1]
    : value

  const checkValueColor = (color) => {
    const zeroValue = value.toString().startsWith('0')

    if (zeroValue) {
      return 'zero'
    } else if (revenue) {
      return 'greenValue'
    } else {
      return 'redValue'
    }
  }

  return (
    <span className={checkValueColor(value)}>
      R$ {parseFloat(formatValue).toFixed(2)}
    </span>
  )
}

export default rewriteValue
