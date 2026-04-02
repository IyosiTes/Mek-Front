import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function CartEmptyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      {/* Main Content Card */}
      <div className="relative rounded-2xl shadow-lg p-10 flex flex-col items-center text-center max-w-md bg-white">
        <FaShoppingCart className="text-7xl text-main mb-6" />
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-6">
          You haven’t added any items yet. Let’s fill your cart!
        </p>

        <Link
          to="/"
          className="bg-main text-white px-6 py-3 rounded-full hover:bg-hover transition font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}