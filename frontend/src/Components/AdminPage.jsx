import React, { useState } from 'react';

const ProductForm = ({ product, onSubmit }) => {
    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const [category, setCategory] = useState(product ? product.category : '');
    const [stock, setStock] = useState(product ? product.stock : '');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const categories = ['Electronics', 'Mode', 'Maison', 'Beauté', 'Sport'];

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { name, price, description, category, stock };
        const formData = new FormData();
        Object.keys(productData).forEach((key) => formData.append(key, productData[key]));
        if (image) formData.append('image', image);
        await onSubmit(formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#E3D5CA] to-[#F5EBE0] p-6">
            <form onSubmit={handleSubmit} className="bg-[#D5BDAF] p-6 rounded-lg max-w-2xl w-full shadow-lg text-white">
                <h2 className="text-2xl font-semibold text-center text-black mb-4">Add a New Product</h2>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-black">Product Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                               className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                               className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]" required>
                            <option value="">Select a category</option>
                            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Stock</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)}
                               className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]" required />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-black">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                              className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]" required />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-black">Product Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageInput" />
                    <button type="button" onClick={() => document.getElementById('imageInput').click()}
                            className="w-full p-2 bg-[#D5BDAF] text-white font-semibold rounded hover:bg-[#000000]">
                        {image ? image.name : 'Choose Image'}
                    </button>
                </div>

                <button type="submit" className="w-full mt-4 p-3 bg-[#D5BDAF] hover:bg-[#000000] text-white font-semibold rounded">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
