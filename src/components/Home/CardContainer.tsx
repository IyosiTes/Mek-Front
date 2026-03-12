import type{ Product } from "../../types/product";
import { HomeCard } from "./HomeCard";

type CardContainerProps = { 
  products: Product[]; 
};

export function CardContainer({ products }: CardContainerProps) { 


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3 bg-bird" >
      {products.map((product) => (
        <HomeCard key={product.id} product={product} />
   
      ))}
    </div>
  );
}
