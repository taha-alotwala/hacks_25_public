import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../contexts/authContext';
const ProductList = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { token } = useAuthContext()

    const handleVendorClick = (e, vendorId) => {
        e.stopPropagation(); // Prevent modal from closing
        navigate(`/vendor/${vendorId}`);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/product-listings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data.products);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.vendor._id}
                            onClick={() => setSelectedProduct(product)}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,128,0,0.1)] 
                                border border-green-100 hover:shadow-[0_0_25px_rgba(0,128,0,0.2)] transition-all duration-300 cursor-pointer group"
                        >
                            <div className="relative">
                                <img
                                    src={`http://localhost:3000/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {product.organic && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>

                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                                </div>
                                <p className="text-sm text-gray-600">by {product.vendor.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedProduct(null)}
                >
                    <div
                        className="bg-white/90 backdrop-blur-sm rounded-3xl w-[90%] max-w-md overflow-hidden shadow-[0_0_50px_rgba(0,128,0,0.1)] border border-green-100"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="relative">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-48 object-cover"
                            />
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center 
                                    text-gray-600 hover:text-gray-900 transition-colors duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            {selectedProduct.organic && (
                                <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                                    Organic
                                </div>
                            )}
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedProduct.name}</h3>
                                    <p className="text-2xl font-bold text-green-600">₹{selectedProduct.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-600 mb-1">Harvest Date</p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {new Date(selectedProduct.harvest_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Vendor Details Section - Updated Design */}
                            <div className="border-t border-green-100 pt-4">
                                <h4 className="text-sm font-semibold text-gray-800 mb-3">Vendor Details</h4>
                                <div
                                    className="p-3 rounded-xl bg-green-50/50 hover:bg-green-50 transition-colors duration-300 cursor-pointer"
                                    onClick={(e) => handleVendorClick(e, selectedProduct.vendor._id)}
                                >
                                    <div className="flex gap-4">
                                        {/* Vendor Profile Picture */}
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center overflow-hidden">
                                                {selectedProduct.vendor.profilePic ? (
                                                    <img 
                                                        src={`http://localhost:3000/${selectedProduct.vendor.profilePic}`}
                                                        alt={selectedProduct.vendor.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-2xl font-bold text-green-600">
                                                        {selectedProduct.vendor.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            {/* Rating Badge */}
                                            <div className="mt-2 flex items-center justify-center bg-white rounded-lg py-1 px-2 shadow-sm">
                                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="ml-1 text-sm font-medium text-gray-700">
                                                    {selectedProduct.vendor.rating?.toFixed(1) || 'New'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Vendor Details */}
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-800">
                                                    {selectedProduct.vendor.name}
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>{selectedProduct.vendor.location}</span>
                                                </div>
                    
                                            </div>

                                            <div className="flex items-center text-green-600 mt-2">
                                                <span className="text-xs">View full profile</span>
                                                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-2.5 bg-green-600 text-white rounded-xl font-medium text-sm
                                hover:bg-green-700 transition-colors duration-300 hover:shadow-lg hover:shadow-green-600/20">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;