import express from "express";
import {connectDB} from "../src/config/db";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { VercelRequest, VercelResponse } from "@vercel/node";

import dotenv from 'dotenv';
dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  // origin: "http://localhost:5173",
  origin: "*",
  credentials: true,  // ✅ Allows cookies
}));

// Routes
import productRouter from "../src/routes/products";
import customerRouter from "../src/routes/customers";
import orderRouter from "../src/routes/orders";
import orderItemRouter from "../src/routes/orderItems";
import stripeRouter from "../src/routes/stripe";
// import authRouter from "./routes/auth";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)
app.use('/stripe', stripeRouter)
// app.use('/auth', authRouter)

// Attempt to connect to the database
connectDB()

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
