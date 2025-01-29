import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerifyForm = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        vendorId: '',
        rating: 5,
        comment: ''
    });

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/review/vendors');
                console.log('Vendors:', response.data);
                
                // Ensure vendors is an array
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
            setFormData({ vendorId: '', rating: 5, comment: '' });
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-lg">Loading vendors...</div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-lg text-red-500">{error}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-6">
            <div className="max-w-2xl mx-auto">
                <form 
                    onSubmit={handleSubmit}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_0_15px_rgba(0,128,0,0.1)] border border-green-100 p-8 space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Daily Vendor Verification</h2>

                    {/* Vendor Selection */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Select Vendor</label>
                        <select
                            value={formData.vendorId}
                            onChange={(e) => setFormData({...formData, vendorId: e.target.value})}
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

                    {/* Rating */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Rating</label>
                        <div className="flex items-center gap-4">
                            {[1,2,3,4,5].map(num => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => setFormData({...formData, rating: num})}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        formData.rating >= num ? 'bg-green-500 text-white' : 'bg-gray-100'
                                    }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Stock Verification Comments</label>
                        <textarea
                            value={formData.comment}
                            onChange={(e) => setFormData({...formData, comment: e.target.value})}
                            className="w-full p-3 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your comments about the vendor's stock..."
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyForm;