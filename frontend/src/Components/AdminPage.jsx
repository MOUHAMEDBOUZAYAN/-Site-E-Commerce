import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ProductManager = ({ apiUrl = "http://127.0.0.1:9000/api/products" }) => {
    // State for the product list
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    
    const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sport'];

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            description: '',
            category: '',
            stock: '',
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Product name is required'),
            price: Yup.number().required('Price is required').positive('Price must be positive'),
            description: Yup.string().required('Description is required'),
            category: Yup.string().required('Category is required'),
            stock: Yup.number().required('Stock is required').integer('Stock must be an integer').positive('Stock must be positive'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('category', values.category);
            formData.append('stock', values.stock);
            if (values.image) {
                formData.append('image', values.image);
            }

            try {
                const response = await axios.post(apiUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 201) {
                    // Reset form fields
                    resetForm();
                    fetchProducts(); // Refresh the product list
                }
            } catch (error) {
                console.error("Error during submission:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleImageChange = (e) => {
        formik.setFieldValue('image', e.currentTarget.files[0]);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(apiUrl);
            setProducts(response.data);
        } catch (error) {
            setFetchError('Failed to fetch products.');
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#E3D5CA] to-[#F5EBE0] p-6">
                <form
                    onSubmit={formik.handleSubmit}
                    className="bg-[#D5BDAF] p-6 rounded-lg w-full max-w-2xl shadow-lg text-white"
                >
                    <h2 className="text-2xl font-semibold text-center text-black mb-6">Add a New Product</h2>

                    {formik.touched.name && formik.errors.name ? (
                        <div className="mb-4 p-3 bg-red-100 text-red-800 text-sm rounded">
                            {formik.errors.name}
                        </div>
                    ) : null}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]"
                                required
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-500 text-sm">{formik.errors.name}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]"
                                required
                            />
                            {formik.touched.price && formik.errors.price && (
                                <div className="text-red-500 text-sm">{formik.errors.price}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Category</label>
                            <select
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                            {formik.touched.category && formik.errors.category && (
                                <div className="text-red-500 text-sm">{formik.errors.category}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formik.values.stock}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]"
                                required
                            />
                            {formik.touched.stock && formik.errors.stock && (
                                <div className="text-red-500 text-sm">{formik.errors.stock}</div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 rounded bg-[#F5EBE0] text-black border border-[#D5BDAF]"
                            required
                        />
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-red-500 text-sm">{formik.errors.description}</div>
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black mb-1">Select Image</label>
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
                            {formik.values.image ? 'Change Image' : 'Select Image'}
                        </button>
                        {formik.values.image && (
                            <div className="mt-2 text-sm text-black">
                                Selected File: <strong>{formik.values.image.name}</strong>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className={`w-full mt-6 p-3 font-semibold rounded ${
                            formik.isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D5BDAF] hover:bg-black text-white'
                        }`}
                    >
                        {formik.isSubmitting ? 'Submitting...' : 'Add Product'}
                    </button>
                </form>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-center text-black mb-6">Product List</h2>
                {loadingProducts ? (
                    <div>Loading products...</div>
                ) : fetchError ? (
                    <div className="text-red-500">{fetchError}</div>
                ) : (
                    <ul className="list-disc list-inside">
                        {products.map((product) => (
                            <li key={product.id} className="bg-[#D5BDAF] p-4 mb-2 rounded">
                                <h3 className="font-semibold text-black">{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <p>Category: {product.category}</p>
                                <p>Stock: {product.stock}</p>
                                <p>Description: {product.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProductManager;