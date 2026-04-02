import type{ Product } from "../types/product";
import { getImageUrl } from "./getImageUrl";

// Define a guest-specific cart item interface ( for localStorage)
export interface GuestCartItem {
  product_id: number;  // Matches Product.id (number)
  name: string;
  price: string;       // Matches Product.price (string)
  image: string;
  quantity: number;
  stock: number;
}

export const getGuestCart = (): GuestCartItem[] => {
  try {
    const cart = localStorage.getItem("guest_cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error parsing guest cart from localStorage:", error);
    return [];
  }
};

export const addGuestItem = (product: Product, quantity: number) => {
  const cart = getGuestCart();

  const existing = cart.find((item) => item.product_id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: getImageUrl(product.image),
      stock: product.is_available ? 1 : 0,
      quantity,
    });
  }

  try {
    localStorage.setItem("guest_cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving guest cart to localStorage:", error);
  }
};

export const clearGuestCart = () => {
  localStorage.removeItem("guest_cart");
};