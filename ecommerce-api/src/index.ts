import { CartItem } from "./../../ecommerce-client/src/types/CartItem";
import {
  OrderCreate,
  OrderItem,
} from "./../../ecommerce-client/src/types/Order";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB, db } from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/stripe/checkout", async (req: Request, res: Response) => {
  try {
    const order = req.body.line_items;
    const customerId = req.body.customer_id;

    const session = await stripe.checkout.sessions.create({
      line_items: order,
      mode: "payment",
      return_url: `http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      ui_mode: "embedded",
      client_reference_id: customerId,
    });
    console.log(session.client_secret);

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/stripe/webhooks", async (req: Request, res: Response) => {
  const event = req.body;
  console.log(event);

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("event.data.object", event.data.object);

      try {
        const sql = `
          UPDATE orders 
          SET payment_status = ?, payment_id = ?, order_status = ?
          WHERE id = ?
        `;
        const params = [
          "paid",
          session.id,
          "Received",
          session.client_reference_id,
        ];

        const [result] = await db.query<ResultSetHeader>(sql, params);
      } catch (error) {
        console.error(error);
      }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import { updateOrder } from "./controllers/orderController";
import { ResultSetHeader } from "mysql2";
app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/order-items", orderItemRouter);

// Attempt to connect to the database
connectDB();
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
