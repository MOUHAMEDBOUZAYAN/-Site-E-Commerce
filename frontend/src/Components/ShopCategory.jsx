import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";

const ShopCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:9000/api/products")
      .then(response => {
        const filteredProducts = response.data.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filteredProducts);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des produits:", error);
        setError("Impossible de charger les produits");
      })
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 capitalize">
          {category}
        </h1>
        <div className="h-1 w-24 bg-emerald-600 mt-2"></div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-600"></div>
          <p className="text-gray-600 mt-4">Chargement des produits...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
          <p className="font-medium">Erreur</p>
          <p>{error}</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg mb-2">Aucun produit trouvé dans cette catégorie.</p>
          <p className="text-gray-500">Essayez de chercher dans une autre catégorie ou revenez bientôt.</p>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;