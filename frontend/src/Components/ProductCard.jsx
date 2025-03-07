import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-500">{product.category}</p>
      <p className="text-xl font-bold text-blue-600">${product.price}</p>
      <Link to={`/product/${product._id}`} className="block mt-2 text-center text-white bg-blue-500 py-2 rounded-md">
        see more
      </Link>
    </div>
  );
};

export default ProductCard;
