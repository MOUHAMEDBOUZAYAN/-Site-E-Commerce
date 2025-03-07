import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ product = null, apiUrl = "http://127.0.0.1:9000/api/products" }) => {
    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const [category, setCategory] = useState(product ? product.category : '');
    const [stock, setStock] = useState(product ? product.stock : '');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error and success state
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);

        if (image) {
            formData.append('image', image);
        }

        try {
            setLoading(true);

            // Send POST request to the API
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setSuccess(true); // Show success message
                // Reset form fields
                setName('');
                setPrice('');
                setDescription('');
                setCategory('');
                setStock('');
                setImage(null);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to submit the product.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#E3D5CA] to-[#F5EBE0] p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-[#D5BDAF] p-6 rounded-lg w-full max-w-2xl shadow-lg text-white"
            >
                <h2 className="text-2xl font-semibold text-center text-black mb-6">
                    {product ? 'Edit Product' : 'Add a New Product'}
                </h2>

                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-800 text-sm rounded">
                        Product submitted successfully!
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 text-sm rounded">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]"
                            required
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-black mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-black mb-1">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="imageInput"
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById('imageInput').click()}
                        className="w-full p-2 bg-[#D5BDAF] text-white font-semibold rounded hover:bg-black"
                    >
                        {image ? 'Change Image' : 'Choose Image'}
                    </button>
                    {image && (
                        <div className="mt-2 text-sm text-black">
                            Selected File: <strong>{image.name}</strong>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-6 p-3 font-semibold rounded ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D5BDAF] hover:bg-black text-white'
                    }`}
                >
                    {loading ? 'Submitting...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;