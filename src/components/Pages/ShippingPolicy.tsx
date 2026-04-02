import { Link } from "react-router-dom";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <Link to="/" className="text-gray-500 hover:text-gray-800 text-2xl font-bold">
          ×
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Shipping Policy</h1>
        <p className="mb-4">
          We ship orders within 2–5 business days after payment confirmation. Delivery
          times may vary depending on location.
        </p>
        <p className="mb-4">
          Shipping fees are calculated at checkout based on your address and the chosen
          shipping method.
        </p>
        <p>
          Tracking information will be provided once your order is dispatched.
        </p>
      </div>
    </div>
  );
}