
export interface CartItem {
  id: number;
  product: {
    name: string;
    price: string;          // your API stores price as string
    image?: string;
    stock: number; 
  };
  quantity: number;
  total_price: number;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  total_price: number;
}