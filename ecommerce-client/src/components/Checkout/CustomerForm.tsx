import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { CustomerPublic } from "../../types/Customer";
import CustomerContext from "../../contexts/CustomerContext";
import { useCustomers } from "../../hooks/useCustomers";
import { ActionType } from "../../reducers/CustomerReducer";
import {
  getFromLocalStorage,
  saveTolocalStorage,
} from "../../utils/localStorageUtils";
import { CartItem } from "../../types/CartItem";
import { LineItem, OrderCreate, OrderItem, OrderUpdate } from "../../types/Order";
import {
  CheckoutContext,
  checkoutPhases,
} from "../../contexts/CheckoutContext";
import { useOrders } from "../../hooks/useOrders";

export const CustomerForm = () => {
  const { dispatch } = useContext(CustomerContext);
  const { setPhase } = useContext(CheckoutContext);
  const { createCustomerHandler, fetchCustomerByEmailHandler } = useCustomers();
  const { fetchCustomersHandler } = useCustomers();
  const { createOrderHandler, updateOrderHandler } = useOrders();

  const [order, setOrder] = useState<OrderCreate>({
    customer_id: 0,
    payment_status: "",
    payment_id: "",
    order_status: "",
    order_items: [],
  });
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

  const getCustomerbyEmail_checkout = () => {
    return fetchCustomerByEmailHandler(customer.email).then((data) => {
      console.log("customerID from fetchCustomerByEmailHandler", data.id);
      return data.id;
    });
  };

  const createCustomer_checkout = async () => {
    const data = await createCustomerHandler(customer);
    const updatedCustomers = await fetchCustomersHandler();
    dispatch({
      type: ActionType.LOADED,
      payload: JSON.stringify(updatedCustomers),
    });
    saveTolocalStorage("customer", customer);

    console.log("customerID from createCustomerHandler", data.id);
    return data.id;
  };

  const transformProducts_checkout = () => {
    const cart = getFromLocalStorage("cart");
    console.log("cart from LS", cart);

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
    setOrder(newOrder);

    const data = await createOrderHandler(newOrder);
    console.log("Data from created order: ", data);
    return { data, newOrder };
  };
  console.log("New order:", order);

  const updateOrder_checkout = async (orderId: number, payment_id: string) => {
    const updatedOrder: OrderUpdate = {
      payment_status: "Unpaid",
      payment_id: payment_id,
      order_status: "Pending",
    };
    await updateOrderHandler(orderId, updatedOrder);
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
    console.log("Lineitems:", JSON.stringify(lineItems, null, 2));
    return lineItems;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const customers = await fetchCustomersHandler();
    const customerExists = customers.find((c) => c.email === customer.email);

    try {
      let customerId: number;
      if (customerExists) {
        customerId = await getCustomerbyEmail_checkout();
      } else {
        customerId = await createCustomer_checkout();
      }

      const { data, newOrder } = await createOrder_checkout(customerId);
      console.log("Updated order:", data);
      const orderId = data.id;

      const line_items = createLineItems(newOrder);
      console.log("Updated order 2:", line_items);

      try {
        const response = await fetch("http://localhost:3000/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            line_items: line_items,
            customer_id: order.customer_id,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Stripe checkoute session data:", data);

        // Redirect to Stripe Hosted Checkout
        window.location.href = data.checkout_url;

        setOrder((prevOrder) => ({
          ...prevOrder,
          payment_id: data.sessionId,
        }));

        await new Promise((resolve) => setTimeout(resolve, 100));

        const updatedOrder = await updateOrder_checkout(orderId, order.payment_id);

        console.log("Order after payment:", updatedOrder);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error handling customer:", error);
    }
  };

  return (
    <div>
      <p>Enter your details</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        {[
          "firstname",
          "lastname",
          "email",
          "phone",
          "street_address",
          "postal_code",
          "city",
          "country",
        ].map((field) => (
          <input
            key={field}
            onChange={handleChange}
            type={
              field === "email" ? "email" : field === "phone" ? "tel" : "text"
            }
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={customer[field as keyof typeof customer]}
          />
        ))}
        <div>
          <button onClick={() => setPhase(checkoutPhases.first)}>
            Go back
          </button>
          <button type="submit">Go to payment</button>
        </div>
      </form>
    </div>
  );
};
