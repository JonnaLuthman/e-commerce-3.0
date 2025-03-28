import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB, db } from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/stripe/checkout", async (req: Request, res: Response) => {
  try {
    const order = req.body.line_items;
    const orderId = req.body.orderId;

    const session = await stripe.checkout.sessions.create({
      line_items: order,
      mode: "payment",
      return_url: `http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      ui_mode: "embedded",
      client_reference_id: orderId,
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/stripe/webhooks", async (req: Request, res: Response) => {
  const event = req.body;

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      await updateOrder(session);
      await updateProductStock(session.client_reference_id);

    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }

  res.json({ received: true });
});

import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import { updateOrder, updateProductStock } from "./hooks/useOrder";

app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/order-items", orderItemRouter);

connectDB();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
