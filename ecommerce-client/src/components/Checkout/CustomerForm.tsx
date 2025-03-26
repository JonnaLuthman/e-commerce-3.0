import { useContext } from "react";
import { CheckoutContext, checkoutPhases } from "../../contexts/CheckoutContext";
import { useCheckout } from "../../hooks/useCheckout";

export const CustomerForm = () => {
  const { handleChange, handleSubmit, customer } = useCheckout();
  const { setPhase } = useContext(CheckoutContext);

  return (
    <form onSubmit={handleSubmit}>
      {[
        "firstname",
        "lastname",
        "email",
        "phone",
        "street_address",
        "postal_code",
        "city",
        "country",
      ].map((field) => (
        <input
          key={field}
          onChange={handleChange}
          type={
            field === "email" ? "email" : field === "phone" ? "tel" : "text"
          }
          name={field}
          placeholder={field.replace("_", " ").toUpperCase()}
          value={customer[field as keyof typeof customer]}
        />
      ))}
      <div>
        <button onClick={() => setPhase(checkoutPhases.first)}>Go back</button>
        <button type="submit">Go to payment</button>
      </div>
    </form>
  );
};
