// src/pages/ProductDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../../api/products";
import type { ProductDetail } from "../../types/product";
import { useCart } from "../../hooks/usecart";
import LoaderSpinner from "../ui/LoadingSpinner"; 
//import { useAuth } from "../../hooks/useAuth";



export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // LMAO hooks must run unconditionally at top level
  
  const { addToCart } = useCart();
  const navigate = useNavigate();
// const { user } = usrAuth();
  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!slug) return;
        const data = await getProduct(slug);
        setProduct(data);
      } catch {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

 
  if (loading) 
  return (
    <div className="min-h-screen flex justify-center items-center">
      <LoaderSpinner size={60} />
    </div>
  );
  if (error) return <div className ="text-center text-red-500">{error}</div>;
  if (!product) return <div className="text-center">No product found.</div>;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      product: {
        ...product,
        is_available: product.is_active // Map is_active to is_available
      },
      quantity: 1,
    });
    navigate("/cart");
  };

  return (
    <div className="min-h-screen w-full mx-auto p-6 bg-bird flex flex-col justify-between my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT (md+): Image | MOBILE: shown after name+price */}
        <div className="md:order-1 order-2">
          {/* Mobile-only: Name + Price FIRST */}
          <div className="flex md:hidden mb-4 gap-6 justify-center flex-col items-center">
            <h1 className="text-2xl font-bold text-dgray">{product.name}</h1>
            <p className="text-xl font-semibold  text-dgray">{product.price}birr</p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={"https://picsum.photos/300"}//product.image
              alt={product.name}
              className="w-full max-w-2xl rounded-lg shadow-lg border border-gray-200 mt-6 mb-6"
            />
          </div>
        </div>

        {/* RIGHT (md+): Info | MOBILE: details below image */}
        <div className="md:order-2 order-3 mt-6 md:mt-0">
          {/* Desktop-only: Name + Price at top of info column */}
          <div className="hidden  md:flex  flex-col gap-6 mb-6">
            <h1 className="text-3xl font-bold text-dgray">{product.name}</h1>
            <p className="text-2xl font-semibold text-dgray">{product.price}birr</p>
          </div>

          {/* Details */}
          <p className="text-dark mb-4 leading-relaxed">{product.description}</p>

          <p className="mb-2">
            <span className="font-medium text-dgray">Category:</span> {product.category.name}
          </p>

          <p className="mb-2">
            <span className="font-medium text-dgray">Available:</span>{" "}
            {product.is_active ? (
              <span className="text-green-600">✅</span>
            ) : (
              <span className="text-red-500">❌</span>
            )}
          </p>

          <p className="mb-6">
            <span className="font-medium text-dgray">Stock:</span>{" "}
            {product.stock > 0 ? (
              <span className="text-dgray">{product.stock} in stock</span>
            ) : (
              <span className="text-red-500">Out of stock</span>
            )}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || !product.is_active}
            className={`px-6 py-3 cursor-pointer rounded-md font-medium text-white transition ${
              product.is_active && product.stock > 0
                ? "bg-main hover:bg-hover"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {product.stock > 0 && product.is_active ? "Add to Cart" : "Unavailable"}
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Created: {new Date(product.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
