import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, activeColor }) => {
  const [imageError, setImageError] = useState(false);

  if (!product || !product._id || !product.name) {
    console.error("ProductCard: données de produit invalides", product);
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative">
        {imageError ? (
          <div className="w-full h-56 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Image non disponible</span>
          </div>
        ) : (
          <img
            src={`http://localhost:9000/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-56 object-cover"
            onError={() => {
              setImageError(true);
              console.error(`Erreur de chargement de l'image: ${product.image}`);
            }}
          />
        )}
        <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          ${product.price}
        </div>
        {product.stock !== undefined && (
          <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Stock: {product.stock}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-800 truncate">{product.name}</h2>
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <div className="mt-4">
          <Link
            to={`/Store/product/${product._id}`}
            className={`block w-full text-center text-white py-2 rounded-lg transition-colors duration-300 font-medium ${activeColor ? '' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            style={activeColor ? { backgroundColor: activeColor } : {}}
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;