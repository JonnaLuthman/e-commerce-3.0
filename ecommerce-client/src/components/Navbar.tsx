import { useContext } from "react";
import { NavLink } from "react-router";
import CartContext from "../contexts/CartContext";

export const Navbar = () => {
  const { cartQuantity } = useContext(CartContext);
  return (
    <>
      <nav>
        <ul>
          <div className="nav-links">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/admin"}>Admin</NavLink>
            </li>
          </div>
          <li>
            <NavLink to={"/checkout"}>
              <button className="cart-button">
                <svg
                  className="cart-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 22"
                >
                  <path
                    fill="currentColor"
                    d="M8,3V7H21l-2,7H8v2H18a1,1,0,0,1,0,2H7a1,1,0,0,1-1-1V4H4A1,1,0,0,1,4,2H7A1,1,0,0,1,8,3ZM6,20.5A1.5,1.5,0,1,0,7.5,19,1.5,1.5,0,0,0,6,20.5Zm9,0A1.5,
      1.5,0,1,0,16.5,19,1.5,1.5,0,0,0,15,20.5Z"
                  />
                </svg>
                <span className="cart-quantity">{cartQuantity}</span>
              </button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
