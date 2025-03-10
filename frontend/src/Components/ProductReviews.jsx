import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductReviews = ({ productId, refresh }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/comments?productId=${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires", error);
      }
    };

    fetchReviews();
  }, [productId, refresh]); 

  return (
    <div className="mt-4 p-4 bg-[#efcfbd] rounded">
      <h2 className="text-lg font-semibold text-gray-700">Liste des Commentaires</h2>
      {reviews.length > 0 ? (
        <ul className="mt-2">
          {reviews.map((review, index) => (
            <li key={index} className="p-2 border-b border-gray-300">
              <p className="text-sm font-bold text-gray-800">{review.name}</p>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Aucun commentaire pour l’instant.</p>
      )}
    </div>
  );
};

export default ProductReviews;
