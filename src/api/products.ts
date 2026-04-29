import api from "./api";
import type {  ProductDetail, Category } from "../types/product";

export async function listProducts(params?: { search?: string; category?: string; page?: number }) { 
    const res = await api.get("/products/", { params });

      return res.data.results; }

      export async function  listCategories() {
        const res = await api.get<Category[]>("/categories/");
          return res.data;
      }

      export async function getProduct(slug: string) {
        const res = await api.get<ProductDetail>(`/products/${slug}/`);
        return res.data;
      }