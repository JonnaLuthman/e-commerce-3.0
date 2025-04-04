import { Link } from "react-router";
import { Product } from "../../types/Product";
import { useContext } from "react";
import { cartActionType } from "../../reducers/CartReducer";
import CartContext from "../../contexts/CartContext";

type ShowProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ShowProductCardProps) => {
  const { id, name, price, image } = product;
  const { cartDispatch } = useContext(CartContext);

  const handleAddToCart = (product: Product, quantity: number) => {
    cartDispatch({
      type: cartActionType.ADD_ITEM,
      payload: { product, quantity },
    });
  };

  return (
    <section className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div>
        <Link
          to={`/product/${id}`}
          className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        >
          <img
            className="peer absolute top-0 right-0 h-full w-full object-cover"
            src={image}
            alt={name}
            width="282"
          />
        </Link>
        <h2 className="text-xl tracking-tight text-slate-900">{name}</h2>
        <div>
          <p className="text-2xl font-bold text-slate-900">{price} sek</p>
        </div>
      </div>
      <button
        className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => handleAddToCart(product, 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Add to cart
      </button>
    </section>
  );
};

export default ProductCard;
