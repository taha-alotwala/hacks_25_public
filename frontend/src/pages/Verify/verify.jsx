import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClipboardCheck, FaStar } from 'react-icons/fa';

const VerifyForm = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        vendorId: '',
        rating: 5,
        comment: '',
        verificationDate: '',
        vendorLocation: '',
        stockAvailability: '',
        attachment: null,
        isPriority: false,
        contactPerson: ''
    });

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/review/vendors');
                console.log('Vendors:', response.data);
                
                setVendors(Array.isArray(response.data.vendors) ? response.data.vendors : []);
                setError(null);
            } catch (error) {
                console.error('Error fetching vendors:', error);
                setError('Failed to load vendors');
                setVendors([]);
            } finally {
                setLoading(false);
            }
        };
        fetchVendors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/v1/review', formData);
            alert('Review submitted successfully!');
            setFormData({
                vendorId: '',
                rating: 5,
                comment: '',
                verificationDate: '',
                vendorLocation: '',
                stockAvailability: '',
                attachment: null,
                isPriority: false,
                contactPerson: ''
            });
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const formVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.2 } }
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
                    <p className="text-gray-600 mt-4">Loading vendors...</p>
                </div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-br from-green-200 via-white to-green-200 flex items-center justify-center"
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-lg text-red-500 bg-red-50 px-6 py-4 rounded-xl shadow-md"
                >
                    {error}
                </motion.div>
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
                                <FaClipboardCheck className="mx-auto text-green-500 text-4xl mb-2" />
                            </motion.div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-2">Daily Vendor Verification</h2>
                            <p className="text-gray-600">Help us maintain quality by verifying vendor stock and service</p>
                        </motion.div>

                        {/* Vendor Selection */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3"
                        >
                            <label className="block text-gray-700 font-semibold text-lg">Select Vendor</label>
                            <select
                                value={formData.vendorId}
                                onChange={(e) => setFormData({...formData, vendorId: e.target.value})}
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

                        {/* Rating */}
                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-3"
                        >
                            <label className="block text-gray-700 font-semibold text-lg">Rating</label>
                            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                                {[1, 2, 3, 4, 5].map(num => (
                                    <motion.button
                                        key={num}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={() => setFormData({...formData, rating: num})}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                                            formData.rating >= num 
                                                ? 'bg-green-500 text-white shadow-lg' 
                                                : 'bg-white border-2 border-gray-200 hover:border-green-300'
                                        }`}
                                    >
                                        <FaStar className={`text-lg ${formData.rating >= num ? 'text-white' : 'text-gray-400'}`} />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Comment */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-3"
                        >
                            <label className="block text-gray-700 font-semibold text-lg">Stock Verification Comments</label>
                            <textarea
                                value={formData.comment}
                                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl h-40 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 resize-none"
                                placeholder="Please provide detailed comments about the vendor's stock availability, quality, and overall service..."
                                required
                            />
                        </motion.div>

                        {/* Verification Date */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="space-y-3"
                        >
                            <label className="block text-gray-700 font-semibold text-lg">Verification Date</label>
                            <input
                                type="date"
                                value={formData.verificationDate}
                                onChange={(e) => setFormData({...formData, verificationDate: e.target.value})}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 text-lg"
                                required
                            />
                        </motion.div>

                        {/* Vendor Location */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="space-y-3"
                        >
                            <label className="block text-gray-700 font-semibold text-lg">Vendor Location</label>
                            <input
                                type="text"
                                value={formData.vendorLocation}
                                onChange={(e) => setFormData({...formData, vendorLocation: e.target.value})}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 text-lg"
                                placeholder="Vendor's location (e.g., City, Region)"
                                required
                            />
                        </motion.div>

                        {/* Stock Availability */}
                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="space-y-3"
                        >
                            <label className="block text-gray-700 font-semibold text-lg">Stock Availability</label>
                            <div className="flex gap-4">
                                {['Available', 'Partially Available', 'Unavailable'].map(status => (
                                    <motion.button
                                        key={status}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setFormData({...formData, stockAvailability: status})}
                                        className={`w-1/3 py-2 rounded-xl text-center ${formData.stockAvailability === status ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-200'}`}
                                    >
                                        {status}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Attachment */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="space-y-3"
                        >
                            <label className="block text-gray-700 font-semibold text-lg">Upload Verification Proof</label>
                            <input
                                type="file"
                                onChange={(e) => setFormData({...formData, attachment: e.target.files[0]})}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 text-lg"
                            />
                        </motion.div>

                        {/* Priority Flag */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1 }}
                            className="space-y-3"
                        >
                            <label className="flex items-center gap-2 text-gray-700 font-semibold text-lg">
                                <input
                                    type="checkbox"
                                    checked={formData.isPriority}
                                    onChange={() => setFormData({...formData, isPriority: !formData.isPriority})}
                                    className="h-5 w-5 text-green-500 border-2 border-gray-200 rounded"
                                />
                                Mark as Priority
                            </label>
                        </motion.div>

                        {/* Contact Person */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="space-y-3"
                        >
                            <label className="block text-gray-700 font-semibold text-lg">Contact Person</label>
                            <input
                                type="text"
                                value={formData.contactPerson}
                                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 text-lg"
                                placeholder="Name of the contact person"
                            />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Submit Verification
                        </motion.button>
                    </motion.form>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VerifyForm;
