import { db } from "../data/db";
import { CartItem, Guitar } from "../types/types";

export type CartActions =
  | {
      type: "addToCart";
      payload: { item: Guitar };
    }
  | {
      type: "removeFromCart";
      payload: { id: Guitar["id"] };
    }
  | {
      type: "increaseQuantity";
      payload: { id: Guitar["id"] };
    }
  | {
      type: "decreaseQuantity";
      payload: { id: Guitar["id"] };
    }
  | {
      type: "emptyCart";
    };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

const MIN_ITEMS = 1;
const STOCK = 6;

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "addToCart") {
    let updatedCart: CartItem[] = [];
    const itemExists = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );

    if (itemExists) {
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < STOCK) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "removeFromCart") {
    const updatedCart = state.cart.filter(
      (item) => item.id !== action.payload.id
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "increaseQuantity") {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < STOCK) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        return item;
      }
    });

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "decreaseQuantity") {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        return item;
      }
    });

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "emptyCart") {
    return {
      ...state,
      cart: [],
    };
  }
  return state;
};
