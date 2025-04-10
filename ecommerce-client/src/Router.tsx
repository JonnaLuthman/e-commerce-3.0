import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { HomePage } from "./pages/HomePage"
import { ProductPage } from "./pages/ProductPage";
import { AdminPage } from "./pages/AdminPage";
import { Checkout } from "./pages/Checkout";
import { OrderDetailsPage } from "./pages/OrderDetailsPage";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { SearchResults } from "./pages/SearchResults";
import { AllProductsPage } from "./pages/AllProductsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/product/:id",
                element: <ProductPage />
            },
            {
                path: "/products",
                element: <AllProductsPage />
            },
            {
                path: "/admin",
                element: <AdminPage />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/admin/order/:id",
                element: <OrderDetailsPage />
            },
            {
                path: "/order-confirmation/:session_id",
                element: <OrderConfirmation />
            },
            {
                path: "/search",
                element: <SearchResults />
            }

        ]

    }
])