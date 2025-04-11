import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import { ActionType } from "../../reducers/CustomerReducer";
import { fetchCustomers } from "../../services/customerService";
import { CustomerCreate } from "../../types/Customer";
import CustomerContext from "../../contexts/CustomerContext";

export const CreateCustomer = () => {
  const { createCustomerHandler } = useCustomers();
  const { dispatch } = useContext(CustomerContext);
  const [newCustomer, setNewCustomer] = useState<CustomerCreate>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: "",
  });
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "number") {
      setNewCustomer({ ...newCustomer, [e.target.name]: +e.target.value });
    } else {
      setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createCustomerHandler(newCustomer);
    const updatedCustomers = await fetchCustomers();
    dispatch({
      type: ActionType.LOADED,
      payload: JSON.stringify(updatedCustomers),
    });

    setShowCreateCustomer(false);
  };

  return (
    <>
      {!showCreateCustomer ? (
        <button
          onClick={() => {
            setShowCreateCustomer(true);
          }}
          className="flex items-center justify-start rounded-full border px-5 py-2.5 m-6 hover:bg-[var(--primary-btn-color)] hover:text-[var(--primary-btn-text)]"
        >
          Create Customer
        </button>
      ) : (
        <>
          {/* <form onSubmit={(e) => handleSubmit(e)}>
                            <input onChange={handleChange} type="text" name="firstname" placeholder="First Name" value={newCustomer.firstname} />
                            <input onChange={handleChange} type="text" name="lastname" placeholder="Last Name" value={newCustomer.lastname} />
                            <input onChange={handleChange} type="email" name="email" placeholder="Email" value={newCustomer.email} />
                            <input onChange={handleChange} type="password" name="password" placeholder="Password" value={newCustomer.password} />
                            <input onChange={handleChange} type="tel" name="phone" placeholder="Phone Number" value={newCustomer.phone} />
                            <input onChange={handleChange} type="text" name="street_address" placeholder="Street Address" value={newCustomer.street_address} />
                            <input onChange={handleChange} type="text" name="postal_code" placeholder="Postal Code" value={newCustomer.postal_code} />
                            <input onChange={handleChange} type="text" name="city" placeholder="City" value={newCustomer.city} />
                            <input onChange={handleChange} type="text" name="country" placeholder="Country" value={newCustomer.country} />
                            <button type="submit">Add Customer</button>
                        </form> */}
          <div className="flex flex-wrap bg-white border border-gray-300 p-8 rounded-lg max-w-4xl mx-auto my-6">
            <h2 className="text-2xl font-semibold mb-6">Create Customer</h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap gap-4 w-full"
            >
         
              <input
                className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
                onChange={handleChange}
                type="text"
                name="firstname"
                placeholder="First Name"
                defaultValue={newCustomer.firstname}
              />

              <input
                className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
                onChange={handleChange}
                type="text"
                name="lastname"
                placeholder="Last Name"
                defaultValue={newCustomer.lastname}
              />
              <input
                className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={newCustomer.email}
              />
              <input
                className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Password"
                defaultValue={newCustomer.password}
              />
              <input
                className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
                onChange={handleChange}
                type="tel"
                name="phone"
                placeholder="Phone Number"
                defaultValue={newCustomer.phone}
              />
              <input
                className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
                onChange={handleChange}
                type="text"
                name="street_address"
                placeholder="Street Address"
                defaultValue={newCustomer.street_address}
              />
              <input
                className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
                onChange={handleChange}
                type="text"
                name="postal_code"
                placeholder="Postal Code"
                defaultValue={newCustomer.postal_code}
              />
              <input
                className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
                onChange={handleChange}
                type="text"
                name="city"
                placeholder="City"
                defaultValue={newCustomer.city}
              />
              <input
                className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
                onChange={handleChange}
                type="text"
                name="country"
                placeholder="Country"
                defaultValue={newCustomer.country}
              />

              <div className="w-full flex justify-between mt-6">
                <button
                  type="submit"
                  className="flex items-center justify-start rounded-full border px-5 py-2.5 my-6 bg-[var(--primary-btn-color)] text-[var(--primary-btn-text)] hover:cursor-pointer"
                  onClick={() => {
                    setShowCreateCustomer(false);}}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-start rounded-full border px-5 py-2.5 my-6 bg-[var(--primary-btn-color)] text-[var(--primary-btn-text)] hover:cursor-pointer"
                >
                  Create customer
                </button>

              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};
