import { OrderItem } from "../../../types/Order";

type OrderProductsProps = {
  orderItems: OrderItem[];
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  handleIncrease: (id: number) => void;
  handleDecrease: (id: number) => void;
  handleDeleteOrderItem: (id: number) => void;
  handleSaveQuantity: (id: number, quantity: number) => void;
};

export const OrderProducts = ({
  orderItems,
  selectedId,
  setSelectedId,
  handleIncrease,
  handleDecrease,
  handleDeleteOrderItem,
  handleSaveQuantity,
}: OrderProductsProps) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-300 md:col-span-3 min-h-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Order Products</h3>
      </div>

      <div className="border-t border-gray-200 px-4 py-5">
        <ul className="space-y-6">
          {orderItems.map((item) => (
            <li key={item.id} className="border-b border-gray-300 pb-4">
              <p className="text-sm text-left font-medium text-gray-500">{item.product_name}</p>

              {selectedId !== item.id ? (
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-sm text-left font-medium text-gray-500 ">Quantity: <b>{item.quantity}</b></p>
                  <button
                    onClick={() => setSelectedId(item.id)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => item.id !== null && handleDecrease(item.id)}
                      className="bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => item.id !== null && handleIncrease(item.id)}
                      className="bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => item.id !== null && handleDeleteOrderItem(item.id)}
                      className="bg-gray-300 text-sm px-3 py-1 rounded hover:cursor-pointer"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => item.id !== null && handleSaveQuantity(item.id, item.quantity)}
                      className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => item.id !== null && setSelectedId(null)}
                      className="text-sm text-gray-500 underline hover:cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
