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
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              onClick={() => setActiveSection("orders")}
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Orders
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveSection("products")}
              className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
              aria-current="page"
            >
              Products
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveSection("customers")}
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
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
