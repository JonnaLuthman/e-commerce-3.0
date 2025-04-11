import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { CartReducer, CartState, ICartAction } from "../reducers/CartReducer";
import { CartItem } from "../types/CartItem";
import { getFromLocalStorage, saveTolocalStorage } from "../utils/localStorageUtils";

export interface ICartContext {
  cart: CartItem[];
  cartDispatch: Dispatch<ICartAction>;
  cartQuantity: number,
  totalSum: number,
  isNotificationOpen: boolean
}

const CartContext = createContext<ICartContext>({
  cart: [],
  cartDispatch: () => null,
  cartQuantity: 0,
  totalSum: 0,
  isNotificationOpen: false
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartState, cartDispatch]: [CartState, Dispatch<ICartAction>] = useReducer(CartReducer, undefined, () => {

    const cachedItems = getFromLocalStorage('cart');

    return {
      items: cachedItems ?? [],
      isNotificationOpen: false,
    };
  });

const { items, isNotificationOpen } = cartState;

const totalSum = items.reduce(
  (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
  0
);

const cartQuantity = items.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)

  useEffect(() => {
    saveTolocalStorage('cart', items)
  }, [items])

  return (
    <CartContext.Provider value={{ cart: items, cartDispatch, cartQuantity, totalSum, isNotificationOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;