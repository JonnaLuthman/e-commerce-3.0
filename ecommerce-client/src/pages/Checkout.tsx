import { useContext } from "react";
import { CustomerForm } from "../components/Checkout/CustomerForm";
import { CustomerProvider } from "../contexts/CustomerContext";
import { Cart } from "../components/Checkout/Cart";
import {
  CheckoutContext,
  checkoutPhases,
} from "../contexts/CheckoutContext";

export const Checkout = () => {
  const { phase } = useContext(CheckoutContext);

  const renderCheckout = () => {
    switch (phase) {
      case checkoutPhases.first:
        return <Cart />;
      case checkoutPhases.second:
        return <CustomerForm />;
      // case checkoutPhases.third
      // Return stripe payment
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
