import {
  Paid,
  Favorite,
  ShoppingCart,
  Restaurant,
  DirectionsCar,
  Weekend,
  MenuBook,
  Help,
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
  }
  if (category === 'Outros') {
    return <Help />
  } else {
    return <p>error</p>
  }
}

export default WhichIcon
