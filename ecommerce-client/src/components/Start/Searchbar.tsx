import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { googleSearch } from "../../services/googleSearchService";
import { SearchResult } from "../../types/SearchResult";
import ProductContext from "../../contexts/ProductContext";
import { Link } from "react-router";
import { Product } from "../../types/Product";
import { getMatchedProducts } from "../../utils/matchProducts";

export const Searchbar = () => {
  const { products } = useContext(ProductContext);
  const [searchParam, setSearchParam] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [matchedProducts, setMatchedProducts] = useState<Product[] | null>(
    null
  );
  const [unmatchedResults, setUnmatchedResults] = useState<SearchResult[] | null>(
    null
  );

  
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await googleSearch(searchParam);
      if (response.items) {
        setSearchResult(response.items);
      }
    } catch (error) {
      console.log("Could not fetch products from Google search API ")
    } finally {
      setSearchParam("")
    }
  };
  
  useEffect(() => {
    if (!searchResult || searchResult.length === 0) {
      setMatchedProducts([]);
      return;
    }

    const { matchedProducts, unmatchedResults } = getMatchedProducts(products, searchResult)
    setMatchedProducts(matchedProducts);
    setUnmatchedResults(unmatchedResults);
    console.log(searchResult)
    console.log(matchedProducts)
  }, [searchResult, products]) 

  return (
    <div>
      <form action="submit" className="grid max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchParam(e.target.value);
            }}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sök produkt"
            required
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="bg-white absolute end-2.5 bottom-2.5 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>

      {unmatchedResults &&
        unmatchedResults.map((searchItem) => (
          <div key={searchItem.htmlTitle}>
            <p>{searchItem.htmlTitle}</p>
            <p>Product not available</p>
          </div>
        ))}

      {
      // matchedProducts?.length === 0 ? (
      //   <p>No products found</p>
      // ) : (
        matchedProducts?.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </div>
        ))
      // )
      }
    </div>
  );
};
