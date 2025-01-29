import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../contexts/authContext';

const Subscribe = () => {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuthContext();
    
    const [subscription, setSubscription] = useState({
        products: {},
        isWeekly: false
    });

    // Fetch vendors
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/review/vendors');
                setVendors(response.data.vendors || []);
            } catch (error) {
                setError('Failed to load vendors');
            }
        };
        fetchVendors();
    }, []);

    // Fetch vendor products
    useEffect(() => {
        const fetchProducts = async () => {
            if (!selectedVendor) return;
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/product-listings/${selectedVendor}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setProducts(response.data.products || []);
            } catch (error) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedVendor]);

    const handleQuantityChange = (productId, change) => {
        setSubscription(prev => ({
            ...prev,
            products: {
                ...prev.products,
                [productId]: (prev.products[productId] || 0) + change
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Subscription successful! `);
        // Reset form
        setSubscription({
            products: {},
            isWeekly: false
        });
        setSelectedVendor('');
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-6">
            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_0_15px_rgba(0,128,0,0.1)] border border-green-100 p-8 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Subscribe to Vendor</h2>

                    {/* Vendor Selection */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Select Vendor</label>
                        <select
                            value={selectedVendor}
                            onChange={(e) => setSelectedVendor(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        >
                            <option value="">Choose a vendor...</option>
                            {vendors.map(vendor => (
                                <option key={vendor._id} value={vendor._id}>
                                    {vendor.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Products */}
                    {loading ? (
                        <div>Loading products...</div>
                    ) : (
                        <div className="space-y-4">
                            {products.map(product => (
                                <div key={product._id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                    <div>
                                        <h3 className="font-medium">{product.name}</h3>
                                        <p className="text-sm text-gray-500">₹{product.price}/{product.unit}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(product._id, -1)}
                                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                                            disabled={!subscription.products[product._id]}
                                        >
                                            -
                                        </button>
                                        <span>{subscription.products[product._id] || 0}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(product._id, 1)}
                                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Weekly Subscription Toggle */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="weekly"
                            checked={subscription.isWeekly}
                            onChange={(e) => setSubscription(prev => ({...prev, isWeekly: e.target.checked}))}
                            className="w-4 h-4 text-green-600"
                        />
                        <label htmlFor="weekly" className="text-gray-700">Weekly Subscription</label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Subscribe;