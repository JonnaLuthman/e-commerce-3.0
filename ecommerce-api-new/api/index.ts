// import express from "express";
// import {connectDB} from "../src/config/db";
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import { VercelRequest, VercelResponse } from "@vercel/node";

// import dotenv from 'dotenv';
// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json())
// app.use(cookieParser());
// app.use(cors({
//   // origin: "http://localhost:5173",
//   origin: "*",
//   credentials: true,  // ✅ Allows cookies
// }));

// // Routes
// import productRouter from "../src/routes/products";
// import customerRouter from "../src/routes/customers";
// import orderRouter from "../src/routes/orders";
// import orderItemRouter from "../src/routes/orderItems";
// import stripeRouter from "../src/routes/stripe";
// // import authRouter from "./routes/auth";
// app.use('/products', productRouter)
// app.use('/customers', customerRouter)
// app.use('/orders', orderRouter)
// app.use('/order-items', orderItemRouter)
// app.use('/stripe', stripeRouter)
// // app.use('/auth', authRouter)

// // Attempt to connect to the database
// connectDB()

// export default (req: VercelRequest, res: VercelResponse) => {
//   return app(req, res);
// };


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "../src/config/db";

// Importera din webhook direkt
import { webhook } from "../src/controllers/stripeController";

// Importera övriga routers
import productRouter from "../src/routes/products";
import customerRouter from "../src/routes/customers";
import orderRouter from "../src/routes/orders";
import orderItemRouter from "../src/routes/orderItems";
import stripeRouter from "../src/routes/stripe";

dotenv.config();

const app = express();

// ✅ 1. Stripe Webhook route – måste ligga INNAN express.json()
app.post(
  "/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  webhook
);

// ✅ 2. Övrig middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ✅ 3. Övriga routes
app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/order-items", orderItemRouter);
app.use("/stripe", stripeRouter); // OBS: utan /webhook

// ✅ 4. Databas
connectDB();

// ✅ 5. Exportera till Vercel
export default app;
