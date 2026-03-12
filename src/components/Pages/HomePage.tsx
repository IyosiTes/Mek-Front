
import Header from "../Home/Header";
import { CardContainer } from "../Home/CardContainer";
import { useProducts } from "../../hooks/useProducts";
import { ProductSkeletonGrid } from "../ui/ProductSGrid";
import { ErrorMessage } from "../ui/ErrorMessage";



export  function HomePage() {
  const { data, isLoading, error } = useProducts();



  return (
    
    <div>
    <Header />
    <div >
     
      <h1 className="justify-self-center text-2xl font-bold mb-6 text-dgray">
        Our Products
        </h1>

             {error && (
        <div className="mb-4">
          <ErrorMessage error={error} />
        </div>
      )}

      {isLoading ? (
       <ProductSkeletonGrid />
      ) : (    
      <CardContainer products={data ?? []} />
      )}
    </div>
    </div>
  );
}


