import { useContext, useState } from "react";
import ProductContext from "../../contexts/ProductContext";
import { Pagination } from "../../utils/Pagination";
import ProductCard from "./ProductCard";

export const DisplayProducts = () => {
  const { products } = useContext(ProductContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const indexOfLastOrder = currentPage * productsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - productsPerPage;
  const currentProducts = products.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 border-t border-l">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      <Pagination
        itemsPerPage={productsPerPage}
        totalItems={products.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};
