import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);

      if (existingProduct && existingProduct.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((product) => product.id !== productId);
      }
    });
  };

  const showCart = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const totalCart = () => {
    const total = cart.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0);
    console.log("Total:", total)
    return total
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, showCart, open, totalCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
