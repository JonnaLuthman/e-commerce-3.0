import { Product } from "../types/Product";
import { SearchResult } from "../types/SearchResult";

export const cleanText = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, " ")
      .trim();

export const getMatchedProducts = (products: Product[], searchResults: SearchResult[]) : {
    matchedProducts: Product[],
    unmatchedResults: SearchResult[]
} => {
    const matchedProducts = products.filter((product) => {
        const product_keywords = cleanText(product.name)
        .split(' ')
        .filter(word => word.length > 2);

    return searchResults.some((searchItem) => {
    const searchItem_keywords = cleanText(searchItem.title || searchItem.htmlTitle || '');
    const matchedWords = product_keywords.filter(keyword => searchItem_keywords.includes(keyword));
    return matchedWords.length >= 2;
    });
});

const unmatchedResults = searchResults.filter((searchItem) => {
    const searchItem_keywords = cleanText(searchItem.title || searchItem.htmlTitle || '');
    return !matchedProducts.some(product => {
        const productName = cleanText(product.name )
        return searchItem_keywords.includes(productName)
    })
})

return {matchedProducts, unmatchedResults}

};

