import { useContext } from "react";
import { CustomerProvider } from "../contexts/CustomerContext";
import { Cart } from "../components/Checkout/Cart";
import { CheckoutContext, checkoutPhases } from "../contexts/CheckoutContext";
import { CustomerCheckout } from "../components/Checkout/CustomerCheckout";

export const Checkout = () => {
  const { phase } = useContext(CheckoutContext);

  const renderCheckout = () => {
    switch (phase) {
      case checkoutPhases.first:
        return <Cart />;
      case checkoutPhases.second:
        return <CustomerCheckout/>
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
