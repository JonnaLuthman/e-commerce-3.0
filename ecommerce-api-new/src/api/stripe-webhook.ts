import { webhook } from '../controllers/stripeController';
import { buffer } from 'micro';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false, // Stripe kräver raw body
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Stripe kräver raw body – mockar Express Request-objekt
    // så att din webhook-funktion kan använda req.body
    const rawBody = (await buffer(req)).toString();
    req.body = JSON.parse(rawBody);

    // Kör webhook-logiken från din controller
    // (du kan lägga till signatur-verifiering här om du vill också)
    await webhook(req as any, res as any);
  } else {
    res.status(405).end('Method Not Allowed');
  }
}