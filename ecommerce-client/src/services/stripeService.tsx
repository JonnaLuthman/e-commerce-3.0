import { LineItemOrder } from "../types/Order";

export const getClientSecret = async (orderId: number, lineItems: LineItemOrder[]) => {
  try {
    const response = await fetch("https://e-commerce-3-0.vercel.app/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        line_items: lineItems,
        orderId: orderId
      }),
    });

    const data = await response.json();
    return data.clientSecret;
  } catch (error) {
    console.error("Error fetching clientSecret:", error);
    return null;
  }
};
