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
    fetchOrderByPaymentIdHandler
  };
};
