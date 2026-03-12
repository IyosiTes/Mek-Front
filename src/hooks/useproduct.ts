import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/products";
import type { ProductDetail } from "../types/product";


export function useProduct(slug: string) {
  return useQuery<ProductDetail>({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
    staleTime: 1000 * 60, // cache for 1 minute
    refetchOnWindowFocus: false,
  });
}
