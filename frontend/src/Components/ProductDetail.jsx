import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Charger le produit sélectionné
  useEffect(() => {
    setLoading(true);
    setError(false);

    axios.get(`http://localhost:9000/api/products/${productId}`)
      .then(response => {
        console.log("Image path:", response.data.data.image); 
        setProduct(response.data.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  // Charger les produits similaires une fois le produit défini
  useEffect(() => {
    if (!product) return;

    axios.get("http://localhost:9000/api/products")
      .then(response => {
        const similar = response.data
          .filter(p => p.category === product.category && p._id !== product._id)
          .slice(0, 3); // Limiter à 3 produits similaires
        setSimilarProducts(similar);
      })
      .catch(error => console.error("Erreur chargement produits similaires:", error));
  }, [product]);

  if (loading) return (
    <div className="container mx-auto p-6 text-center">
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
      </div>
      <p className="text-xl text-gray-600 mt-4">Chargement du produit...</p>
    </div>
  );

  if (error || !product) return (
    <div className="container mx-auto p-6 text-center">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
        <p className="font-medium">Erreur</p>
        <p>Produit introuvable. Veuillez vérifier l'ID du produit.</p>
      </div>
      <Link to="/" className="inline-block mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg">
        Retour à la boutique
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-100 p-6">
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
          </div>
          <div className="p-8">
            <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-emerald-600 text-2xl font-bold my-4">${product.price}</p>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg inline-block">
              Stock disponible: {product.stock}
            </div>
            <div className="h-px bg-gray-200 my-6"></div>
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description || "Aucune description disponible pour ce produit."}</p>
            
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              <Link 
                to={`/Store/comments/${productId}`} 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
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
            {similarProducts.map(p => (
              <div key={p._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>
                  <p className="text-emerald-600 font-bold mt-2">${p.price}</p>
                  <Link 
                    to={`/product/${p._id}`} 
                    className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg mt-4 transition-colors duration-300"
                  >
                    Voir détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;