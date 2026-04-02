import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../api/cart";

import {
  getGuestCart,
  addGuestItem,
  clearGuestCart
} from "../utils/guestCart";

import type { Product } from "../types/product";
import type { Cart, CartItem } from "../types/cart";

export function useCart() {
  const { user } = useAuth();
  const qc = useQueryClient();

  // Normalize cart to always Cart shape
  const cartQuery = useQuery<Cart>({
  queryKey: ["cart"],
  queryFn: async () => {
    if (user) {
      return fetchCart();
    } else {
      const guest = getGuestCart();

      const items: CartItem[] = guest.map((g) => ({
        id: g.product_id,
        product: {
          name: g.name,
          price: g.price.toString(), 
          image: g.image,
          stock: g.stock ?? 0, 
        },
        quantity: g.quantity,
        total_price: Number(g.price) * g.quantity,
      }));

      const total_items = items.reduce((sum, i) => sum + i.quantity, 0);
      const total_price = items.reduce((sum, i) => sum + i.total_price, 0);

      return { items, total_items, total_price };
    }
  },
});

  // Add item
  const addMutation = useMutation({
    mutationFn: async ({ product, quantity }: { product: Product; quantity: number }) => {
      if (user) {
        await addToCart(product.id, quantity);
      } else {
        addGuestItem(product, quantity);
      }
    },
    onSuccess: () => {
      toast.success("Item added to cart 🛒");
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Failed to add item ❌"),
  });

  // Update quantity
  const updateMutation = useMutation({
    mutationFn: async ({ item_id, quantity }: { item_id: number; quantity: number }) => {
      if (user) {
        await updateCartItem(item_id, quantity);
      } else {
        const guest = getGuestCart();
        const item = guest.find((i) => i.product_id === item_id);
        if (item) item.quantity = quantity;
        localStorage.setItem("guest_cart", JSON.stringify(guest));
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
    onError: () => toast.error("Failed to update quantity"),
  });

  // Remove item
  const removeMutation = useMutation({
    mutationFn: async (item_id: number) => {
      if (user) {
        await removeCartItem(item_id);
      } else {
        const guest = getGuestCart().filter((i) => i.product_id !== item_id);
        localStorage.setItem("guest_cart", JSON.stringify(guest));
      }
    },
    onSuccess: () => {
      toast.info("Item removed from cart");
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Failed to remove item"),
  });

  // Clear cart
  const clearMutation = useMutation({
    mutationFn: async () => {
      if (user) {
        await clearCart();
      } else {
        clearGuestCart();
      }
    },
    onSuccess: () => {
      toast.info("Cart cleared");
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Failed to clear cart"),
  });

  return {
    ...cartQuery,
    addToCart: addMutation.mutate,
    updateItem: updateMutation.mutate,
    removeItem: removeMutation.mutate,
    clearCart: clearMutation.mutate,
  };
}