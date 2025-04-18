import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import { cartActionType } from "../../reducers/CartReducer";
import { Product } from "../../types/Product";
import { Link } from "react-router";
import { CartItem } from "../../types/CartItem";
import {
  CheckoutContext,
  checkoutPhases,
} from "../../contexts/CheckoutContext";

export const Cart = () => {
  const { cart, cartDispatch } = useContext(CartContext);
  const { phase, setPhase } = useContext(CheckoutContext);
  console.log(phase);

  const handleChangeQuantity = (product: Product, quantity: number) => {
    cartDispatch({
      type: cartActionType.CHANGE_QUANTITY,
      payload: { product, quantity },
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    cartDispatch({
      type: cartActionType.REMOVE_ITEM,
      payload: { product, quantity: 1 },
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
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center"></div>
      {totalSum === 0 ? (
        <div>
          <p>Your bag is empty</p>
          <Link to={"/products"}>
            <button className="items-center justify-center rounded-full border px-5 py-2.5 my-6 bg-[var(--primary-btn-color)] text-[var(--primary-btn-text)] hover:bg-[var(--primary-bg-color)] hover:text-[var(--primary-btn-color)]">
              Find our products here
            </button>
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl">
          <div className="bg-white border">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <h2 className="text-2xl pb-4 font-semibold border-b border-gray-300">
                Shopping Cart
              </h2>
              <div className="flow-root">
                {cart.map((cartItem: CartItem) => (
                  <ul className="my-8" key={cartItem.product.id}>
                    <li className="flex flex-row space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 border-b border-gray-300">
                      <div className="shrink-0">
                        <img
                          className="h-40 w-40 rounded-lg object-cover"
                          src={cartItem.product.image}
                          alt=""
                        />
                      </div>

                      <div className="relative flex flex-1 flex-col justify-around">

                        <div className="pr-8 sm:pr-5">
                          <p className="text-base font-semibold text-gray-900 justify-self-start">
                            {cartItem.product.name}
                          </p>
                        </div>



                          <div className="mt-4 flex items-center sm:mt-0 justify-between">
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right ">
                              {cartItem.product.price} sek
                            </p>

                            <div className="sm:order-1">
                              <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                <button
                                  onClick={() =>
                                    cartItem.product.id !== null &&
                                    handleChangeQuantity(cartItem.product, -1)
                                  }
                                  className="flex items-center justify-center rounded-l-md bg-[var(--third-color)] px-4 transition hover:bg-[var(--primary-btn-color)] hover:text-white"
                                >
                                  -
                                </button>
                                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                  {cartItem.quantity}
                                </div>
                                <button
                                  onClick={() =>
                                    cartItem.product.id !== null &&
                                    handleChangeQuantity(cartItem.product, 1)
                                  }
                                  className="flex items-center justify-center rounded-r-md bg-[var(--third-color)] px-4 transition hover:bg-[var(--primary-btn-color)] hover:text-[var(--primary-btn-text)]"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button
                            onClick={() =>
                              handleRemoveFromCart(cartItem.product)
                            }
                            type="button"
                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 "
                          ></button>
                        </div>
                    </li>
                  </ul>
                ))}

                <button
                  onClick={handleResetCart}
                  className="flex items-center justify-center rounded-md px-3 py-3 my-[2rem] font-semibold bg-[var(--primary-btn-color)] text-[var(--primary-btn-text)] hover:bg-[var(--third-color)] hover:text-[var(--primary-btn-color)]"
                >
                  Empty cart
                </button>

                <div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-l pl-2 font-medium text-gray-900">
                      Total
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      <span className="text-xs font-normal text-gray-400">
                        sek
                      </span>{" "}
                      {totalSum}
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setPhase(checkoutPhases.second)}
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-[var(--primary-btn-color)] px-6 py-4 text-lg font-semibold text-[var(--primary-btn-text)] transition-all duration-200 ease-in-out focus:shadow "
                  >
                    Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
