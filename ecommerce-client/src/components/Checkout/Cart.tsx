import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import { cartActionType } from "../../reducers/CartReducer";
import { Product } from "../../types/Product";
import { Link } from "react-router";
import { CartItem } from "../../types/CartItem";

export const Cart = () => {
  const { cart, cartDispatch } = useContext(CartContext);

  const handleChangeQuantity = (product: Product, quantity: number) => {
    cartDispatch({
      type: cartActionType.CHANGE_QUANTITY,
      payload: { product, quantity },
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    cartDispatch({
      type: cartActionType.REMOVE_ITEM,
      payload: product,
    });
  };

  const handleResetCart = () => {
    cartDispatch({
      type: cartActionType.RESET_CART,
      payload: null,
    });
  };

  const totalSum = cart.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );
  return (
    <div>
      <h2>Cart</h2>
      {totalSum === 0 ? (
        <div>
          <p>Your bag is empty</p>
          <Link to={"/"}>
            <button>Find our products here</button>
          </Link>
        </div>
      ) : (
        <div>
          {cart.map((cartItem: CartItem) => (
            <div key={cartItem.product.id} className="cart-wrapper">
              <h3>{cartItem.product.name}</h3>
              <div className="cart-item">
                <button
                  onClick={() =>
                    cartItem.product.id !== null &&
                    handleChangeQuantity(cartItem.product, 1)
                  }
                >
                  +
                </button>
                <p>x {cartItem.quantity}</p>
                <button
                  onClick={() =>
                    cartItem.product.id !== null &&
                    handleChangeQuantity(cartItem.product, -1)
                  }
                >
                  -
                </button>
                <p>{cartItem.product.price} sek</p>
                <button
                  onClick={() => handleRemoveFromCart(cartItem.product)}
                  className="bg-red-700 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-wrapper">
            <h3>Bag total</h3>
            <h3>Total: {totalSum} kr</h3>
          </div>
          <button onClick={handleResetCart}>Reset Cart</button>
          <button type="submit">Checkout</button>
        </div>
      )}
      </div>
  );
};
