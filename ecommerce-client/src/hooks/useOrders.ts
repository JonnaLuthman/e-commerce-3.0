import { createOrder, deleteOrderItem, fetchOrderByPaymentId, updateOrderItem } from "../services/orderService";
import { updateOrder } from "../services/orderService";
import { useState } from "react";
import {
  deleteOrder,
  fetchOrderById,
  fetchOrders,
} from "../services/orderService";
import { OrderCreate, OrderUpdate } from "../types/Order";
import { OrderItemUpdate } from "../types/Order";
import { CartItem } from "../types/CartItem";
import { getFromLocalStorage } from "../utils/localStorageUtils";

export const useOrders = () => {
  const [error, setError] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);

  const fetchOrdersHandler = async () => {
    setIsLoading(true);
    try {
      const data = await fetchOrders();
      return data;
    } catch (error) {
      setError("Error: Failed to get orders");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderByIdHandler = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await fetchOrderById(id);
      return data;
    } catch (error) {
      setError("Error: Failed to get order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const fetchOrderByPaymentIdHandler = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await fetchOrderByPaymentId(id);
      return data;
    } catch (error) {
      setError("Error: Failed to get order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrderHandler = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteOrder(id);
    } catch (error) {
      setError("Error: Failed to delete order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderHandler = async (id: number, payload: OrderUpdate) => {
    setIsLoading(true);
    try {
      const data = await updateOrder(id, payload);
      console.log("data updateOrderHandler", data)
      return data;
    } catch (error) {
      setError("Error: Failed to udate order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createOrderHandler = async (payload: OrderCreate) => {
    setIsLoading(true);
    try {
      const data = await createOrder(payload);
      return data;
    } catch (error) {
      setError("Error: Failed to create order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderItemHandler = async (id: number, payload: OrderItemUpdate) => {
    setIsLoading(true);
    try {
      const data = await updateOrderItem(id, payload);
      return data;
    } catch (error) {
      setError("Error: Failed to udate order item");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrderItemHandler = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteOrderItem(id);
    } catch (error) {
      setError("Error: Failed to delete order item");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

    const transformProducts_checkout = () => {
      const cart = getFromLocalStorage("cart");
  
      if (!cart) return;
      return cart.map((cartItem: CartItem) => ({
        product_id: cartItem.product.id,
        product_name: cartItem.product.name,
        quantity: cartItem.quantity,
        unit_price: cartItem.product.price,
      }));
    };

  const createOrder_checkout = async (customerId: number) => {
    const newOrder: OrderCreate = {
      customer_id: customerId,
      payment_status: "Unpaid",
      payment_id: "",
      order_status: "Pending",
      order_items: transformProducts_checkout(),
    };

    const data = await createOrderHandler(newOrder)
    return { data, newOrder };
  }

  const updateOrder_checkout = async (orderId: number, payment_id: string) => {
    const updatedOrder: OrderUpdate = {
      payment_status: "Unpaid",
      payment_id: payment_id,
      order_status: "Pending",
    };
    await updateOrderHandler(orderId, updatedOrder);
  };

  return {
    error,
    loading,
    fetchOrdersHandler,
    fetchOrderByIdHandler,
    deleteOrderHandler,
    updateOrderHandler,
    createOrderHandler,
    updateOrderItemHandler,
    deleteOrderItemHandler, 
    fetchOrderByPaymentIdHandler,
    createOrder_checkout,
    updateOrder_checkout
  };
};
