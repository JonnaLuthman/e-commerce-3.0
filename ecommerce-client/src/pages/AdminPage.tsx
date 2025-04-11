import { Products } from "../components/Products/Products";
import { Customers } from "../components/Customers/Customers";
import { Orders } from "../components/Orders/Orders";
import { OrderProvider } from "../contexts/OrderContext";
import { useState } from "react";
import { CustomerProvider } from "../contexts/CustomerContext";

type SubPage = "customers" | "products" | "orders";

export const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<SubPage>("orders");

  return (
    <div>
      <div className="text-sm font-medium text-center text-[var(--text-dark)] ">
        <ul className="flex flex-wrap -mb-px border-b border-[var(--text-dark)]">
          <li className="me-2">
            <button
              onClick={() => setActiveSection("orders")}
              className="inline-block p-4 rounded-t-lg hover:text-black hover:border-black"
            >
              Orders
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveSection("products")}
              className="inline-block p-4 rounded-t-lg hover:text-black hover:border-black"
            >
              Products
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveSection("customers")}
              className="inline-block p-4 rounded-t-lg hover:text-black hover:border-black"
            >
              Customers
            </button>
          </li>
        </ul>
      </div>

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
  );
};
