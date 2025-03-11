import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons from react-icons

const ProductManager = ({ apiUrl = "http://127.0.0.1:9000/api/products" }) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product to edit

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
                if (selectedProduct) {
                    // Update existing product
                    const response = await axios.put(`${apiUrl}/${selectedProduct.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    if (response.status === 200) {
                        fetchProducts(); // Refresh list
                        resetForm();
                        setSelectedProduct(null); // Reset selected product
                    }
                } else {
                    // Add new product
                    const response = await axios.post(apiUrl, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    if (response.status === 201) {
                        resetForm();
                        fetchProducts(); // Refresh list
                    }
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

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        formik.setValues({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            stock: product.stock,
            image: null, // No image will be set initially
        });
    };

    const handleDeleteClick = async (productId) => {
        try {
            const response = await axios.delete(`${apiUrl}/${productId}`);
            if (response.status === 200) {
                fetchProducts(); // Refresh list after deletion
            }
        } catch (error) {
            console.error("Error during deletion:", error.response?.data || error.message);
        }
    };

    const handleCloseEdit = () => {
        setSelectedProduct(null); // Hide the update form
    };

    return (
        <div className="p-6 min-h-screen" style={{ backgroundColor: '#F5EBE0' }}>
            {/* Add Product Form */}
            <div className="bg-[#D5BDAF] p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl text-center font-bold mb-6" style={{ color: '#3E2A47' }}>Add a New Product</h2>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label>Product Name</label>
                            <input type="text" name="name" {...formik.getFieldProps('name')} className="w-full p-2 border rounded" style={{ backgroundColor: '#E3D5CA' }} />
                            {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" name="price" {...formik.getFieldProps('price')} className="w-full p-2 border rounded" style={{ backgroundColor: '#E3D5CA' }} />
                            {formik.touched.price && formik.errors.price && <div className="text-red-500 text-sm">{formik.errors.price}</div>}
                        </div>
                        <div>
                            <label>Category</label>
                            <select name="category" {...formik.getFieldProps('category')} className="w-full p-2 border rounded" style={{ backgroundColor: '#E3D5CA' }}>
                                <option value="">Select a category</option>
                                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            {formik.touched.category && formik.errors.category && <div className="text-red-500 text-sm">{formik.errors.category}</div>}
                        </div>
                        <div>
                            <label>Stock</label>
                            <input type="number" name="stock" {...formik.getFieldProps('stock')} className="w-full p-2 border rounded" style={{ backgroundColor: '#E3D5CA' }} />
                            {formik.touched.stock && formik.errors.stock && <div className="text-red-500 text-sm">{formik.errors.stock}</div>}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label>Description</label>
                        <textarea name="description" {...formik.getFieldProps('description')} className="w-full p-2 border rounded" style={{ backgroundColor: '#E3D5CA' }} />
                        {formik.touched.description && formik.errors.description && <div className="text-red-500 text-sm">{formik.errors.description}</div>}
                    </div>
                    <div className="mt-4">
                        <label>Select Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-white p-2 border rounded " style={{ backgroundColor: '#171716' }} />
                    </div>
                    <button type="submit" disabled={formik.isSubmitting} className="mt-4 bg-[#D5BDAF] text-white p-3 rounded w-full hover:bg-[#171716] transition-all duration-300">
                        {formik.isSubmitting ? 'Submitting...' : 'Add Product'}
                    </button>
                </form>
            </div>

            {/* Edit Product Form */}
            {selectedProduct && (
                <div className="bg-[#D5BDAF] p-6 rounded-lg shadow-lg mb-6 relative">
                    <button
                        onClick={handleCloseEdit}
                        className="absolute top-2 right-2 text-xl text-white bg-red-500 rounded-full p-2 hover:bg-red-700"
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl text-center font-bold mb-6" style={{ color: '#3E2A47' }}>Edit Product</h2>
                    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label>Product Name</label>
                                <input type="text" name="name" {...formik.getFieldProps('name')} className="w-full p-2 border rounded" style={{ backgroundColor: '#E3D5CA' }} />
                                {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
                            </div>
                            <div>
                                <label>Price</label>
                                <input type="number" name="price" {...formik.getFieldProps('price')} className="w-full p-2 border rounded" style={{ backgroundColor: '#E3D5CA' }} />
                                {formik.touched.price && formik.errors.price && <div className="text-red-500 text-sm">{formik.errors.price}</div>}
                            </div>
                            <div>
                                <label>Category</label>
                                <select name="category" {...formik.getFieldProps('category')} className="w-full p-2 border rounded" style={{ backgroundColor: '#E3D5CA' }}>
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                                {formik.touched.category && formik.errors.category && <div className="text-red-500 text-sm">{formik.errors.category}</div>}
                            </div>
                            <div>
                                <label>Stock</label>
                                <input type="number" name="stock" {...formik.getFieldProps('stock')} className="w-full p-2 border rounded" style={{ backgroundColor: '#E3D5CA' }} />
                                {formik.touched.stock && formik.errors.stock && <div className="text-red-500 text-sm">{formik.errors.stock}</div>}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label>Description</label>
                            <textarea name="description" {...formik.getFieldProps('description')} className="w-full p-2 border rounded" style={{ backgroundColor: '#E3D5CA' }} />
                            {formik.touched.description && formik.errors.description && <div className="text-red-500 text-sm">{formik.errors.description}</div>}
                        </div>
                        <div className="mt-4">
                            <label>Select Image</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-white p-2 border rounded " style={{ backgroundColor: '#171716' }} />
                        </div>
                        <button type="submit" disabled={formik.isSubmitting} className="mt-4 bg-[#D5BDAF] text-white p-3 rounded w-full hover:bg-[#171716] transition-all duration-300">
                            {formik.isSubmitting ? 'Submitting...' : 'Update Product'}
                        </button>
                    </form>
                </div>
            )}

            {/* Product List Table */}
            <div className="bg-[#D5BDAF] p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl text-center font-bold mb-6" style={{ color: '#3E2A47' }}>Product List</h2>
                {loadingProducts ? (
                    <p>Loading products...</p>
                ) : fetchError ? (
                    <p className="text-red-500">{fetchError}</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[#E3D5CA]">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Category</th>
                                <th className="border p-2">Stock</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Actions</th>
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
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handleEditClick(product)}
                                            className="bg-[#171716] text-white p-2 rounded hover:bg-[#D5BDAF] transition-all duration-300"
                                        >
                                            <FaEdit /> {/* Edit icon */}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(product.id)}
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition-all duration-300 ml-2"
                                        >
                                            <FaTrashAlt /> {/* Delete icon */}
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-gray-500 p-4">No products available.</td>
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
