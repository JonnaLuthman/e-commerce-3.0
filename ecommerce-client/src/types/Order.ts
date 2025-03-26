
export type Order = {
  id: number | null;
  customer_id: number;
  total_price: number;
  payment_status: string;
  payment_id: string;
  order_status: string;
  created_at: string;
  customer_firstname: string;
  customer_lastname: string;
  customer_email: string;
  customer_phone: string;
  customer_street_address: string;
  customer_postal_code: string;
  customer_city: string;
  customer_country: string;
  customers_created_at: string;
};

export type OrderDetails = {
  id: number | null;
  customer_id: number;
  total_price: number;
  payment_status: string;
  payment_id: string;
  order_status: string;
  created_at: string;
  customer_firstname: string;
  customer_lastname: string;
  customer_email: string;
  customer_phone: string;
  customer_street_address: string;
  customer_postal_code: string;
  customer_city: string;
  customer_country: string;
  order_items: OrderItem[];
};
export type OrderCreate = Pick<
  OrderDetails,
  | "customer_id"
  | "payment_status"
  | "payment_id"
  | "order_status"
  | "order_items"
>;

export type OrderUpdate = Pick<
  Order,
  "payment_status" | "payment_id" | "order_status"
>;

export type CreateOrderResponse = {
  message: string,
  id: number, 
}

export type OrderItem = {
  id: number | null
  product_id: number
  product_name: string
  quantity: number
  unit_price: number
}

export type OrderItemUpdate = Pick<OrderItem, "quantity">;

export type LineItem = {
  price_data: {
    currency: string;
    product_data: {
      name: string;
    };
    unit_amount: number;
  };
  quantity: number;
};
