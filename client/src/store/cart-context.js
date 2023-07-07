import React from "react";

// this are to be the items found in the cart. The items, totalamount etc
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  text: "",
  addText: (value) => {},
  addItem: (item) => {},
  removeItem: (uniqueId) => {},
  clearall: () => {},
});

export default CartContext;
