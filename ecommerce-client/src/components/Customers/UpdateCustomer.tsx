import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import { ActionType } from "../../reducers/CustomerReducer";
import { updateCustomer } from "../../services/customerService";
import { Customer } from "../../types/Customer";
import CustomerContext from "../../contexts/CustomerContext";

type UpdateCustomerProps = {
  customerId: number;
  setEditingCustomerId: (id: number | null) => void;
};

export const UpdateCustomer = ({
  customerId,
  setEditingCustomerId,
}: UpdateCustomerProps) => {
  const { fetchCustomerByIdHandler } = useCustomers();
  const { dispatch } = useContext(CustomerContext);
  const [customer, setCustomer] = useState<Customer>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: "",
    created_at: "",
  });

  useEffect(() => {
    const getCustomer = async () => {
      const data = await fetchCustomerByIdHandler(customerId);
      setCustomer(data);
    };
    getCustomer();
  }, [customerId]);

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditingCustomerId(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "number") {
      setCustomer({ ...customer, [e.target.name]: +e.target.value });
    } else {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateCustomer(customerId, customer);
    dispatch({
      type: ActionType.UPDATED,
      payload: JSON.stringify(customer),
    });
    setEditingCustomerId(null);
  };

  return (
    <div className="bg-white p-8 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Update Customer</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 w-full">
        <input
          className="flex-1 w-full min-w-[250px] p-4 border border-gray-300 rounded"
          onChange={handleChange}
          type="text"
          name="firstname"
          placeholder="First Name"
          defaultValue={customer.firstname}
        />
        <input
          className="flex-1 w-full min-w-[250px] p-4 border border-gray-300 rounded"
          onChange={handleChange}
          type="text"
          name="lastname"
          placeholder="Last Name"
          defaultValue={customer.lastname}
        />
        <input
          className="flex-1 w-full min-w-[250px] p-4 border border-gray-300 rounded"
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={customer.email}
        />
        <input
          className="flex-1 w-full min-w-[250px] p-4 border border-gray-300 rounded"
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={customer.password}
        />
        <input
          className="flex-1 w-full min-w-[250px] p-4 border border-gray-300 rounded"
          onChange={handleChange}
          type="tel"
          name="phone"
          placeholder="Phone Number"
          defaultValue={customer.phone}
        />
        <input
          className="flex-1 w-full min-w-[250px] p-4 border border-gray-300 rounded"
          onChange={handleChange}
          type="text"
          name="street_address"
          placeholder="Street Address"
          defaultValue={customer.street_address}
        />
        <input
          className="flex-1 w-full min-w-[250px] p-4 border border-gray-300 rounded"
          onChange={handleChange}
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          defaultValue={customer.postal_code}
        />
        <input
          className="flex-1 w-full min-w-[250px] p-4 border border-gray-300 rounded"
          onChange={handleChange}
          type="text"
          name="city"
          placeholder="City"
          defaultValue={customer.city}
        />
        <input
          className="flex-1 w-full min-w-[250px] p-4 border border-gray-300 rounded"
          onChange={handleChange}
          type="text"
          name="country"
          placeholder="Country"
          defaultValue={customer.country}
        />

        <div className="w-full flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBackClick}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Update Customer
          </button>
        </div>
      </form>
    </div>
  );
};
