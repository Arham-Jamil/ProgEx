import CartContext from "./cart-context.js";
import { useReducer, useState } from "react";
import {v4 as uuidv4} from "uuid"

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// what is suppose to happen when the add or remove button are hit.
// this needs to be connected to the database
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // keeps price with respect to item coherent
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      // updatedItems = state.items.concat(action.item);
      updatedItems = [...state.items, action.item];
    } else {
      const updatedItem = {
        ...action.item,
        uniqueId: uuidv4, // Add a unique identifier to the item
      };
      // updatedItems = state.items.concat(action.item);
      updatedItems = [...state.items, action.item];
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.uniqueId === action.uniqueId
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount !== -1) {
      updatedItems = [...state.items];
      updatedItems.splice(existingCartItemIndex, 1)
    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
}

if (action.type === "ADD_TEXT") {
  console.log('cart provider add text type called');
  const { uniqueId, text } = action;
  const updatedItems = state.items.map((item) =>
    item.uniqueId === uniqueId ? { ...item, text } : item
  );

  return {
    ...state,
    items: updatedItems,
  };
}

  if (action.type === "CLEARALL") {
    return {
      items: [],
      totalAmount: 0,
    };
  }

  return defaultCartState;
};


const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (uniqueid) => {
    dispatchCartAction({ type: "REMOVE", uniqueid: uniqueid });
  };

  const clearAllItemsFromCartHandler = () => {
    dispatchCartAction({ type: "CLEARALL" });
  };
  
  const addTextToItem = (uniqueId, text) => {
    dispatchCartAction({ type: "ADD_TEXT", uniqueId, text });
  };


  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearall: clearAllItemsFromCartHandler,
    addText: addTextToItem 
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
