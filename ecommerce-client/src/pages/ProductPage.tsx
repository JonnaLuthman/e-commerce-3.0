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
      <section className="py-8 md:py-16 antialiased">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 text-left">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img className="w-full dark:hidden bg-white" src={product?.image} alt="" />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product?.name}
              </h1>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {product?.description}
              </p>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  {product?.price} sek
                </p>
              </div>
              <button
              onClick={() => {handleAddToCart(product!, 1)}}
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
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

              <Link to={"/"}>
                <button
                className="flex items-center justify-center rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >Back to products</button>
              </Link>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            </div>
          </div>

      </section>
    </>
  );
};
