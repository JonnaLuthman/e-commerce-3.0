import { Products } from "../components/Products/Products"
import { Customers } from "../components/Customers/Customers"
import { Orders } from "../components/Orders/Orders"
import { OrderProvider } from "../contexts/OrderContext"
import { useState } from "react";
import { CustomerProvider } from "../contexts/CustomerContext";

type SubPage = "customers" | "products" | "orders";

export const AdminPage = () => {
    const [activeSection, setActiveSection] = useState<SubPage>("orders");

    return (
        <div>
            <nav>
                <button onClick={() => setActiveSection("orders")}>Orders</button>
                <button onClick={() => setActiveSection("products")}>Products</button>
                <button onClick={() => setActiveSection("customers")}>Customers</button>
            </nav>

            {activeSection === "orders" && (
                <OrderProvider>
                    <Orders />
                </OrderProvider>
            )}
            {activeSection === "products" && <Products />}
            {activeSection === "customers" && (
                <CustomerProvider>
                    <Customers />
                </CustomerProvider>
            )}
        </div>
    )
}
