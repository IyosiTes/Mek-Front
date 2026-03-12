export interface Category {
    id: number;
    name: string;
    slug: string;
}


export interface Product {
    id: number;
    name: string;
    slug: string;
    price:string;
    image:string;
    category: Category;
    is_available: boolean;
}

export interface ProductDetail {
    id:number;
    name: string;
    slug: string;
    description: string;
    price: string;
    image: string;
    category: Category;
   // vendor: Vendor | null;
    stock: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}