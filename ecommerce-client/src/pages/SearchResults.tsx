import ProductCard from "../components/Products/ProductCard";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import ProductContext from "../contexts/ProductContext";
import { Link } from "react-router";

export const SearchResults = () => {
  const { matchedProducts, unmatchedResults, searchParam } = useContext(SearchContext);
  const { products } = useContext(ProductContext)
  console.log("unmatchedResults in SearchResults", unmatchedResults)
  console.log("matchedProducts in SearchResults", matchedProducts)

  return (
    <div className="min-h-screen">
      <section className="grid grid-cols-2 md:grid-cols-3 border-t border-l ">
        {matchedProducts.length === 0 ? (
          <>
          <div className="border-r border-b content-center">
            <h1 className="text-2xl font-bold">No products found for "{searchParam}"</h1>
            <p>See our other products</p>
            <button className="my-8 rounded-full border px-5 py-3 hover:bg-[var(--primary-btn-color)] hover:text-[var(--primary-btn-text)]">
              <Link to="/">Go back to products</Link>
              </button>
            </div>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        ) : (
          <>
          <div className="border-r border-b content-center">
            <p className="text-xl font-bold">{matchedProducts.length} products were found for "{searchParam}"</p>
          </div>
            {matchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </>
        )}
      </section>
    </div>
  );
};
