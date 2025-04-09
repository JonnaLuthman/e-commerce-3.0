import { createContext, PropsWithChildren, useState } from "react";
import { Product } from "../types/Product"
import { SearchResult } from "../types/SearchResult"

export type searchContext = {
    matchedProducts: Product[],
    unmatchedResults: SearchResult[],
    searchParam: string;
    setMatchedProducts: (products: Product[]) => void;
    setUnmatchedResults: (results: SearchResult[]) => void;
    setSearchParam: (param: string) => void;
}

export const SearchContext = createContext<searchContext>({
    matchedProducts: [],
    unmatchedResults: [],
    searchParam: "",
    setMatchedProducts: () => {},
    setUnmatchedResults: () => {},
    setSearchParam: () => {}
})

export const SearchProvider = ({ children }: PropsWithChildren) => {
    const [ matchedProducts, setMatchedProducts ] = useState<Product[]>([])
    const [ unmatchedResults, setUnmatchedResults ] = useState<SearchResult[]>([])
    const [ searchParam, setSearchParam ] = useState<string>("")

    return (
        <SearchContext.Provider value={{matchedProducts, setMatchedProducts, unmatchedResults, setUnmatchedResults, searchParam, setSearchParam}}>
            {children}
        </SearchContext.Provider>
    )
}