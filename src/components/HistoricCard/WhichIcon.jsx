import {
  Paid,
  Favorite,
  ShoppingCart,
  Restaurant,
  DirectionsCar,
  Weekend,
  MenuBook,
} from '@mui/icons-material'

const WhichIcon = ({ category }) => {
  if (category === 'Saúde') {
    return <Favorite />
  }
  if (category === 'Compras') {
    return <ShoppingCart />
  }
  if (category === 'Alimentação') {
    return <Restaurant />
  }
  if (category === 'Lazer') {
    return <Weekend />
  }
  if (category === 'Estudos') {
    return <MenuBook />
  }
  if (category === 'Locomoção') {
    return <DirectionsCar />
  }
  if (category === 'Salário') {
    return <Paid />
  } else {
    return <p>error</p>
  }
}

export default WhichIcon
