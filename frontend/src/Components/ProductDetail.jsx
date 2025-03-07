import { useParams } from "react-router-dom";
import Comments from "../Components/Comments";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4444/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => console.error("Erreur lors du chargement du produit:", error));
  }, [productId]);

  if (!product) return <p>Chargement du produit...</p>;
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-xl">${product.price}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <p className="mt-2 text-gray-500">Catégorie: {product.category}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-6">Produits Similaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {similarProducts.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
      <div className="mt-8">
        {/* <h2 className="text-xl font-semibold mb-4">Avis des utilisateurs</h2> */}
        <Comments productId={productId} />
      </div>
    </div>
  );
};

export default ProductDetail;
