import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoaderSpinner from "../ui/LoadingSpinner";

interface OrderItem {
  product_name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  payment_method: "cod" | "telebirr";
  payment_status: "unpaid" | "submitted" | "paid";
  total_amount: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  items: OrderItem[];
  created_at: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      
      const res = await api.get("/orders/list/");
   
      setOrders(res.data);
    } catch (error) {
      let message = "Failed to load orders";
      if (isAxiosError(error)) {
        message =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderSpinner size={60} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-15 px-4 ">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <p className="text-2xl font-semibold text-gray-700">No orders yet</p>
          <p className="text-gray-500 mt-2">
            Start shopping and your orders will appear here
          </p>
          <Link
            to="/"
            className="mt-4 px-6 py-2 bg-main text-white rounded hover:bg-Hover transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            // Payment and status badges
            const statusColors: Record<string, string> = {
              pending: "bg-yellow-100 text-yellow-700",
              confirmed: "bg-blue-100 text-blue-700",
              shipped: "bg-purple-100 text-purple-700",
              delivered: "bg-green-100 text-green-700",
            };

            const paymentColors: Record<string, string> = {
              unpaid: "bg-red-100 text-red-700",
              submitted: "bg-orange-100 text-orange-700",
              paid: "bg-green-100 text-green-700",
            };

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition space-y-3"
              >
                {/* TOP ROW: Order ID + Status */}
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="text-sm text-gray-700 space-y-1">
                  {order.items.slice(0, 2).map((item, i) => (
                    <p key={i}>
                      {item.product_name} × {item.quantity} - {item.price} ETB
                    </p>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-xs text-gray-400">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>

                {/* PAYMENT INFO */}
                <div className="flex justify-between items-center flex-wrap gap-2 mt-2">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">
                      Total: {order.total_amount} ETB
                    </p>
                    <p className="text-xs">
                      Payment Method:{" "}
                      <span className="capitalize">{order.payment_method}</span>
                    </p>
                    <p className="text-xs">
                      Payment Status:{" "}
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          paymentColors[order.payment_status]
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </p>
                    {order.payment_method === "telebirr" &&
                      order.payment_status === "submitted" && (
                        <p className="text-xs text-gray-500 mt-1">
                          Waiting admin approval
                        </p>
                      )}
                  </div>

                  <p className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;