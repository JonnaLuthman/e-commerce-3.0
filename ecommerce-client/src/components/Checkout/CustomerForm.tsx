import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { CustomerPublic } from "../../types/Customer";
import CustomerContext from "../../contexts/CustomerContext";
import { useCustomers } from "../../hooks/useCustomers";
import { ActionType } from "../../reducers/CustomerReducer";
import { fetchCustomers } from "../../services/customerService";
import {
  getFromLocalStorage,
  saveTolocalStorage,
} from "../../utils/localStorageUtils";
import { data } from "react-router";

export const CustomerForm = () => {
  const { customers, dispatch } = useContext(CustomerContext);
  const { createCustomerHandler, fetchCustomerByEmailHandler } = useCustomers();
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

        return data.id;
      });
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const customerExists = customers.find((c) => c.email == customer.email);

    let promise;

    if (customerExists) {
      promise = getCustomerbyEmail().then((data) => data);
    } else {
      promise = createCustomer().then((data) => data);
    }


  };

  const createOrder = () => {
    const customer = getFromLocalStorage("customer");
    console.log("customer from LS", customer);
    const cartItems = getFromLocalStorage("cart")
    console.log("cart items from LS",cartItems);
  };

  createOrder()

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
