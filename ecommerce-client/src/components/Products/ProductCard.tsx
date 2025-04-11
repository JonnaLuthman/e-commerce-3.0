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
    <section className="group flex flex-col border-b border-r bg-[var(--secondary-color)] ">
      <div className="flex-1 bg-white ">
        <Link
          to={`/product/${id}`}
          className="relative mx-3 mt-3 flex overflow-hidden "
        >
          <img
            className="w-full object-contain min-h-[40vh]"
            src={image}
            alt={name}
          />
        </Link>
      </div>
      <div className="h-[8rem] py-[1.5rem]">
        <h2 className="text-m tracking-tight text-slate-900]">{name}</h2>
        <p className="text-m font-bold text-slate-900">{price} sek</p>
      </div>
      <button
        className="mt-auto px-5 py-2.5 text-center text-sm font-medium text-[var(--secondary-color)] bg-[var(--btn-bg-color)] group-hover:bg-[var(--primary-btn-color)] transition-all duration-300 ease-in-out h-[3rem] cursor-pointer"
        onClick={() => handleAddToCart(product, 1)}
      >
        Add to cart
      </button>
    </section>
  );
};

export default ProductCard;
