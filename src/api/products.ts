import axios from "axios";
import type { Product, ProductDetail, Category } from "../types/product";

const client = axios.create({baseURL: "http://localhost:8000/api"});

export async function listProducts(params?: { search?: string; category?: string; page?: number }) { 
  const res = await client.get< Product[] >("/products/", { params });
   return res.data; }

  

     export async function  listCategories() {
      const res = await client.get<Category[]>("/categories/");
      return res.data;
     }

     export async function getProduct(slug: string) {
       const res = await client.get<ProductDetail>(`/products/${slug}/`);
        return res.data;
     }