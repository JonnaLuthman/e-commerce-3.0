import { Link, useParams } from "react-router";
import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";
import CartContext from "../contexts/CartContext";
import { cartActionType } from "../reducers/CartReducer";
import { Product } from "../types/Product";


export const ProductPage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const product = products.find((product) => product.id === Number(id));
  const { cartDispatch } = useContext(CartContext);

    const handleAddToCart = (product: Product, quantity: number) => {
      cartDispatch({
        type: cartActionType.ADD_ITEM,
        payload: { product, quantity },
      });
    };

  return (
    <>
      <section className="antialiased">
          <div className="grid grid-cols-2 text-left my-12">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto border-gray-600 border">
              <img className="w-full object-contain" src={product?.image} alt="" />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0 p-6">
              <h1 className="text-xl font-semibold text-[var(--text-dark) sm:text-2xl">
                {product?.name}
              </h1>
              <p className="mb-6 text-[var(--text-dark)">
                {product?.description}
              </p>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className=" text-[var(--text-dark) sm:text-3xl">
                  {product?.price} sek
                </p>
              </div>
              <button
              onClick={() => {handleAddToCart(product!, 1)}}
                className="text-[var(--text-dark) mt-10 sm:mt-4 hover: flex items-center justify-center py-2 rounded-full border px-5 py-2.5 hover:bg-[var(--third-color)] hover:text-[var(--text-dark)]"
              >
                <svg
                  className="w-8 h-8 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Add to cart
              </button>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <Link to={"/"}>
                <button
                className="flex items-center justify-center rounded-full border px-5 py-2.5 hover:bg-[var(--third-color)] hover:text-[var(--text-dark)]"
                >Back to products</button>
              </Link>

            </div>
          </div>

      </section>
    </>
  );
};
