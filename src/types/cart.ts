//import type { ProductDetail } from "./product";

//export interface CartItem {
  //id: number;               // ID of the cart item in the backend
  //product: ProductDetail;    // The product object
  //quantity: number;         // How many of this product
 // total_price: number;     //computed total price for this item 
//}

// interface Cart {
 // id: number;               // Cart ID
  //items: CartItem[];
  //total_items: number;       // Total number of items in the cart
  //total_price: number;      // Computed total from backend
//}

// src/types/cart.ts
export interface CartItem {
  id: number;
  product: {
    name: string;
    price: string;          // your API stores price as string
    image?: string;
  };
  quantity: number;
  total_price: number;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  total_price: number;
}