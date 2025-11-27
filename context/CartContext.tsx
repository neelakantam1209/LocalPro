import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (workerId: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const local = localStorage.getItem('cart');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    if (cartItems.some(i => i.workerId === item.workerId)) {
      showToast('Service already in cart', 'info');
      return;
    }
    setCartItems(prev => [...prev, item]);
    showToast(`${item.serviceName} added to cart`, 'success');
  };

  const removeFromCart = (workerId: number) => {
    setCartItems(prev => prev.filter(i => i.workerId !== workerId));
    showToast('Removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};