import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaShoppingBasket } from 'react-icons/fa';
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
        isWeekly: false,
        deliveryAddress: '',
        preferredDeliveryTime: '',
        alternatePhoneNumber: '',
        specialInstructions: '',
        startDate: '',
        subscriptionDuration: '1',
        paymentMethod: '',
        notificationPreference: 'email'
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const formVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                duration: 0.6,
                delay: 0.2
            }
        }
    };

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
            isWeekly: false,
            deliveryAddress: '',
            preferredDeliveryTime: '',
            alternatePhoneNumber: '',
            specialInstructions: '',
            startDate: '',
            subscriptionDuration: '1',
            paymentMethod: '',
            notificationPreference: 'email'
        });
        setSelectedVendor('');
    };

    if (loading) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-br from-green-200 via-white to-green-200 flex items-center justify-center"
            >
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading fresh products...</p>
                </div>
            </motion.div>
        );
    }

    return (
        <AnimatePresence>
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen bg-gradient-to-br from-green-200 via-white to-green-200 p-6"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.form 
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        onSubmit={handleSubmit}
                        className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-green-200 p-8 space-y-8"
                    >
                        <motion.div 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-center space-y-2"
                        >
                            <motion.div
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.3 }}
                                className="inline-block"
                            >
                                <FaLeaf className="mx-auto text-green-500 text-4xl mb-2" />
                            </motion.div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-2">Subscribe to Fresh Products</h2>
                            <p className="text-gray-600">Get fresh, locally sourced products delivered to your doorstep</p>
                        </motion.div>

                        {/* Vendor Selection */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3"
                        >
                            <label className="block text-gray-700 font-semibold text-lg">Select Your Vendor</label>
                            <select
                                value={selectedVendor}
                                onChange={(e) => setSelectedVendor(e.target.value)}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 text-lg"
                                required
                            >
                                <option value="">Choose a vendor...</option>
                                {vendors.map(vendor => (
                                    <option key={vendor._id} value={vendor._id}>
                                        {vendor.name}
                                    </option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Products */}
                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <FaShoppingBasket className="text-green-500 text-xl" />
                                <h3 className="text-lg font-semibold text-gray-700">Select Products</h3>
                            </div>
                            {products.map((product, index) => (
                                <motion.div 
                                    key={product._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 * index }}
                                    className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-2xl hover:border-green-200 hover:shadow-lg transition-all duration-300 bg-white group"
                                >
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-600 transition-colors">{product.name}</h3>
                                        <p className="text-gray-500">₹{product.price}/{product.unit}</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            onClick={() => handleQuantityChange(product._id, -1)}
                                            className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-200"
                                            disabled={!subscription.products[product._id]}
                                        >
                                            -
                                        </motion.button>
                                        <span className="w-12 text-center font-semibold text-lg">
                                            {subscription.products[product._id] || 0}
                                        </span>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            onClick={() => handleQuantityChange(product._id, 1)}
                                            className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-200"
                                        >
                                            +
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Weekly Subscription Toggle */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-white p-6 rounded-2xl border-2 border-green-100 hover:border-green-200 transition-all duration-200"
                        >
                            <input
                                type="checkbox"
                                id="weekly"
                                checked={subscription.isWeekly}
                                onChange={(e) => setSubscription(prev => ({...prev, isWeekly: e.target.checked}))}
                                className="w-6 h-6 text-green-600 rounded-lg border-gray-300 focus:ring-green-500 cursor-pointer"
                            />
                            <div>
                                <label htmlFor="weekly" className="text-gray-800 font-semibold text-lg cursor-pointer">Weekly Subscription</label>
                                <p className="text-sm text-gray-600">Get your favorite products delivered every week</p>
                            </div>
                        </motion.div>

                        {/* Delivery Details */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-semibold text-gray-700">Delivery Details</h3>
                            
                            {/* Delivery Address */}
                            <div className="space-y-2">
                                <label className="block text-gray-600">Delivery Address</label>
                                <textarea
                                    value={subscription.deliveryAddress}
                                    onChange={(e) => setSubscription(prev => ({...prev, deliveryAddress: e.target.value}))}
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 h-24 resize-none"
                                    placeholder="Enter your complete delivery address"
                                    required
                                />
                            </div>

                            {/* Preferred Delivery Time */}
                            <div className="space-y-2">
                                <label className="block text-gray-600">Preferred Delivery Time</label>
                                <select
                                    value={subscription.preferredDeliveryTime}
                                    onChange={(e) => setSubscription(prev => ({...prev, preferredDeliveryTime: e.target.value}))}
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300"
                                    required
                                >
                                    <option value="">Select time slot...</option>
                                    <option value="morning">Morning (7 AM - 10 AM)</option>
                                    <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
                                    <option value="evening">Evening (4 PM - 7 PM)</option>
                                </select>
                            </div>

                            {/* Alternate Phone Number */}
                            <div className="space-y-2">
                                <label className="block text-gray-600">Alternate Phone Number</label>
                                <input
                                    type="tel"
                                    value={subscription.alternatePhoneNumber}
                                    onChange={(e) => setSubscription(prev => ({...prev, alternatePhoneNumber: e.target.value}))}
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300"
                                    placeholder="Enter alternate contact number"
                                />
                            </div>
                        </motion.div>

                        {/* Subscription Details */}
                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-semibold text-gray-700">Subscription Details</h3>
                            
                            {/* Start Date */}
                            <div className="space-y-2">
                                <label className="block text-gray-600">Start Date</label>
                                <input
                                    type="date"
                                    value={subscription.startDate}
                                    onChange={(e) => setSubscription(prev => ({...prev, startDate: e.target.value}))}
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300"
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            {/* Subscription Duration */}
                            <div className="space-y-2">
                                <label className="block text-gray-600">Subscription Duration</label>
                                <select
                                    value={subscription.subscriptionDuration}
                                    onChange={(e) => setSubscription(prev => ({...prev, subscriptionDuration: e.target.value}))}
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300"
                                    required
                                >
                                    <option value="1">1 Month</option>
                                    <option value="3">3 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="12">12 Months</option>
                                </select>
                            </div>
                        </motion.div>

                        {/* Additional Preferences */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-semibold text-gray-700">Additional Preferences</h3>
                            
                            {/* Special Instructions */}
                            <div className="space-y-2">
                                <label className="block text-gray-600">Special Instructions</label>
                                <textarea
                                    value={subscription.specialInstructions}
                                    onChange={(e) => setSubscription(prev => ({...prev, specialInstructions: e.target.value}))}
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 h-24 resize-none"
                                    placeholder="Any special instructions for delivery or product preferences..."
                                />
                            </div>

                            {/* Notification Preference */}
                            <div className="space-y-2">
                                <label className="block text-gray-600">Notification Preference</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="email"
                                            checked={subscription.notificationPreference === 'email'}
                                            onChange={(e) => setSubscription(prev => ({...prev, notificationPreference: e.target.value}))}
                                            className="text-green-500 focus:ring-green-500"
                                        />
                                        Email
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="sms"
                                            checked={subscription.notificationPreference === 'sms'}
                                            onChange={(e) => setSubscription(prev => ({...prev, notificationPreference: e.target.value}))}
                                            className="text-green-500 focus:ring-green-500"
                                        />
                                        SMS
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="both"
                                            checked={subscription.notificationPreference === 'both'}
                                            onChange={(e) => setSubscription(prev => ({...prev, notificationPreference: e.target.value}))}
                                            className="text-green-500 focus:ring-green-500"
                                        />
                                        Both
                                    </label>
                                </div>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Subscribe Now
                        </motion.button>
                    </motion.form>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Subscribe;