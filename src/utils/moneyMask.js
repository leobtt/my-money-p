export const moneyMask = (e) => {
  let value = e.target.value

  value = value + ''
  value = parseInt(value.replace(/[\D]+/g, ''))
  value = value + ''
  value = value.replace(/([0-9]{2})$/g, ',$1')

  if (value.length > 6 && value.length < 9) {
    value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }
  if (value.length >= 9) {
    value = value.replace(/([0-9]{3})([0-9]{3}),([0-9]{2}$)/g, '$1.$2,$3')
  }

  e.target.value = value
  if (value == 'NaN') e.target.value = ''
}
