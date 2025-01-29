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
                console.log(vendorName);
                console.log(vendorRating);
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Vendor Profile Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_0_50px_rgba(0,128,0,0.1)] border border-green-100 p-8 mb-8">
                    <div className="flex gap-8">
                        {/* Left Side - Profile Picture & Rating */}
                        <div className="flex-shrink-0 space-y-4">
                            <div className="w-32 h-32 rounded-2xl bg-green-100 flex items-center justify-center overflow-hidden">
                                <span className="text-5xl font-bold text-green-600">
                                    {vendor?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="bg-white rounded-xl p-3 shadow-sm space-y-2">
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1 text-lg font-semibold text-gray-700">
                                        {vendorRating}
                                    </span>
                                </div>
    
                            </div>
                        </div>

                        {/* Right Side - Vendor Details */}
                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{vendorName}</h1>
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{vendorLocation}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {vendor?.badges?.map((badge, index) => (
                                        <span 
                                            key={index}
                                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-green-50/50 rounded-xl p-4">
                                    <p className="text-sm text-gray-600">Products</p>
                                    <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                                </div>
                                <div className="bg-green-50/50 rounded-xl p-4">
                                    <p className="text-sm text-gray-600">Orders Completed</p>
                                    <p className="text-2xl font-bold text-gray-800">{vendor?.completedOrders || 0}</p>
                                </div>
                                <div className="bg-green-50/50 rounded-xl p-4">
                                    <p className="text-sm text-gray-600">Total Sales</p>
                                    <p className="text-2xl font-bold text-gray-800">{vendor?.totalSales || 0}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                                <p className="text-gray-600">{vendor?.description || 'No description available.'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Products by {vendor?.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,128,0,0.1)] 
                                border border-green-100 hover:shadow-[0_0_25px_rgba(0,128,0,0.2)] transition-all duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={`http://localhost:3000/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                {product.organic && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                                        Organic
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Harvest Date: {new Date(product.harvest_date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;
