import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { OrderDetails } from "../types/Order";
import { useNavigate, useParams } from "react-router";
import { useOrders } from "../hooks/useOrders";
import OrderContext from "../contexts/OrderContext";
import { ActionType } from "../reducers/OrderReducer";
import {
  CustomerDetails,
  UserDetails,
} from "../components/Orders/OrderDetails/CustomerDetails";
import { OrderInfo } from "../components/Orders/OrderDetails/OrderInfo";
import { OrderProducts } from "../components/Orders/OrderDetails/OrderProducts";

type ItemIdType = number | null;

export const OrderDetailsPage = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    id: 0,
    customer_id: 0,
    total_price: 0,
    payment_status: "",
    payment_id: "",
    order_status: "",
    created_at: "",
    customer_firstname: "",
    customer_lastname: "",
    customer_email: "",
    customer_phone: "",
    customer_street_address: "",
    customer_postal_code: "",
    customer_city: "",
    customer_country: "",
    order_items: [],
  });
  const { id } = useParams();
  const { dispatch } = useContext(OrderContext);
  const {
    fetchOrderByIdHandler,
    updateOrderHandler,
    deleteOrderHandler,
    updateOrderItemHandler,
    deleteOrderItemHandler,
  } = useOrders();

  const [selectedId, setSelectedId] = useState<ItemIdType>(null);
  const [selectedEditSection, setSelectedEditSection] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      const response = await fetchOrderByIdHandler(Number(id));
      setOrderDetails(response);
      console.log(response);
    };
    getOrder();
  }, [id]);

  const {
    customer_id,
    total_price,
    payment_status,
    payment_id,
    order_status,
    created_at,
    customer_firstname,
    customer_lastname,
    customer_email,
    customer_phone,
    customer_street_address,
    customer_postal_code,
    customer_city,
    customer_country,
    order_items,
  } = orderDetails;

  const handleUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateOrderHandler(Number(id), orderDetails);
    setSelectedEditSection(null);
  };

  const handleIncrease = async (itemId: ItemIdType) => {
    setOrderDetails({
      ...orderDetails,
      order_items: orderDetails.order_items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  const handleDecrease = async (itemId: ItemIdType) => {
    setOrderDetails({
      ...orderDetails,
      order_items: orderDetails.order_items.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    });
  };

  const handleSaveQuantity = async (itemId: ItemIdType, quantity: number) => {
    if (itemId === null) return;
    const payload = { quantity: quantity };
    await updateOrderItemHandler(itemId, payload);
    setSelectedId(Number(null));
  };

  const handleDeleteOrderItem = async (itemId: ItemIdType) => {
    if (itemId === null) return;
    await deleteOrderItemHandler(itemId);
    setSelectedId(Number(null));
  };

  const handleDeleteOrder = async (id: number) => {
    if (!id) return;
    await deleteOrderHandler(id);
    dispatch({
      type: ActionType.ORDER_DELETED,
      payload: JSON.stringify(id),
    });
    navigate("/admin");
  };

  return (
    <>
      <div className="bg-white grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded">
        <div className="col-span-3">
          <h2 className="font-bold text-2xl ">Order #{id}</h2>
          <p>
            <b>Created at:</b> {created_at}
          </p>
        </div>

        <section className="space-y-2">
          <OrderInfo
            order={orderDetails}
            selectedEditSection={selectedEditSection}
            setSelectedEditSection={setSelectedEditSection}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />
        </section>

        <section className="space-y-2">
          <CustomerDetails order={orderDetails} />
        </section>

        <section className="space-y-2">
          <OrderProducts
            orderItems={orderDetails.order_items}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            handleDeleteOrderItem={handleDeleteOrderItem}
            handleSaveQuantity={handleSaveQuantity}
          />
        </section>

        <section className="space-y-2 ">
        <button onClick={() => navigate("/admin")}
      className="my-4 rounded-full border px-5 py-2.5 bg-[var(--primary-btn-color)] text-[var(--primary-btn-text)] bg-[var(--primary-btn-color)] hover:text-[var(--primary-btn-color)] hover:bg-[var(--primary-bg-color)]"
        >Back to All Orders</button>
               <button
          onClick={() => {
            handleDeleteOrder(Number(id));
          }}
          className="my-4 rounded-full border px-5 py-2.5 bg-[var(--primary-btn-color)] text-[var(--primary-btn-text)] bg-[var(--primary-btn-color)] hover:text-[var(--primary-btn-color)] hover:bg-[var(--primary-bg-color)]"
        >
          Delete order
        </button>
        </section>
        </div>
    </>
  );
};
