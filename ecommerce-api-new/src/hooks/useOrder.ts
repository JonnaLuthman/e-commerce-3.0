import { ResultSetHeader } from "mysql2/promise";
import { db } from "../config/db";
import Stripe from "stripe";

export const updateOrder = async (
  session: Stripe.Checkout.Session
): Promise<void> => {
  try {
    const sql = `
    UPDATE orders 
    SET payment_status = ?, payment_id = ?, order_status = ?
    WHERE id = ?
  `;

  console.log("session:", "paymentID:",session.client_reference_id, "orderID:",session.id)
    const params = [
      "Paid",
      session.id,
      "Received",
      session.client_reference_id,
    ];

    await db.query<ResultSetHeader>(sql, params);
    console.log("Order updated")
  } catch (error) {
    console.error(error);
  }
};

export const updateProductStock = async (order_id: number) => {
  try {
    const [rows] = await db.query(
      `SELECT order_id, product_id, quantity
         FROM order_items
         JOIN products ON order_items.product_id = products.id
         WHERE order_id = ?`,
      [order_id]
    );

    const orderItems = rows as {
      order_id: number;
      product_id: number;
      quantity: number;
    }[];

    for (const item of orderItems) {
      await db.query(`UPDATE products SET stock = stock - ? WHERE id = ?`, [
        item.quantity,
        item.product_id,
      ]);
    }
  } catch (error) {
    console.error(error);
  }
};
