import React, { useState } from 'react';

const ProductForm = ({ product, onSubmit }) => {
    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const [category, setCategory] = useState(product ? product.category : '');
    const [stock, setStock] = useState(product ? product.stock : '');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const categories = ['Electronics', 'Food', 'Books', 'Sports', 'Mekup', 'Art'];

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const validateInputs = () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = "Le nom du produit est requis";
        }
        if (!price || isNaN(price) || Number(price) <= 0) {
            errors.price = "Le prix doit être un nombre positif";
        }
        if (!description.trim()) {
            errors.description = "La description est requise";
        }
        if (!category) {
            errors.category = "La catégorie est requise";
        }
        if (stock === '' || isNaN(stock) || Number(stock) < 0) {
            errors.stock = "Le stock doit être un nombre positif ou zéro";
        }
        if (!product && !image) {
            errors.image = "L'image du produit est requise";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        const productData = { name, price, description, category, stock };
        const formData = new FormData();
        for (const key in productData) {
            formData.append(key, productData[key]);
        }
        if (image) {
            formData.append('image', image);
        }

        await onSubmit(formData);
    };

    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#E3D5CA] to-[#F5EBE0] p-6">
            <form onSubmit={handleSubmit} className="bg-[#D5BDAF] p-6 rounded-lg max-w-lg w-full shadow-lg text-white space-y-4">
                <h2 className="text-2xl font-semibold text-center text-black">Add a New Product</h2>

                <div>
                    <label className="block text-sm font-medium text-black">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        id="imageInput"
                        className="hidden"
                        required={!product}
                    />
                    <button type="button" onClick={handleImageClick} className="w-full p-2 bg-[#D5BDAF] text-white font-semibold rounded hover:bg-[#C4A99F]">
                        {image ? image.name : 'Choose Image'}
                    </button>
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                </div>

                <button type="submit" className="w-full p-3 bg-[#D5BDAF] hover:bg-[#C4A99F] text-white font-semibold rounded transition">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
