import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { OrderDetails } from "../types/Order";
import { useNavigate, useParams } from "react-router";
import { useOrders } from "../hooks/useOrders";
import OrderContext from "../contexts/OrderContext";
import { ActionType } from "../reducers/OrderReducer";

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
        order_items: []
    });
    const { id } = useParams();
    const { dispatch } = useContext(OrderContext)
    const { fetchOrderByIdHandler, updateOrderHandler, deleteOrderHandler, updateOrderItemHandler, deleteOrderItemHandler } = useOrders();
    const [selectedId, setSelectedId] = useState<ItemIdType>(null);
    const [selectedEditSection, setSelectedEditSection] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getOrder = async () => {
            const response = await fetchOrderByIdHandler(Number(id));
            setOrderDetails(response)
            console.log(response)
        }
        getOrder();
    }, [id])

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
        order_items } = orderDetails;

    const handleUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrderDetails({ ...orderDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await updateOrderHandler(Number(id), orderDetails);
        setSelectedEditSection(null)
    };

    const handleIncrease = async (itemId: ItemIdType) => {
        setOrderDetails({
            ...orderDetails,
            order_items: orderDetails.order_items.map((item) => (
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            ))
        })
    }

    const handleDecrease = async (itemId: ItemIdType) => {
        setOrderDetails({
            ...orderDetails,
            order_items: orderDetails.order_items.map((item) => (
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ))
        })
    }

    const handleSaveQuantity = async (itemId: ItemIdType, quantity: number) => {
        if (itemId === null) return;
        const payload = { quantity: quantity };
        await updateOrderItemHandler(itemId, payload);
        setSelectedId(Number(null));
    }

    const handleDeleteOrderItem = async (itemId: ItemIdType) => {
        if (itemId === null) return;
        await deleteOrderItemHandler(itemId);
        setSelectedId(Number(null));
    }

    const handleDeleteOrder = async (id: number) => {
        if (!id) return;
        await deleteOrderHandler(id);
        dispatch({
            type: ActionType.ORDER_DELETED,
            payload: JSON.stringify(id),
        });
        navigate("/admin")
    };

    return (
        <>
            <button onClick={() => navigate("/admin")}>Back to All Orders</button>
            <section className="">
                <div className="">
                    <p><b>Order number:</b> {id}</p>
                    {selectedEditSection === "order"
                        ? (
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Status:
                                    <div className="flex">
                                        <select name="order_status" onChange={handleUpdate} defaultValue={order_status}>
                                            <option value="placed">Placed</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="outForDelivery">Out for delivery</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                        <button type="submit">Save</button>
                                    </div>
                                </label>
                            </form>
                        ) : (
                            <>
                                <p><b>Status:</b> {order_status}</p>
                                <button onClick={() => setSelectedEditSection("order")}>Edit</button>
                            </>
                        )}

                    <p><b>Created at:</b> {created_at}</p>
                </div>
                <div className="flex">
                    <section className="order-payment-wrapper">
                        <p>{payment_id}</p>
                        {selectedEditSection === "payment"
                            ? (
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        <b>Payment Status:</b>
                                        <div>
                                            <select name="payment_status" onChange={handleUpdate} defaultValue={payment_status}>
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="failed">Failed</option>
                                            </select>
                                            <button type="submit">Save</button>
                                        </div>
                                    </label>
                                </form>
                            ) : (
                                <>
                                    <p><b>Payment Status:</b> {payment_status}</p>
                                    <button onClick={() => setSelectedEditSection("payment")}>Edit</button>
                                </>
                            )}
                        <p><b>Total Price: </b>{total_price} kr</p>
                    </section>
                    <section className="order-customer-wrapper">
                        <h3>Customer Details</h3>
                        <p>Customer ID: {customer_id}</p>
                        <p>Name: {customer_firstname} {customer_lastname}</p>
                        <p>Email: {customer_email}</p>
                        <p>Phone: {customer_phone}</p>
                        <p>Adress: {customer_street_address}</p>
                        <p>{customer_postal_code} {customer_city}</p>
                        <p>{customer_country}</p>
                    </section>
                </div>
                <ul className="order-items">
                    {order_items.map((item) => (
                        <li key={item.id}>
                            <p>{item.product_name}</p>
                            <p>{item.quantity}</p>
                            {selectedId !== item.id ? (
                                <button onClick={() => { setSelectedId(Number(item.id)) }}>Edit</button>
                            ) : (
                                <div>
                                    <div className="flex">
                                        <button onClick={() => handleDecrease(item.id)}>-</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => { handleIncrease(item.id) }}>+</button>
                                    </div>
                                    <div className="flex">
                                        <button onClick={() => { handleDeleteOrderItem(item.id) }} >Delete</button>
                                        <button onClick={() => { handleSaveQuantity(item.id, item.quantity) }} >Save</button>
                                    </div>
                                </div>
                            )
                            }
                        </li>
                    ))}
                </ul>
                <button onClick={() => { handleDeleteOrder(Number(id)) }}>Delete order</button>
            </section >
        </>
    )
}