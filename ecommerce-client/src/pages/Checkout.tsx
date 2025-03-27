import { useContext } from "react";
import { CustomerProvider } from "../contexts/CustomerContext";
import { Cart } from "../components/Checkout/Cart";
import { CheckoutContext, checkoutPhases } from "../contexts/CheckoutContext";
import { CustomerCheckout } from "../components/Checkout/CustomerCheckout";
import { StripeCheckout } from "../components/Checkout/StripeCheckout";
import { getFromLocalStorage } from "../utils/localStorageUtils";

export const Checkout = () => {
  const { phase } = useContext(CheckoutContext);

  const clientSecret = getFromLocalStorage('secret')

  const renderCheckout = () => {
    switch (phase) {
      case checkoutPhases.first:
        return <Cart />;
      case checkoutPhases.second:
        return <CustomerCheckout />;
      case checkoutPhases.third:
        return clientSecret ? (
          <StripeCheckout clientSecret={clientSecret} />
        ) : (
          <div>Error: Missing client secret</div>
        );
      default:
        return <Cart />;
    }
  };

  console.log(phase);
  return (
    <div>
      <CustomerProvider>{renderCheckout()}</CustomerProvider>
    </div>
  );
};
