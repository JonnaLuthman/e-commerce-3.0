import { useContext, useEffect, useState } from "react"
import { useCustomers } from "../../hooks/useCustomers";
import { ActionType } from "../../reducers/CustomerReducer";
import { CreateCustomer } from "./CreateCustomer";
import { UpdateCustomer } from "./UpdateCustomer";
import CustomerContext from "../../contexts/CustomerContext";


export const Customers = () => {
    const { fetchCustomersHandler, deleteCustomerHandler } = useCustomers()
    const { customers, dispatch } = useContext(CustomerContext)
    const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);

    useEffect(() => {
        if (customers.length > 0) return;
        const getData = async () => {
            const customersData = await fetchCustomersHandler();
            dispatch({
                type: ActionType.LOADED,
                payload: JSON.stringify(customersData)
            })
        }
        getData();
    })

    const handleDelete = async (id: number) => {
        await deleteCustomerHandler(id);
        dispatch({
            type: ActionType.DELETED,
            payload: JSON.stringify(id)
        })
    }

    return (
        <>
            <CreateCustomer />
            <section>
                {customers.map(({ id, firstname, lastname, city }) => (
                    <div key={id} className="customer-wrapper">
                        {editingCustomerId === id ? (
                            <UpdateCustomer customerId={id} setEditingCustomerId={setEditingCustomerId} />

                        ) : (
                            <>
                                <h3>{firstname} {lastname}</h3>
                                <p>{city}</p>
                                <div className="button-wrapper">
                                    <button className="flex items-center justify-center rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => setEditingCustomerId(id)}>Edit</button>
                                    <button className="flex items-center justify-center rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => handleDelete(id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </section>
        </>
    )
}
