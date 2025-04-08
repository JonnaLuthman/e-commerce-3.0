import { useContext, useEffect, useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import { ActionType } from "../../reducers/CustomerReducer";
import { CreateCustomer } from "./CreateCustomer";
import { UpdateCustomer } from "./UpdateCustomer";
import CustomerContext from "../../contexts/CustomerContext";
import { Pagination } from "../../utils/Pagination";

export const Customers = () => {
  const { fetchCustomersHandler, deleteCustomerHandler } = useCustomers();
  const { customers, dispatch } = useContext(CustomerContext);
  const [editingCustomerId, setEditingCustomerId] = useState<number | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage] = useState(10);

  const indexOfLastCustomer = currentPage * customerPerPage;
  const indexOfFirstcustomer = indexOfLastCustomer - customerPerPage;
  const currentCustomers = [...customers]
    .reverse()
    .slice(indexOfFirstcustomer, indexOfLastCustomer);

  useEffect(() => {
    if (customers.length > 0) return;
    const getData = async () => {
      const customersData = await fetchCustomersHandler();
      dispatch({
        type: ActionType.LOADED,
        payload: JSON.stringify(customersData),
      });
    };
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteCustomerHandler(id);
    dispatch({
      type: ActionType.DELETED,
      payload: JSON.stringify(id),
    });
  };

  return (
    <>
      <CreateCustomer />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Customers
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>

          {currentCustomers.map((customer) => (
            <tbody key={customer.id}>
              {editingCustomerId === customer.id ? (
                <tr>
                  <td colSpan={6}>
                    <UpdateCustomer
                      customerId={customer.id}
                      setEditingCustomerId={setEditingCustomerId}
                    />
                  </td>
                </tr>
              ) : (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {customer.id}
                  </th>
                  <td className="px-6 py-4">
                    {customer.firstname} {customer.lastname}
                  </td>
                  <td className="px-6 py-4">
                    {customer.street_address} {customer.postal_code}{" "}
                    {customer.city} {customer.country}
                  </td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => setEditingCustomerId(customer.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          ))}
        </table>
        <Pagination
          itemsPerPage={customerPerPage}
          totalItems={customers.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};
