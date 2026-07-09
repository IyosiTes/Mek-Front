import type{ Product } from "../../types/product";
import { HomeCard } from "./HomeCard";
import { AddProductCard } from "./AddProduct";
type CardContainerProps = { 
  products: Product[]; 
};

export function CardContainer({ products }: CardContainerProps) { 


  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3 bg-bird">
      {products.map((product) => (
        <HomeCard key={product.id} product={product} />
   
      ))}
      <AddProductCard />
    </div>
  );
}
