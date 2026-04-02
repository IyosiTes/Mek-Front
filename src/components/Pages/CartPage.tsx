
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../ui/LoadingSpinner";
import { useCart } from "../../hooks/usecart";
import type { CartItem } from "../../types/cart";
import { useAuth } from "../../hooks/useAuth";
import CartEmptyPage from "./CartEmptyPage";
import { getImageUrl } from "../../utils/getImageUrl";

export default function CartPage() {
  const { data: cart, isLoading, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
 const hasOutOfStock = cart?.items?.some(
    (item) => item.quantity > item.product.stock
  );

  if (hasOutOfStock) {
    alert("Some items are out of stock. Please update your cart.");
    return; // stop navigation
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
        <CartEmptyPage />
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto mt-15 p-4 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center lg:text-left">My Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
        {cart.items.map((item: CartItem) => (
    <div
      key={item.id}
      className="relative bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4"
    >
      {/* REMOVE BUTTON */}
      <button
        onClick={() => removeItem(item.id)}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-lg"
        title="Remove item"
      >
        ×
      </button>

      {/* PRODUCT IMAGE + NAME + QUANTITY */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={getImageUrl(item.product.image) }
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded"
        />

        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg">{item.product.name}</h3>

          {item.product.stock === 0 && (
            <p className="text-xs text-red-500">Out of stock</p>
          )}

          <p className="text-sm text-gray-500">
            Qty: {item.quantity}
          </p>

          <div className="font-semibold">
            {item.total_price} ETB
          </div>
        </div>
      </div>
    </div>
      ))}

       {/* CLEAR CART BUTTON (outside map!) */}
      <div className="flex justify-end mt-4">
        <button
        onClick={() => clearCart()}
        className="text-sm underline text-sky hover:text-black"
        >
                      Clear Shopping Cart
          </button>
        </div>
        </div>
        {/* ORDER SUMMARY */}
        <div className="bg-white shadow-lg rounded-lg p-6 lg:p-8 h-fit flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cart.total_items}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{cart.total_price} ETB</span>
              </div>

              <p className="text-xs text-red-600 mt-2">
                * Prices do not include shipping costs
              </p>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-main hover:bg-hover text-white py-3 rounded-lg font-semibold text-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}