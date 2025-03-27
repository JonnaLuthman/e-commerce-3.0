import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51R4IwxRsw509ItKXljKnF0unKzesr0rUfPuqqYnYTm5nqwc8JTuRZAdjiLRpCxFMZdMknKRnsH25FoM2AVyiPbxs00Uuu20pKB');

interface Props {
  clientSecret: string;
}

export const StripeCheckout = ({ clientSecret }: Props) => {
    return (
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    );
  };