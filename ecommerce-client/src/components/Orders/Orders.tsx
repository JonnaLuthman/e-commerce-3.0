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
    <div className="relative overflow-x-auto shadow-md ">
      <table className="w-auto text-sm text-left rtl:text-right mx-[5rem] border  border-gray-300">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right bg-white border-l border-t border-r border-gray-300 mt-[2rem]">
          Orders
        </caption>
        <thead className="text-xs uppercase bg-gray-100 ">
          <tr >
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
            <tr className="bg-white border-t border-gray-300">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
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
