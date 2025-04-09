import { useContext } from "react";
import {
  CheckoutContext,
  checkoutPhases,
} from "../../contexts/CheckoutContext";
import { useCheckout } from "../../hooks/useCheckout";

export const CustomerForm = () => {
  const { handleChange, handleSubmit, customer } = useCheckout();
  const { setPhase } = useContext(CheckoutContext);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Enter your details
        </h2>

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
          <div key={field} className="relative z-0 w-full mb-5 group">
            <input
              required
              onChange={handleChange}
              type={
                field === "email" ? "email" : field === "phone" ? "tel" : "text"
              }
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={customer[field as keyof typeof customer]}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b border-gray-300 pöaceholder-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col gap-4 mt-6">
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center rounded-md bg-[var(--primary-btn-color)] px-4 py-4 text-m font-semibold text-[var(--primary-btn-text)] transition-all duration-200 ease-in-out focus:shadow "
        >
          Go to payment
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
        <button
          className="flex w-full items-center justify-center rounded-lg bg-[var(--primary-btn-color)] border border-[var(--primary-btn-color)] text-[var(--primary-btn-text)] focus:outline-none hover:bg-[var(--primary-btn-text)] hover:text-[var(--primary-btn-color)] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => setPhase(checkoutPhases.first)}
        >
          Go back
        </button>
      </div>
    </form>
  );
};
