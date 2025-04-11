import { useContext, useEffect } from "react";
import CartContext from "../../contexts/CartContext";
import { Link } from "react-router";
import { cartActionType } from "../../reducers/CartReducer";
import { Product } from "../../types/Product";

export const AddedToCart = () => {
  const { cart, cartQuantity, cartDispatch, isNotificationOpen } = useContext(CartContext);

  const totalSum = cart.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );

  useEffect(() => {
    if (isNotificationOpen) {
      const timer = setTimeout(() => {
        cartDispatch({ type: cartActionType.CLOSE_NOTIFICATION, payload: null });
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isNotificationOpen, cartDispatch]);

  const handleClick = () => {
    cartDispatch({
      type: cartActionType.CLOSE_NOTIFICATION,
      payload: null,
    });
  };


  const handleRemoveFromCart = (product: Product) => {
    cartDispatch({
      type: cartActionType.REMOVE_ITEM,
      payload: { product, quantity: 1 },
    });
  };

  return (
    <section className="absolute right-0 top-20 w-[450px] max-h-[90vh] bg-white shadow-lg border rounded-bl-xl overflow-y-auto z-50">
      <div className="flex flex-col p-10">
        <div className="flex items-center mb-3 justify-between">
          <h2 className="text-[#191919] text-xl font-medium leading-[30px]">
            Shopping Cart ({cartQuantity})
          </h2>
          <button onClick={handleClick} className="hover:cursor-pointer">
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="22.5" cy="22.5" r="22.5" fill="white"></circle>
              <path
                d="M28.75 16.25L16.25 28.75"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M16.25 16.25L28.75 28.75"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>

        {cart.map((cartItem) => (
          <div
            key={cartItem.product.id}
            className="flex gap-2 mb-6 items-center border-b border-gray-300 pb-4"
          >
            <img width="120" height="100" src={cartItem.product.image} alt="" />
            <div>
              <h3 className="w-[216px] text-[#191919] text-sm font-normal text-left leading-[21px]">
                {cartItem.product.name}
              </h3>
              <p className="text-left">
                <span className="relative justify-start text-[#7f7f7f] text-sm font-normal leading-[21px]">
                  {cartItem.quantity} x{" "}
                </span>
                <span className="relative justify-start text-[#191919] text-sm font-semibold leading-[16.80px]">
                  {cartItem.product.price} sek
                </span>
              </p>
            </div>
            <button
              className="hover:cursor-pointer"
              onClick={() => handleRemoveFromCart(cartItem.product)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_629_6652)">
                  <path
                    d="M12 23C18.0748 23 23 18.0748 23 12C23 5.92525 18.0748 1 12 1C5.92525 1 1 5.92525 1 12C1 18.0748 5.92525 23 12 23Z"
                    stroke="#CCCCCC"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    d="M16 8L8 16"
                    stroke="#666666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M16 16L8 8"
                    stroke="#666666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        ))}

        <p className="font-semibold text-left pb-4">Product added to cart!</p>
        <div className="mt-auto">
          <div className=" py-6 bg-white flex justify-between items-center">
            <span className="relative justify-start text-[#191919] text-base font-semibold leading-normal">
              Total:
            </span>
            <span className="relative justify-start text-[#191919] text-base font-semibold leading-tight">
              {totalSum} sek
            </span>
          </div>
          <Link to={"/checkout"}>
          <button
            onClick={handleClick}
            className="w-[376px] group inline-flex w-full items-center justify-center rounded-md bg-[var(--primary-btn-color)] px-6 py-4 text-lg font-semibold text-[var(--primary-btn-text)] transition-all duration-200 ease-in-out focus:shadow leading-tight"
          >
            Go to cart
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
          </Link>
        </div>
      </div>
    </section>
  );
};
