import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../../contexts/authContext';
import { FaTimes } from 'react-icons/fa';

export default function UpdateDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuthContext();
    
    // Add states for edit modal
    const [editingProduct, setEditingProduct] = useState(null);
    const [newPrice, setNewPrice] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data.products);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [token]);

    // Add update price function
    const handleUpdatePrice = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        setUpdateError('');
    
        try {
            const response = await axios.patch(
                `http://localhost:3000/api/v1/products/${editingProduct._id}`,
                { price: parseFloat(newPrice) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(editingProduct)
            console.log("Response received:", response.data);
    
            // Check if the response contains the product
            if (response.data.product) {
                // Update the products state with the new price
                setProducts(products.map(product => 
                    product._id === editingProduct._id 
                        ? { ...product, price: parseFloat(newPrice) }
                        : product
                ));
    
                // Close the modal and reset states
                setEditingProduct(null);
                setNewPrice('');
            } else {
                setUpdateError('Failed to update product: No product returned from server.');
            }
    
            setUpdateLoading(false);
        } catch (err) {
            console.error("Error updating price:", err);
            const message = err?.response?.data?.message || err.message || 'Failed to update price';
            setUpdateError(message);
            setUpdateLoading(false);
        }
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-extrabold text-gray-900 mt-3 mb-4 text-center font-serif 
                    bg-gradient-to-r from-green-600 to-green-500 text-transparent bg-clip-text">
                    Manage Your Products
                </h2>
                <p className="text-center text-gray-600 mb-12 text-lg font-light">
                    Update prices and manage your product listings
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-b from-green-500 to-green-600 rounded-2xl overflow-hidden 
                                shadow-lg transform hover:-translate-y-2 transition-all duration-500 
                                cursor-pointer border border-green-400/50 hover:border-green-300 group
                                hover:shadow-[0_20px_50px_-12px_rgba(22,163,74,0.3)]
                                relative before:absolute before:inset-0 before:bg-white/5 before:rounded-2xl
                                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-700/20 z-0"/>
                                <img
                                    src={`http://localhost:3000/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-56 object-cover transform group-hover:scale-110 
                                        transition-transform duration-700 relative z-10"
                                />
                                {product.organic && (
                                    <div className="absolute top-4 right-4 bg-white/90 text-green-600 px-3 py-1 
                                        rounded-full text-sm font-medium backdrop-blur-sm z-20">
                                        Organic
                                    </div>
                                )}
                            </div>

                            <div className="p-6 space-y-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-green-500/50 to-green-600/50 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-white group-hover:text-green-50 
                                            transition-colors duration-300 font-sans tracking-tight">
                                            {product.name}
                                        </h3>
                                        <div className="flex flex-col items-end">
                                            <span className="text-2xl font-bold text-white font-sans">₹{product.price}</span>
                                            <span className="text-sm text-green-100/80">per kg</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-green-400/30">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-white/90 text-sm">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>Harvested: {new Date(product.harvest_date).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button 
                                            onClick={() => {
                                                setEditingProduct(product);
                                                setNewPrice(product.price.toString());
                                            }}
                                            className="w-full mt-4 py-2.5 bg-white/90 text-green-700 rounded-xl font-medium 
                                                hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2
                                                backdrop-blur-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Update Price
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Edit Price Modal */}
                <AnimatePresence>
                    {editingProduct && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                            onClick={() => setEditingProduct(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                onClick={e => e.stopPropagation()}
                                className="bg-white rounded-xl p-6 w-full max-w-md"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Update Price</h3>
                                    <button
                                        onClick={() => setEditingProduct(null)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>

                                <form onSubmit={handleUpdatePrice} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editingProduct.name}
                                            disabled
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Price (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={newPrice}
                                            onChange={(e) => setNewPrice(e.target.value)}
                                            min="0"
                                            step="0.01"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                                                     focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>

                                    {updateError && (
                                        <p className="text-red-500 text-sm">{updateError}</p>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setEditingProduct(null)}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg 
                                                     hover:bg-gray-50 transition-colors duration-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updateLoading}
                                            className={`flex-1 px-4 py-2 bg-green-600 text-white rounded-lg 
                                                      hover:bg-green-700 transition-colors duration-300
                                                      ${updateLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                        >
                                            {updateLoading ? 'Updating...' : 'Update Price'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Add New Product Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg 
                             hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Product
                </motion.button>
            </div>
        </div>
    );
}
