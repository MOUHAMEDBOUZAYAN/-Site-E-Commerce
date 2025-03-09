import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          ${product.price}
        </div>
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
            to={`/product/${product._id}`} 
            className="block w-full text-center text-white bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg transition-colors duration-300 font-medium"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;