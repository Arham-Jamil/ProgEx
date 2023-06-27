import React from "react";

// this are to be the items found in the cart. The items, totalamount etc
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearall: () => {},
});

export default CartContext;
