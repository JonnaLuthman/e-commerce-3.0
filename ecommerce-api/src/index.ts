import { CartItem } from "./../../ecommerce-client/src/types/CartItem";
import {
  OrderCreate,
  OrderItem,
} from "./../../ecommerce-client/src/types/Order";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
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
    console.log("req.body", req.body);
    console.log("req.body", req.body.line_items);

    const session = await stripe.checkout.sessions.create({
      line_items: order,
      mode: "payment",
      success_url: `http://localhost:5173/order-confirmation?session_id=${"{CHECKOUT_SESSION_ID}"}`,
      cancel_url: `http://localhost:5173/checkout`,
      client_reference_id: customerId,
    });
    console.log("session", session)

    
    return res.json({ checkout_url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
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
function getOrderFromLOcalSTorage() {
  throw new Error("Function not implemented.");
}
