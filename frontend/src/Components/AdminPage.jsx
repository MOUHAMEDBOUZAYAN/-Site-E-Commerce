import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ProductManager = ({ apiUrl = "http://127.0.0.1:9000/api/products" }) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    
    const categories = ['women', 'sport', 'home', 'electronics'];

    const fetchProducts = async () => {
        try {
            const response = await axios.get(apiUrl);
            setProducts(response.data);
            setFetchError(null);
        } catch (error) {
            setFetchError('Failed to fetch products.');
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
                    resetForm();
                    fetchProducts(); // Refresh list
                }
            } catch (error) {
                console.error("Error during submission:", error.response?.data || error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleImageChange = (e) => {
        formik.setFieldValue('image', e.currentTarget.files[0]);
    };

    return (
        <div className="p-6 grid grid-cols-2 gap-6 min-h-screen">
            {/* Add Product Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Add a New Product</h2>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Product Name</label>
                            <input type="text" name="name" {...formik.getFieldProps('name')} className="w-full p-2 border rounded" />
                            {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" name="price" {...formik.getFieldProps('price')} className="w-full p-2 border rounded" />
                            {formik.touched.price && formik.errors.price && <div className="text-red-500 text-sm">{formik.errors.price}</div>}
                        </div>
                        <div>
                            <label>Category</label>
                            <select name="category" {...formik.getFieldProps('category')} className="w-full p-2 border rounded">
                                <option value="">Select a category</option>
                                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            {formik.touched.category && formik.errors.category && <div className="text-red-500 text-sm">{formik.errors.category}</div>}
                        </div>
                        <div>
                            <label>Stock</label>
                            <input type="number" name="stock" {...formik.getFieldProps('stock')} className="w-full p-2 border rounded" />
                            {formik.touched.stock && formik.errors.stock && <div className="text-red-500 text-sm">{formik.errors.stock}</div>}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label>Description</label>
                        <textarea name="description" {...formik.getFieldProps('description')} className="w-full p-2 border rounded" />
                        {formik.touched.description && formik.errors.description && <div className="text-red-500 text-sm">{formik.errors.description}</div>}
                    </div>
                    <div className="mt-4">
                        <label>Select Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
                    </div>
                    <button type="submit" disabled={formik.isSubmitting} className="mt-4 bg-blue-500 text-white p-2 rounded w-full">
                        {formik.isSubmitting ? 'Submitting...' : 'Add Product'}
                    </button>
                </form>
            </div>
            
            {/* Product List Table */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Product List</h2>
                {loadingProducts ? (
                    <p>Loading products...</p>
                ) : fetchError ? (
                    <p className="text-red-500">{fetchError}</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Category</th>
                                <th className="border p-2">Stock</th>
                                <th className="border p-2">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? products.map((product) => (
                                <tr key={product.id} className="border">
                                    <td className="border p-2">{product.name}</td>
                                    <td className="border p-2">${product.price}</td>
                                    <td className="border p-2">{product.category}</td>
                                    <td className="border p-2">{product.stock}</td>
                                    <td className="border p-2">{product.description}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-500 p-4">No products available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ProductManager;
