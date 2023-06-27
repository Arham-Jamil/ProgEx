import { Fragment, useContext } from "react"
import CartContext from ".././store/cart-context"
import CartItem from "../components/cart/CartItem"

const KitchenOrders = () =>{
 const{items} = useContext(CartContext)


 return(
    <Fragment>
        <ul>
        {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          //onRemove={cartItemRemoveHandler.bind(null, item.id)}
          //onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
        </ul>
    </Fragment>
 )
}

export default KitchenOrders