import { OrderDetails } from "../../../types/Order";

type CustomerDetailsProps = {
  order: OrderDetails;
};

export const CustomerDetails = ({ order }: CustomerDetailsProps) => {
  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-300 min-h-full">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Customer Details
          </h3>
        </div>

        <div className=" border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm text-left font-medium text-gray-500">
                Full name
              </dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.customer_firstname} {order.customer_lastname}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm text-left font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.customer_email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm text-left font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.customer_phone}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm text-left font-medium text-gray-500">
                Address
              </dt>
              <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.customer_street_address}
                <br />
                {order.customer_postal_code} {order.customer_city},{" "}
                {order.customer_country}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
