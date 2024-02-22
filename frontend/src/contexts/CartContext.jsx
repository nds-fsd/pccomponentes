import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProductsCount, setCartProductsCount] = useState(0);

  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem('CartProducts')) || [];
    setCartProductsCount(cartProducts.length);
  }, []);

  return <CartContext.Provider value={{ cartProductsCount, setCartProductsCount }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
