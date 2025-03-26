import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { CustomerPublic } from "../types/Customer";
import { stripeCheckout } from "../services/stripeService";
import { OrderCreate, LineItem, OrderItem } from "../types/Order";
import { useCustomers } from "./useCustomers";
import { useOrders } from "./useOrders";
import CustomerContext from "../contexts/CustomerContext";

export const useCheckout = () => {
  const { createOrder_checkout, updateOrder_checkout } = useOrders();
  const { handleCustomer } = useCustomers();
  const { dispatch } = useContext(CustomerContext);
  const [customer, setCustomer] = useState<CustomerPublic>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "number") {
      setCustomer({ ...customer, [e.target.name]: +e.target.value });
    } else {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    }
  };

  const createLineItems = (order: OrderCreate) => {
    const lineItems: LineItem[] = order.order_items.map((item: OrderItem) => ({
      price_data: {
        currency: "sek",
        product_data: {
          name: item.product_name,
        },
        unit_amount: item.unit_price * 100,
      },
      quantity: item.quantity,
    }));
    return lineItems;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const customerId = await handleCustomer(customer, dispatch);
      const { data, newOrder } = await createOrder_checkout(customerId);
      const lineItems = await createLineItems(newOrder);
      const response = await stripeCheckout(newOrder, lineItems);

      if (response) {
        window.location.href = response.checkout_url;
        await updateOrder_checkout(data.id, response.sessionId);
      }
    } catch (error) {
      console.error("Error handling checkout:", error);
    }
  };

  return {
    handleChange,
    createLineItems,
    handleSubmit,
    customer,
  };
};
