import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { googleSearch } from "../../services/googleSearchService";
import { ISearchResult } from "../../types/SearchResult";
import ProductContext from "../../contexts/ProductContext";
import { Product } from "../../types/Product";
import { Link } from "react-router";

export const Searchbar = () => {
  const { products } = useContext(ProductContext);
  const [searchParam, setSearchParam] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ISearchResult[] | null>(
    null
  );
  const [matchedProducts, setMatchedProducts] = useState<Product[] | null>(
    null
  );

  const cleanText = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, " ")
      .trim();

  useEffect(() => {
    if (!searchResult || !products) return;

    const matchedProducts = products.filter((product) => {
      const nameWords = cleanText(product.name)
        .split(" ")
        .filter((word) => word.length > 2);

      return searchResult.some((searchItem) => {
        const title = cleanText(searchItem.title || searchItem.htmlTitle || "");
        const commonWords = nameWords.filter((word) => title.includes(word));
        return commonWords.length >= 2;
      });
    });

    console.log("Matched products:", matchedProducts);
    setMatchedProducts(matchedProducts);
  }, [searchResult, products]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    const response = await googleSearch(searchParam);
    console.log(response.items);
    if (response.items) {
      setSearchResult(response.items);
    }
  };

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
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {matchedProducts &&
        matchedProducts.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </div>
        ))}
    </div>
  );
};
