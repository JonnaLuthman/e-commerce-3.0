import axios from "axios";
import { Order, OrderCreate, OrderDetails, OrderUpdate, CreateOrderResponse } from "../types/Order";
import { OrderItemUpdate } from "../types/Order";

const ORDER_URL = "http://localhost:3000/orders";
const ORDERITEMS_URL = "http://localhost:3000/order-items";

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get(`${ORDER_URL}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const fetchOrderById = async (id: number): Promise<OrderDetails> => {
  try {
    const response = await axios.get(`${ORDER_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const fetchOrderByPaymentId = async (id: string): Promise<Order> => {
  try {
    const response = await axios.get(`${ORDER_URL}/payment/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export const deleteOrder = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${ORDER_URL}/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const updateOrder = async (
  id: number,
  payload: OrderUpdate
): Promise<Order> => {
  try {
    const response = await axios.patch(`${ORDER_URL}/${id}`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const createOrder = async (payload: OrderCreate) => {
  try {
    const response = await axios.post(`${ORDER_URL}`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const updateOrderItem = async (id: number, payload: OrderItemUpdate) => {
  try {
    const response = await axios.patch(`${ORDERITEMS_URL}/${id}`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export const deleteOrderItem = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`${ORDERITEMS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

