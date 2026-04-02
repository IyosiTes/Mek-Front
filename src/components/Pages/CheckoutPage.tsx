
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../hooks/useAuth";

interface CartItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
  total_price: number;
}

interface UserType {
  id: number;
  username: string;
  email: string;
}

const MERCHANT_PHONE = "+251946250695"; // Mekwerab phone number

const CheckoutPage = () => {
  const { user } = useAuth() as { user: UserType | null };
  const navigate = useNavigate();

  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Form state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "telebirr">("cod");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart/");
        setItems(res.data.items);
        setTotal(res.data.total_price);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    if (!phoneNumber || !city || !area || !addressDetails) {
      alert("Please fill in all shipping information.");
      return;
    }

    if (paymentMethod === "telebirr" && !paymentScreenshot) {
      alert("Please upload your Telebirr payment screenshot.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("payment_method", paymentMethod);
      formData.append("city", city);
      formData.append("area", area);
      formData.append("address_details", addressDetails);
      formData.append("phone_number", phoneNumber);
      formData.append("full_name", user?.username || "");
      if (paymentScreenshot) {
        formData.append("payment_screenshot", paymentScreenshot);
      }

      const res = await api.post("/orders/", formData);
      const data = res.data;

      // Redirect based on payment method
      navigate(`/order-success/${data.order_id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 mt-15 lg:grid-cols-3 gap-8">
      {/* LEFT: Shipping + Payment */}
      <div className="lg:col-span-2 space-y-6">
        {/* Shipping Info */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold mb-2">Shipping Information</h2>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Address Details"
            value={addressDetails}
            onChange={(e) => setAddressDetails(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Payment Method */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold mb-2">Payment Method</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="telebirr"
                checked={paymentMethod === "telebirr"}
                onChange={() => setPaymentMethod("telebirr")}
              />
              Telebirr
            </label>

            {/* Telebirr instructions */}
            {paymentMethod === "telebirr" && (
              <div className="mt-2 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400 text-sm space-y-2">
                <p>
                  Please send the exact amount to Mekwerab's phone number:
                  <span className="font-semibold ml-1">{MERCHANT_PHONE}</span>
                </p>
                <p>Upload your payment screenshot below:</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && setPaymentScreenshot(e.target.files[0])
                  }
                  className="mt-1 w-full max-w-xs border rounded p-1 text-sm"
                />
              
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.product_name} x {item.quantity}
                </span>
                <span>{item.total_price} ETB</span>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{total} ETB</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              * Prices do not include shipping cost. Estimated delivery: 2–5 days. Delivery fee depends on your location; we will contact you if needed.
            </p>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full mt-6 bg-main hover:bg-hover text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;