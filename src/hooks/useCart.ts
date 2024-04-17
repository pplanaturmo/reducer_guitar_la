import { useEffect, useState } from "react";
import type { CartItem, Guitar } from "../types/types";

export const useCart = () => {
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

 
  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1;
  const STOCK = 6;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(JSON.stringify(cart));
  }, [cart]);

  function addToCart(item : Guitar ) {
    const itemIndex = cart.findIndex((element) => element.id === item.id);

    if (itemIndex < 0) {
      //no existe
      const newItem : CartItem = { ...item,quantity : 1}
       
      setCart([...cart, newItem]);
    } else {

      if (cart[itemIndex].quantity < STOCK) {
        const updatedCart = [...cart];
        updatedCart[itemIndex].quantity++;
        setCart(updatedCart);
      }
    }
  }

  function removeFromCart(id :Guitar['id']) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id :Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < STOCK) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        return item;
      }
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id :Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        return item;
      }
    });

    setCart(updatedCart);
  }

  function emptyCart() {
    const empty : CartItem[] = [];
    setCart(empty);
  }

  //derived state



  return {
   
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    emptyCart,
  
  };
};
