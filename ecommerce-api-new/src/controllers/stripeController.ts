import { Request, Response } from "express";
import { db } from "../config/db";
import { STRIPE_SECRET_KEY } from "../constants/env";
import { updateOrder, updateProductStock } from "../hooks/useOrder";
const stripe = require('stripe')(STRIPE_SECRET_KEY);

const URL_client = 'https://e-commerce-3-0.vercel-client.app/'


export const checkoutSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = req.body.line_items;
        const orderId = req.body.orderId;
    
        const session = await stripe.checkout.sessions.create({
          line_items: order,
          mode: "payment",
          return_url: `${URL_client}order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
          ui_mode: "embedded",
          client_reference_id: orderId,
        });
    
        res.send({ clientSecret: session.client_secret });
      } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};

export const webhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = req.body;

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        console.log("Webhook triggered:", session);

        if (!session.client_reference_id) {
          console.error("client_reference_id is missing in session");
          res.status(400).json({ error: "client_reference_id is missing" });
        }

        await updateOrder(session);
        await updateProductStock(session.client_reference_id);

        console.log("Order and product stock updated");
        break;

  
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }
  
    res.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
