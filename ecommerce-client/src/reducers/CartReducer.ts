import { CartItem } from "../types/CartItem";

export interface ICartAction {
  type: cartActionType;
  payload: CartItem | null;
}

export type CartState = {
  items: CartItem[];
  isNotificationOpen: boolean;
};

export enum cartActionType {
  ADD_ITEM,
  REMOVE_ITEM,
  CHANGE_QUANTITY,
  RESET_CART,
  CLOSE_NOTIFICATION,
  OPEN_NOTIFICATION
}

export const CartReducer = (state: CartState, action: ICartAction) => {
  const { type, payload } = action;

  switch (type) {
    case cartActionType.ADD_ITEM: {
      if (!payload) return state;

      const cartItemExists = state.items.find(
        (cartItem) => cartItem.product.id == payload?.product.id
      );

      let updateItems;

      if (!cartItemExists) {
        console.log("cartItemExists", cartItemExists);
        updateItems = [...state.items, payload];
      } else {
        updateItems = state.items.map((cartItem) =>
          cartItem.product.id === payload?.product.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + (payload.quantity || 1),
              }
            : cartItem
        );
      }
      return {
        items: updateItems,
        isNotificationOpen: true,
      }
    }

    case cartActionType.CHANGE_QUANTITY: {
      if (!payload) return state;

      const updatedItems = state.items
        .map((cartItem) => {
          if (cartItem.product.id === payload?.product.id) {
            const totalQuantity = cartItem.quantity + payload.quantity;
            if (totalQuantity <= 0) {
              return null;
            }
            return {
              ...cartItem,
              quantity: totalQuantity,
            };
          }
          return cartItem;
        })
        .filter((cartItem):cartItem is CartItem => cartItem !== null);

        return {
          ...state,
          items: updatedItems
        }
    }

    case cartActionType.REMOVE_ITEM: {
      if (!payload) return state;

      const updatedItems = state.items.filter(
        (cartItem) => cartItem.product.id !== payload?.product.id
      );

      return {
        ...state,
        items: updatedItems,
      };
    }

    case cartActionType.RESET_CART: {
      return {
        items: [],
        isNotificationOpen: false,
      };
    }

    case cartActionType.CLOSE_NOTIFICATION: {
      return {
        ...state,
        isNotificationOpen: false,
      };
    }

    case cartActionType.OPEN_NOTIFICATION: {
      return {
        ...state,
        isNotificationOpen: true,
      };
    }

    default:
      return state;
  }
};
