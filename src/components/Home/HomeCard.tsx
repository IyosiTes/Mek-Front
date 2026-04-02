import type{ Product } from "../../types/product";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";

type HomeCardProps = {
   product: Product; 
  };

export  function HomeCard({ product }: HomeCardProps) {
     return ( 
        <div className="  rounded shadow hover:scale-105  bg-white transition transform duration-300">
         
            <Link to={`/products/${product.slug}`}> 
            <img src={ getImageUrl(product.image)} 
            alt={product.name}
             className="w-full h-48 object-cover rounded-t" /> 
             </Link> 
             <div className="p-2">
               <h3 className="text-lg text-dgray font-semibold">{product.name}</h3> 
               <p className="text-dgray">{product.price}ETB</p>
                <p className="text-sm text-burg bg-bird rounded-full px-2 py-1 inline-block ">
                   {product.category?.name}
               </p> 
               </div> 
               </div>
              ); 
            }
