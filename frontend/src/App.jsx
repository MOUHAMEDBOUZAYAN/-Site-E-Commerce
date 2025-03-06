import React, { useState } from 'react';
import Comments from './Components/Comments';
import ProductReviews from './Components/ProductReviews';

const App = () => {
    const productId = 'exampleProductId';
    const [refresh, setRefresh] = useState(false);

    const handleCommentAdded = () => {
        setRefresh(prev => !prev);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Commentaires</h1>
            <Comments productId={productId} onCommentAdded={handleCommentAdded} />
            <ProductReviews productId={productId} refresh={refresh} />
        </div>
    );
};

export default App;
