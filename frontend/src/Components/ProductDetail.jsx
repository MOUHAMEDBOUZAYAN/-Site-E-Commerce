import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Charger les détails du produit
    axios.get(`http://localhost:9000/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);

        // Charger les produits similaires (même catégorie)
        return axios.get("http://localhost:9000/api/products");
      })
      .then(response => {
        if (product && Array.isArray(response.data)) {
          const similar = response.data
            .filter(p => p.category === product.category && p._id !== product._id)
            .slice(0, 3); // Limiter à 3 produits similaires
          setSimilarProducts(similar);
        }
      })
      .catch(error => console.error("Erreur lors du chargement:", error))
      .finally(() => setLoading(false));
  }, [productId, product?.category]);

  if (loading || !product) return (
    <div className="container mx-auto p-6 text-center">
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
      </div>
      <p className="text-xl text-gray-600 mt-4">Chargement du produit...</p>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-100 p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <div className="p-8">
            <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-emerald-600 text-2xl font-bold my-4">${product.price}</p>
            <div className="h-px bg-gray-200 my-6"></div>
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              
              <Link 
                to={`/comments/${productId}`} 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Voir les avis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Produits Similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProducts.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;