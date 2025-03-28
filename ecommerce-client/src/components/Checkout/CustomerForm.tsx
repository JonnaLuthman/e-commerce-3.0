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
  <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto my-6"
  >
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Delivery Details
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
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={field}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={customer[field as keyof typeof customer]}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                
              </div>
            ))}
          </div>

      <div className="w-full flex flex-col gap-4 mt-6">
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Go to payment
        </button>
        <button
          className="flex w-full items-center justify-center rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => setPhase(checkoutPhases.first)}
        >
          Go back
        </button>
      </div>
  </form>

  );
};
