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
    <div className="flex justify-center">
      <CreateCustomer />
      </div>
      <div className="relative overflow-x-auto shadow-md ">
      <table className="w-auto bg-white text-sm text-left rtl:text-right mx-[5rem] border border-gray-300 ">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right bg-white border-l border-t border-r border-gray-300">
            Customers
          </caption>
          <thead className="text-xs uppercase bg-gray-100 ">
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
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>

          {currentCustomers.map((customer) => (
            <tbody key={customer.id}>
              {editingCustomerId === customer.id ? (
                <tr>
                  <td colSpan={6} className="bg-white">
                    <UpdateCustomer
                      customerId={customer.id}
                      setEditingCustomerId={setEditingCustomerId}
                    />
                  </td>
                </tr>
              ) : (
                <tr className="bg-white border-t border-gray-300">
                  <th
                    scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {customer.id}
                  </th>
                  <td className="px-6 py-4">
                    {customer.firstname} {customer.lastname}
                  </td>
                  <td className="px-6 py-4">
                    {customer.street_address}, {customer.postal_code}{" "}
                    {customer.city}, {customer.country}
                  </td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => setEditingCustomerId(customer.id)}
                    >
                      Edit
                    </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                    <button
                      className="block font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
