import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./Router";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import { SearchProvider } from "./contexts/SearchContext";

function App() {
  return (
    <>
      <ProductProvider>
        <SearchProvider>
          <CartProvider>
            <CustomerProvider>
              <CheckoutProvider>
                <RouterProvider router={router}></RouterProvider>
              </CheckoutProvider>
            </CustomerProvider>
          </CartProvider>
        </SearchProvider>
      </ProductProvider>
    </>
  );
}

export default App;
