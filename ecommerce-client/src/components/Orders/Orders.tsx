import { useContext, useEffect } from "react";
import { useOrders } from "../../hooks/useOrders";
import OrderContext from "../../contexts/OrderContext";
import { ActionType } from "../../reducers/OrderReducer";
import { Link } from "react-router";

export const Orders = () => {
  const { orders, dispatch } = useContext(OrderContext);
  const { fetchOrdersHandler } = useOrders();

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
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            {orders.map((order) => (
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.id}
                </th>
                <td className="px-6 py-4">{order.order_status}</td>
                <td className="px-6 py-4">{order.created_at}</td>
                <td className="px-6 py-4">{order.payment_id}</td>
                <td className="px-6 py-4">{order.total_price} sek</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/order/${order.id}`} key={order.id}>
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Edit </a>
                  </Link>
                </td>
              </tr>
            </tbody>
        ))}
          </table>
        </div>
  );
};
