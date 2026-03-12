import type{ Product } from "../../types/product";
import { Link } from "react-router-dom";

type HomeCardProps = {
   product: Product; 
  };

export  function HomeCard({ product }: HomeCardProps) {
     return ( 
        <div className=" rounded shadow hover:scale-105 bg-white transition">
         
            <Link to={`/products/${product.slug}`}> 
            <img src={ "https://picsum.photos/300"} 
            alt={product.name}
             className="w-full h-48 object-cover" /> 
             </Link> 
             <div className="p-2">
               <h3 className="text-lg text-dgray font-semibold">{product.name}</h3> 
               <p className="text-dgray">{product.price}ETB</p>
                <p className="text-sm text-sky">
                   {product.category?.name}
               </p> 
               </div> 
               </div>
              ); 
            }
// product.image ?? "/placeholder.png"