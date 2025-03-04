import React from 'react';
import ReviewSection from './Components/Comments';

const App = () => {
    const productId = 'exampleProductId';

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Comments</h1>
            <ReviewSection productId={productId} />
        </div>
    );
};

export default App;