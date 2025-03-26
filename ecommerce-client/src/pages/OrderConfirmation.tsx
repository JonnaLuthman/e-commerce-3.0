import { useOrders } from "../hooks/useOrders";
import { useContext, useEffect, useState } from "react";
import { Order, OrderUpdate } from "../types/Order";
import { useSearchParams } from "react-router";
import { removeFromLocalStorage } from "../utils/localStorageUtils";
import CartContext from "../contexts/CartContext";
import { cartActionType } from "../reducers/CartReducer";

export const OrderConfirmation = () => {
  const { cartDispatch } = useContext(CartContext);
  const { fetchOrderByPaymentIdHandler, updateOrderHandler } = useOrders();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
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

    };

    fetchData();
  }, []);

  useEffect(() => {
    if (order?.id) {
      updateOrder_orderConfirmation();
    }
  })

  return (
    <div>
      <h1>Order Confirmation</h1>
      {order && (
        <div>
          <p>Thank you for your order!</p>
          <p>Your order number is: {order.id}</p>
          <p>Total amount: {order.total_price} €</p>
        </div>
      )}
    </div>
  );
};
