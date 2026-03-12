import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../ui/LoadingSpinner";
import { useCart } from "../../hooks/usecart";
import type { CartItem } from "../../types/cart";
import { useAuth } from "../../hooks/useAuth";

export default function CartPage() {
  const { data: cart, isLoading, updateItem, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCheckout = () => {
  if (!user) {
    navigate("/login");
    return;
  }

  navigate("/checkout");
};

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderSpinner size={60} />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center lg:text-left">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.items.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white shadow rounded-lg p-4 gap-4"
            >
              {/* PRODUCT */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.product.image ?? "https://picsum.photos/200"}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <p className="text-gray-500 text-sm">{item.product.price} ETB</p>
                </div>
              </div>

              {/* QUANTITY */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateItem({ item_id: item.id, quantity: Math.max(1, item.quantity - 1) })
                  }
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateItem({ item_id: item.id, quantity: item.quantity + 1 })}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>

              {/* PRICE */}
              <div className="font-semibold">{item.total_price} ETB</div>

              {/* REMOVE */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={() => clearCart()}
              className="text-sm underline text-gray-600 hover:text-black"
            >
              Clear Shopping Cart
            </button>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white shadow-lg rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cart.total_items}</span>
            </div>

            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>{cart.total_price} ETB</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{cart.total_price} ETB</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-main hover:bg-hover text-white py-3 rounded-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

