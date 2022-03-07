const rewriteValue = ({ value, revenue }) => {
  const checkNegativeValue = value?.toString().startsWith('-')

  const formatValue = checkNegativeValue
    ? parseFloat(value?.toString().split('-')[1]).toFixed(2)
    : value?.toFixed(2)

  const formatComma = formatValue?.toString().replace(/[.]/g, ',')

  const checkValueColor = (color) => {
    const zeroValue = value?.toString().startsWith('0')

    if (zeroValue) {
      return 'zero'
    } else if (revenue) {
      return 'greenValue'
    } else {
      return 'redValue'
    }
  }

  return <span className={checkValueColor(value)}>R$ {formatComma}</span>
}

export default rewriteValue
