import { useContext, useEffect, useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import OrderContext from "../../contexts/OrderContext";
import { ActionType } from "../../reducers/OrderReducer";
import { Link } from "react-router";
import { Pagination } from "../../utils/Pagination";

export const Orders = () => {
  const { orders, dispatch } = useContext(OrderContext);
  const { fetchOrdersHandler } = useOrders();

  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage] = useState(5);

  const indexOfLastOrder = currentPage * orderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - orderPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchOrdersHandler();
      dispatch({
        type: ActionType.ORDERS_LOADED,
        payload: JSON.stringify(data),
      });
    };
    getData();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg"></div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Orders
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3">
              Order status
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
            <th scope="col" className="px-6 py-3">
              Payment status
            </th>
            <th scope="col" className="px-6 py-3">
              Total price
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>

        {currentOrders.map((order) => (
          <tbody key={order.id}>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {order.id}
              </th>
              <td className="px-6 py-4">{order.order_status}</td>
              <td className="px-6 py-4">{order.created_at}</td>
              <td className="px-6 py-4">{order.payment_id}</td>
              <td className="px-6 py-4">{order.total_price} sek</td>
              <td className="px-6 py-4 text-right">
                <Link
                  to={`/admin/order/${order.id}`}
                  key={order.id}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <Pagination
        itemsPerPage={orderPerPage}
        totalItems={orders.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};
