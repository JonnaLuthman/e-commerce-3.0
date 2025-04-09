import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { googleSearch } from "../../services/googleSearchService";
import { SearchResult } from "../../types/SearchResult";
import ProductContext from "../../contexts/ProductContext";
import { useNavigate } from "react-router";
import { getMatchedProducts } from "../../utils/matchProducts";
import { SearchContext } from "../../contexts/SearchContext";


export const Searchbar = () => {
  const { products } = useContext(ProductContext);
  const { setMatchedProducts, setUnmatchedResults, searchParam, setSearchParam } = useContext(SearchContext)

  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);

  const navigate = useNavigate()

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await googleSearch(searchParam);
      if (response.items) {
        setSearchResult(response.items);
      }
    } catch (error) {
      console.log("Could not fetch products from Google search API ")
    }
    navigate("/search")
  };
  
  useEffect(() => {
    if (!searchResult || searchResult.length === 0) {
      setMatchedProducts([]);
      return;
    }

    const { matchedProducts, unmatchedResults } = getMatchedProducts(products, searchResult)
    setMatchedProducts(matchedProducts);
    setUnmatchedResults(unmatchedResults);
  }, [searchResult, products]) 

  return (
    <div>
      <form onSubmit="submit" className="grid max-w-md mx-auto">
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
          value={searchParam}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchParam(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border bg-white border-gray-300 "
            placeholder="Find product"
            required
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="bg-white absolute end-2.5 bottom-2.5 hover:cursor-pointer focus:outline-none font-medium text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
