import { useOrders } from "../hooks/useOrders";
import { useContext, useEffect, useState } from "react";
import { Order, OrderUpdate } from "../types/Order";
import { Link, useParams } from "react-router";
import { removeFromLocalStorage } from "../utils/localStorageUtils";
import CartContext from "../contexts/CartContext";
import { cartActionType } from "../reducers/CartReducer";

export const OrderConfirmation = () => {
  const { cartDispatch } = useContext(CartContext);
  const { fetchOrderByPaymentIdHandler, updateOrderHandler } = useOrders();
  const { session_id } = useParams();
  const [order, setOrder] = useState<Order>();

  console.log("session id", session_id);

  const getOrder_orderConfirmation = async () => {
    if (!session_id) return;

    const data = await fetchOrderByPaymentIdHandler(session_id);
    console.log("Data in order confirmation", data);
    setOrder(data);
  };

  const updateOrder_orderConfirmation = async () => {
    if (!session_id || !order?.id) return;

    const updatedOrder: OrderUpdate = {
      payment_status: "Paid",
      payment_id: session_id as string,
      order_status: "Received",
    };
    await updateOrderHandler(order.id, updatedOrder);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getOrder_orderConfirmation();

      cartDispatch({
        type: cartActionType.RESET_CART,
        payload: [],
      });

      removeFromLocalStorage("cart");
      removeFromLocalStorage("customer");
      removeFromLocalStorage("secret");
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (order?.id) {
      updateOrder_orderConfirmation();
    }
  });

  return (
    <div>
      <section className="py-8 md:py-16">
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-[var(--text-dark)] sm:text-2xl mb-2">
            Thanks for your order!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
            Your order{" "}
            <a
              href="#"
              className="font-medium text-[var(--text-dark)] hover:underline"
            >
              {order?.id}
            </a>{" "}
            has been received. We will notify you by email once your order has
            been shipped.
          </p>
          <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 mb-6 md:mb-8">
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Name
              </dt>
              <dd className="font-medium text-[var(--text-dark)] sm:text-end">
                {order?.customer_firstname} {order?.customer_lastname}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Address
              </dt>
              <dd className="font-medium text-[var(--text-dark)] sm:text-end">
                {order?.customer_street_address}, {order?.customer_postal_code}{" "}
                {order?.customer_city}, {order?.customer_firstname}{" "}
                {order?.customer_country}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Phone
              </dt>
              <dd className="font-medium text-[var(--text-dark)] sm:text-end">
                {order?.customer_phone}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Email
              </dt>
              <dd className="font-medium text-[var(--text-dark)] sm:text-end">
                {order?.customer_email}
              </dd>
            </dl>
          </div>
          <Link
            to={"/"}
            className="flex items-center space-x-4 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Return to shopping
          </Link>
        </div>
      </section>
    </div>
  );
};
