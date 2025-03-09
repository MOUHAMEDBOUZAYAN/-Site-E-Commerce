import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

const Shop = () => {
  
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); 
  const location = useLocation();

  const categoryColors = {
    all: { 
      from: 'from-blue-500', 
      to: 'to-purple-600', 
      bg: 'bg-blue-500',
      searchBg: 'bg-blue-100',
      searchRing: 'ring-blue-300',
      searchFocus: 'focus:ring-blue-200'
    },
    women: { 
      from: 'from-pink-400', 
      to: 'to-pink-600', 
      bg: 'bg-pink-500',
      searchBg: 'bg-pink-50',
      searchRing: 'ring-pink-200',
      searchFocus: 'focus:ring-pink-100'
    },
    sport: { 
      from: 'from-green-500', 
      to: 'to-green-700', 
      bg: 'bg-green-500',
      searchBg: 'bg-green-50',
      searchRing: 'ring-green-200',
      searchFocus: 'focus:ring-green-100'
    },
    home: { 
      from: 'from-amber-400', 
      to: 'to-amber-600', 
      bg: 'bg-amber-500',
      searchBg: 'bg-amber-50',
      searchRing: 'ring-amber-200',
      searchFocus: 'focus:ring-amber-100'
    },
    electronique: { 
      from: 'from-gray-600', 
      to: 'to-gray-900', 
      bg: 'bg-gray-700',
      searchBg: 'bg-gray-100',
      searchRing: 'ring-gray-300',
      searchFocus: 'focus:ring-gray-200'
    }
  };

  // Déterminer la catégorie active en fonction de l'URL ou de l'état local
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setCategory("all");
    }
  }, [location.pathname]);

  useEffect(() => {
    // Récupérer les produits depuis l'API
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:9000/api/products');
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau:', response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrer les produits par catégorie et terme de recherche
  const filteredProducts = products
    .filter(product => category === 'all' || product.category.toLowerCase() === category.toLowerCase())
    .filter(product => 
      searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Obtenir les couleurs pour la catégorie active
  const activeColors = categoryColors[category] || categoryColors.all;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className={`bg-gradient-to-r ${activeColors.from} ${activeColors.to} text-white py-12 mb-8`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Boutique 404</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Découvrez notre sélection de produits de haute qualité pour tous vos besoins.</p>
          
          {/* Barre de recherche avec couleur plus pâle */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className={`w-full py-3 px-4 pr-10 rounded-full border-none shadow-lg ${activeColors.searchBg} 
                         focus:outline-none focus:ring-2 ${activeColors.searchFocus} text-gray-800 
                         transition-colors duration-300`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {/* Utilisation d'un SVG inline au lieu de react-icons */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Options de filtre et vue */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 md:mb-0 w-full md:w-auto">
            <h2 className="font-semibold text-lg mb-2">Catégories</h2>
            <ul className="flex flex-wrap gap-3">
              {Object.keys(categoryColors).map((cat) => (
                <li 
                  key={cat}
                  onClick={() => setCategory(cat)} 
                  className={`px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 ${
                    category === cat 
                      ? categoryColors[cat].bg + ' text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'electronique' ? 'Electronics' : 
                   cat.charAt(0).toUpperCase() + cat.slice(1)}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Option pour basculer entre les modes d'affichage avec SVG inline */}
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-2 rounded-md ${viewMode === 'grid' ? activeColors.bg + ' text-white' : 'bg-gray-200'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-2 rounded-md ${viewMode === 'list' ? activeColors.bg + ' text-white' : 'bg-gray-200'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Nombre de résultats avec fond légèrement teinté */}
        <div className={`${activeColors.searchBg} p-4 rounded-lg shadow-md mb-6`}>
          <p className="text-gray-700">
            <strong>{filteredProducts.length}</strong> produits trouvés
            {category !== 'all' && <span> dans la catégorie <strong className="capitalize">{category}</strong></span>}
            {searchTerm && <span> pour "<strong>{searchTerm}</strong>"</span>}
          </p>
        </div>

        {/* Affichage des produits */}
        {loading ? (
          <div className="text-center py-12">
            <div className={`inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${activeColors.bg} mb-4`}></div>
            <p className="text-gray-600">Chargement des produits...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredProducts.map(product => (
              viewMode === 'grid' ? (
                <ProductCard key={product._id} product={product} activeColor={activeColors.bg} />
              ) : (
                <div key={product._id} className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img src={product.image} alt={product.name} className="w-1/3 object-cover" />
                  <div className="p-4 flex-1">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                    <p className="line-clamp-2 text-gray-600 mb-4">{product.description || 'Aucune description disponible'}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold" style={{color: activeColors.bg}}>${product.price}</p>
                      {product.stock !== undefined && (
                        <p className="text-sm font-medium text-gray-600">Stock: {product.stock}</p>
                      )}
                      <Link 
                        to={`/product/${product._id}`} 
                        className={`text-white ${activeColors.bg} hover:opacity-90 py-2 px-4 rounded-md transition-colors duration-300`}
                      >
                        Voir plus
                      </Link>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600 mb-4">Aucun produit trouvé</p>
            <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
            <button 
              onClick={() => {setCategory('all'); setSearchTerm('');}} 
              className={`mt-4 ${activeColors.bg} hover:opacity-90 text-white px-4 py-2 rounded-md transition-colors duration-300`}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Shop;