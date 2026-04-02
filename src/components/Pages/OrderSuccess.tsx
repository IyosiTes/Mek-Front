
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

interface Item {
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  payment_method: string;
  payment_status: string;
  total_amount: number;
  status: string;
  items: Item[];
  payment_screenshot?: string | null;
}

const TELEBIRR_CONTACTS = "+251946350695, +251964172402";

const OrderSuccessPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}/`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order)
    return <p className="text-center mt-10">Loading order details...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-semibold text-green-600">
        Order Successful 🎉
      </h1>

      <p className="mt-2">
        Order Number: <strong>#{order.id}</strong>
      </p>

      <p className="mt-2">
        Payment Method:{" "}
        <strong>
          {order.payment_method === "cod" ? "Cash on Delivery" : "Telebirr"}
        </strong>
      </p>

      <p className="mt-2">
        Payment Status:{" "}
        <strong
          className={
            order.payment_status === "paid" ? "text-green-600" : "text-yellow-600"
          }
        >
          {order.payment_status}
        </strong>
      </p>

      {/* Telebirr contact info */}
      {order.payment_method === "telebirr" && (
        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded text-sm">
          <p>
            For any issues, contact us: <strong>{TELEBIRR_CONTACTS}</strong>
          </p>
        </div>
      )}

      {/* Uploaded screenshot */}
      {order.payment_method === "telebirr" && order.payment_screenshot && (
        <div className="mt-4">
          <h2 className="font-semibold mb-1">Payment Screenshot</h2>
          <img
            src={order.payment_screenshot}
            alt="Payment Screenshot"
            className="w-64 rounded shadow border"
          />
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Items</h2>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between border-b py-2">
            <span>{item.product_name}</span>
            <span>
              {item.quantity} × {item.price} ETB
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6 font-semibold text-lg">
        <span>Total</span>
        <span>{order.total_amount} ETB</span>
      </div>

      <div className="flex gap-4 mt-8 flex-wrap">
        <Link
          to="/orders"
          className="bg-main text-white px-4 py-2 rounded hover:bg-Hover transition"
        >
          Track Order
        </Link>
        <Link
          to="/"
          className="border px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;