import { useQuery } from "@tanstack/react-query";
import { listProducts } from "../api/products";

export function useProducts(params?: { search?: string; category?: string; page?: number }) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => listProducts(params),
    staleTime: 1000 * 60,
    
     
 
  });

}