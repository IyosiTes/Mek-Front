import axios from 'axios';
import type { Cart } from "../types/cart";

const client = axios.create({
  baseURL: "http://localhost:8000/api",
  //withCredentials: true,
});


// 🔑 attach token automatically
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function fetchCart() {
  const res = await client.get<Cart>("/cart/");
  return res.data;
}

export async function addToCart(product_id: number, quantity = 1) {
  return client.post("/cart/add/", { product_id, quantity });
}

export async function updateCartItem(item_id: number, quantity: number) {
  return client.patch("/cart/update/", { item_id, quantity });
}

export async function removeCartItem(product_id: number) {
  return client.post("/cart/remove/", { product_id });
}

export async function clearCart() {
  return client.post("/cart/clear/");
}