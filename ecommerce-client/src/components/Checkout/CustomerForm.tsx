import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { CustomerPublic } from "../../types/Customer";
import CustomerContext from "../../contexts/CustomerContext";
import { useCustomers } from "../../hooks/useCustomers";
import { ActionType } from "../../reducers/CustomerReducer";
import { fetchCustomers } from "../../services/customerService";
import { getFromLocalStorage, saveTolocalStorage,
  } from "../../utils/localStorageUtils";
import { CartItem } from "../../types/CartItem";
import { OrderCreate } from "../../types/Order";

export const CustomerForm = () => {
  const { customers, dispatch } = useContext(CustomerContext);
  const { createCustomerHandler, fetchCustomerByEmailHandler } = useCustomers();
  const [order, setOrder] = useState<OrderCreate>({
    customer_id: 0,
    payment_status: "",
    payment_id: "",
    order_status: "",
    order_items: []
  })
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

  const getCustomerbyEmail = () => {
    return fetchCustomerByEmailHandler(customer.email).then((data) => {
      saveTolocalStorage("customer", customer);
      setCustomer({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: "",
      });
      console.log("customerID from fetchCustomerByEmailHandler", data.id)
      return data.id;
    });
  };

  const createCustomer = () => {
    return createCustomerHandler(customer).then((data) => {
      return fetchCustomers().then((updatedCustomers) => {
        dispatch({
          type: ActionType.LOADED,
          payload: JSON.stringify(updatedCustomers),
        });
        saveTolocalStorage("customer", customer);

        setCustomer({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          street_address: "",
          postal_code: "",
          city: "",
          country: "",
        });

        console.log("customerID from createCustomerHandler", data.id)
        return data.id;
      });
    });
  };
  
  const transformProducts = () => {
    const cart = getFromLocalStorage("cart");
    console.log("cart from LS", cart);
    
    if (!cart) return;
    return cart.map((cartItem: CartItem) => ({
      product_id: cartItem.product.id,
      product_name: cartItem.product.name,
      quantity: cartItem.quantity,
      unit_price: cartItem.product.price
      
    }))
  }
  
  const createOrder = () => {
    setOrder({...order, 
      payment_status: "Unpaid",
      payment_id: "",
      order_status: "Pending",
      order_items: transformProducts()
    })
};

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const customerExists = customers.find((c) => c.email === customer.email);
    console.log("customer exists", customerExists)
    try {
      let customerId: number;

      if (customerExists) {
        customerId = await getCustomerbyEmail();
        console.log("customerID from getCustomerbyEmail", customerId);
      } else {
        customerId = await createCustomer();
        console.log("customerID from createCustomer", customerId);
      }

      setOrder((prevOrder) => ({
        ...prevOrder,
        customer_id: customerId,
      }));
      console.log("order", order);
      
      createOrder()


    } catch (error) {
      console.error("Error handling customer:", error);
    }
  };

  useEffect(() => {
    console.log("order updated:", order);
  }, [order]);


  return (
    <div>
      <p>Enter your details</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={handleChange}
          type="text"
          name="firstname"
          placeholder="First Name"
          value={customer.firstname}
        />
        <input
          onChange={handleChange}
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={customer.lastname}
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
        />
        <input
          onChange={handleChange}
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={customer.phone}
        />
        <input
          onChange={handleChange}
          type="text"
          name="street_address"
          placeholder="Street Address"
          value={customer.street_address}
        />
        <input
          onChange={handleChange}
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={customer.postal_code}
        />
        <input
          onChange={handleChange}
          type="text"
          name="city"
          placeholder="City"
          value={customer.city}
        />
        <input
          onChange={handleChange}
          type="text"
          name="country"
          placeholder="Country"
          value={customer.country}
        />
        <button type="submit">Go to payment</button>
      </form>
    </div>
  );
};
