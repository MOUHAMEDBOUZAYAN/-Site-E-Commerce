import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ShopCategory = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4444/api/products?category=${category}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error("Erreur lors du chargement des produits:", error));
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Catégorie: {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="border p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              <h2 className="text-lg font-bold mt-2">{product.name}</h2>
              <p className="text-red-500 font-semibold">${product.price}</p>
              <Link to={`/productDetail/${product._id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
                Voir Détails
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">Aucun produit trouvé dans cette catégorie.</p>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
