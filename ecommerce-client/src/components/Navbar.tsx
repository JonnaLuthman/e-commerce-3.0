import { useContext } from "react";
import { NavLink } from "react-router";
import CartContext from "../contexts/CartContext";
import { Searchbar } from "./Start/Searchbar";
import { AddedToCart } from "./Checkout/AddedToCart";
import { cartActionType } from "../reducers/CartReducer";

export const Navbar = () => {
  const { cartQuantity, cartDispatch } = useContext(CartContext);
  const { isNotificationOpen }= useContext(CartContext)
  
  const handleClick = () => {
    cartDispatch({
      type: cartActionType.OPEN_NOTIFICATION,
      payload: null,
    });
  };
  
  return (
    <div className="relative">
      <nav className="w-full bg-[var(--bg-primary-color)] border-b border-t border-black border-solid p-[2rem] color-black fixed z-1">
        <ul className="m-0 flex gap-[3rem] justify-between items-center ml-[0]">
          <div className="flex gap-[3rem]">
            <li className="color-black ">
              <NavLink
                className="flex gap-[3rem] group transition-all duration-300 ease-in-out"
                to={"/"}
              >
                <span className="bg-left-bottom font-semibold bg-gradient-to-r from-black to-black bg-[length:0%_0.7px] bg-no-repeat group-hover:bg-[length:100%_0.7px] transition-all duration-600 ease-out">
                  HOME
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-[3rem] group transition-all duration-300 ease-in-out"
                to={"/products"}
              >
                   <span className="bg-left-bottom font-semibold bg-gradient-to-r from-black to-black bg-[length:0%_0.7px] bg-no-repeat group-hover:bg-[length:100%_0.7px] transition-all duration-600 ease-out">
                   PRODUCTS
                </span>
                
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-[3rem] group transition-all duration-300 ease-in-out"
                to={"/about"}
              >
                   <span className="bg-left-bottom font-semibold bg-gradient-to-r from-black to-black bg-[length:0%_0.7px] bg-no-repeat group-hover:bg-[length:100%_0.7px] transition-all duration-600 ease-out">
                   ABOUT
                </span>
                
              </NavLink>
            </li>
          </div>
          <li className="w-full">
          <Searchbar/>
          </li>
          <li>
              <button
                className="relative cursor-pointer"
                onClick={handleClick}
              >
                <svg
                  className="size-8 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 22"
                >
                  <path
                    fill="currentColor"
                    d="M8,3V7H21l-2,7H8v2H18a1,1,0,0,1,0,2H7a1,1,0,0,1-1-1V4H4A1,1,0,0,1,4,2H7A1,1,0,0,1,8,3ZM6,20.5A1.5,1.5,0,1,0,7.5,19,1.5,1.5,0,0,0,6,20.5Zm9,0A1.5,
      1.5,0,1,0,16.5,19,1.5,1.5,0,0,0,15,20.5Z"
                  />
                </svg>
                <span className="absolute -top-[7px] -right-[7px] bg-white border text-black text-[12px] font-bold rounded-full flex items-center justify-center w-[18px] h-[18px]">
                  {cartQuantity}
                </span>
              </button>
            {isNotificationOpen && <AddedToCart /> }
          </li>
        </ul>
      </nav>
    </div>
  );
};
