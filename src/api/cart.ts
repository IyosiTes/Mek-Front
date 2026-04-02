import api from "./api";
import type { Cart } from "../types/cart";


export async function fetchCart() {
  const res = await api.get<Cart>("/cart/");
  return res.data;
}

export async function addToCart(product_id: number, quantity = 1) {
  return api.post("/cart/add/", { product_id, quantity });
}

export async function updateCartItem(item_id: number, quantity: number) {
  return api.patch("/cart/update/", { item_id, quantity });
}

export async function removeCartItem(product_id: number) {
  return api.post("/cart/remove/", { product_id });
}

export async function clearCart() {
  return api.post("/cart/clear/");
}