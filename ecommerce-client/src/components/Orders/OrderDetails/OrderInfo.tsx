import { ChangeEvent, FormEvent } from "react";
import { OrderDetails } from "../../../types/Order";

type OrderInfoProps = {
  order: OrderDetails;
  selectedEditSection: string | null;
  setSelectedEditSection: (section: string | null) => void;
  handleUpdate: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent) => void;
};

export const OrderInfo = ({
  order,
  selectedEditSection,
  setSelectedEditSection,
  handleUpdate,
  handleSubmit,
}: OrderInfoProps) => {
  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-300 min-h-full">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Order Details
          </h3>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="text-sm text-left font-medium text-gray-500 sm:col-span-1">
                Payment ID
              </dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2 px-2">
                {order.payment_id}
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="text-sm text-left font-medium text-gray-500 sm:col-span-1">
                Payment status
              </dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.payment_status}
              </dd>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {selectedEditSection === "payment" ? (
                  <form onSubmit={handleSubmit}>
                    <label>
                      <div>
                        <select
                          name="payment_status"
                          onChange={handleUpdate}
                          defaultValue={order.payment_status}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="failed">Failed</option>
                        </select>
                        <button
                          type="submit"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Save
                        </button>
                      </div>
                    </label>
                  </form>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedEditSection("payment")}
                      className=" font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </>
                )}
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
              <dt className="text-sm text-left font-medium text-gray-500 sm:col-span-1">
                Status
              </dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.order_status}
              </dd>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {selectedEditSection === "order" ? (
                  <form onSubmit={handleSubmit}>
                    <label>
                      <div className="flex">
                        <select
                          name="order_status"
                          onChange={handleUpdate}
                          defaultValue={order.order_status}
                        >
                          <option value="placed">Placed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="outForDelivery">
                            Out for delivery
                          </option>
                          <option value="delivered">Delivered</option>
                        </select>
                        <button
                          type="submit"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Save
                        </button>
                      </div>
                    </label>
                  </form>
                ) : (
                  <div>
                    <button
                      onClick={() => setSelectedEditSection("order")}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
