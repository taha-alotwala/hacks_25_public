import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../contexts/authContext';

const VendorProfile = () => {
    const { id } = useParams();
    const [vendor, setVendor] = useState({});
    const [products, setProducts] = useState([]);
    const { token } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [vendorName, setVendorName] = useState('');
    const [vendorLocation, setVendorLocation] = useState('');
    const [vendorRating, setVendorRating] = useState(0);

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/product-listings`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setVendorRating(response.data.products[0].vendor.rating);
                setVendorName(response.data.products[0].vendor.name);
                setVendorLocation(response.data.products[0].vendor.location);

                setProducts(response.data.products);
            } catch (err) {
                console.error("Error fetching vendor data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVendorData();
    }, [id, token]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Vendor Profile Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Left Side - Profile Picture */}
                        <div className="flex-shrink-0 w-32 h-32 rounded-full bg-green-100 flex items-center justify-center text-5xl font-bold text-green-600">
                            {vendorName?.charAt(0).toUpperCase()}
                        </div>

                        {/* Right Side - Vendor Details */}
                        <div className="flex-1 space-y-4">
                        <h2 className="text-5xl font-extrabold text-gray-900 mb-2 font-serif 
                    bg-gradient-to-r from-green-600 to-green-500  text-transparent bg-clip-text">
            
              {vendorName}  </h2>
                            
                            {/* Stats Row */}
                            <div className="flex flex-wrap gap-6">
                                {/* Location */}
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-lg">{vendorLocation}</span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1 text-lg font-semibold text-gray-700">{vendorRating}</span>
                                </div>

                                {/* Products Count */}
                                <div className="text-lg font-semibold text-gray-800">
                                    {products.length} Products
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Products by {vendorName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-gradient-to-b from-green-500 to-green-600 rounded-2xl overflow-hidden 
                                shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 
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
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-800/20 
                                    to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"/>
                                {product.organic && (
                                    <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 backdrop-blur text-green-600 
                                        rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg
                                        transform -rotate-2 z-30 hover:rotate-0 transition-all duration-300
                                        border border-green-100">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
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
                                            transition-colors duration-300 font-sans tracking-tight">{product.name}</h3>
                                        <div className="flex flex-col items-end">
                                            <span className="text-2xl font-bold text-white font-sans">₹{product.price}</span>
                                            <span className="text-sm text-green-100/80">per kg</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-green-400/30">
                                        <div className="flex items-center justify-end">
                                            <div className="flex items-center text-white/90 text-sm bg-white/10 
                                                backdrop-blur-sm px-3 py-1 rounded-full border border-white/10
                                                group-hover:bg-white/20 transition-colors duration-300">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{new Date(product.harvest_date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;
