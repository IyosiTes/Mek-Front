import { Link } from "react-router-dom";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <Link to="/" className="text-gray-500 hover:text-gray-800 text-2xl font-bold">
          ×
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Refund Policy</h1>
        <p className="mb-4">
          At Mekwerab, your satisfaction is important. If you are not happy with a
          purchase, you may request a refund within 7 days of receiving the item.
        </p>
        <p className="mb-4">
          Products must be returned in their original condition and packaging. Refunds
          will be processed within 5 business days after we receive the return.
        </p>
        <p>
          Shipping costs are non-refundable unless the return is due to our error.
        </p>
      </div>
    </div>
  );
}