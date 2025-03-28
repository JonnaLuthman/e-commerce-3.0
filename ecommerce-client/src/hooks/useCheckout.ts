import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { CustomerPublic } from "../types/Customer";
import { getClientSecret } from "../services/stripeService";
import { LineItemOrder, OrderCreate, OrderItem } from "../types/Order";
import { useCustomers } from "./useCustomers";
import { useOrders } from "./useOrders";
import CustomerContext from "../contexts/CustomerContext";
import { CheckoutContext, checkoutPhases } from "../contexts/CheckoutContext";
import { saveTolocalStorage } from "../utils/localStorageUtils";

export const useCheckout = () => {
  const { createOrder_checkout } = useOrders();
  const { handleCustomer } = useCustomers();
  const { dispatch } = useContext(CustomerContext);
  const { setPhase } = useContext(CheckoutContext);
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

  const createLineItems = (order: OrderCreate): LineItemOrder[] => {
    const lineItems: LineItemOrder[] = order.order_items.map(
      (item: OrderItem) => ({
        price_data: {
          currency: "sek",
          product_data: {
            name: item.product_name,
          },
          unit_amount: item.unit_price * 100,
        },
        quantity: item.quantity,
      })
    );
    return lineItems;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const customerId = await handleCustomer(customer, dispatch);
      const { newOrder, data } = await createOrder_checkout(customerId);
      const orderId: number = data.id
      const lineItems = createLineItems(newOrder);
      const secret = await getClientSecret( orderId, lineItems);
      setPhase(checkoutPhases.third);

      if (secret) {
        saveTolocalStorage("secret", secret);
      } else {
        console.error("Failed to get clientSecret");
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
