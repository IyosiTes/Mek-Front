import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../../api/products";
import type { ProductDetail } from "../../types/product";
import { useCart } from "../../hooks/usecart";
import LoaderSpinner from "../ui/LoadingSpinner";
import { CheckCircle, XCircle, ShoppingCart } from "lucide-react";
import { getImageUrl } from "../../utils/getImageUrl";
// import { useAuth } from "../../hooks/useAuth";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();
  // const { user } = useAuth();

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!slug) return;
        const data = await getProduct(slug);
        setProduct(data);
      } catch {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderSpinner size={60} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">No product found.</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      product: {
        ...product,
        is_available: product.is_active,
      },
      quantity: 1,
    });
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-10 md:py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-4 md:p-8">

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">

          {/* IMAGE */}
          <div className="flex flex-col items-center">
            <img
              src={getImageUrl(product.image)} 
              alt={product.name}
              className="w-full max-w-md rounded-xl object-cover shadow-md"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-between">

            {/* TOP INFO */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>

              <p className="text-xl md:text-2xl font-semibold text-main mb-4">
                {product.price} birr
              </p>

              {/* CATEGORY */}
              <p className="text-sm text-gray-500 mb-4">
                Category:{" "}
                <span className="font-medium text-gray-700">
                  {product.category.name}
                </span>
              </p>

              {/* AVAILABILITY */}
              <div className="flex items-center gap-2 mb-6">
                {product.is_active ? (
                  <>
                    <CheckCircle className="text-green-600 w-5 h-5" />
                    <span className="text-green-600 font-medium">
                      Available
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500 w-5 h-5" />
                    <span className="text-red-500 font-medium">
                      Unavailable
                    </span>
                  </>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* ACTION BUTTON */}
            <button
              onClick={handleAddToCart}
              disabled={!product.is_active}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition ${
                product.is_active
                  ? "bg-main hover:bg-hover"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={18} />
              {product.is_active ? "Add to Cart" : "Unavailable"}
            </button>

            {/* AUTH NOTE (optional later) */}
            {/*
            {!user && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Please login to add items to your cart.
              </p>
            )}
            */}
          </div>
        </div>
      </div>
    </div>
  );
}