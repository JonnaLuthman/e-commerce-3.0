import { LineItem, OrderCreate, OrderItem } from "../types/Order";


export const stripeCheckout = async (order: OrderCreate, lineItems: LineItem[]) => {
    console.log("Stripe chekout order:", order)
        // const lineItems: LineItem[] = order.order_items.map((item: OrderItem) => ({
        //   price_data: {
        //     currency: "sek",
        //     product_data: { name: item.product_name },
        //     unit_amount: item.unit_price * 100,
        //   },
        //   quantity: item.quantity,
        // }));

        try {
            const response = await fetch("http://localhost:3000/stripe/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                line_items: lineItems,
                customer_id: order.customer_id,
              }),
            });
    
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("Stripe chekout response:", response)
            return await response.json();
        } catch (error) {
            console.error("Stripe checkout error:", error);
            return null;
        }
}