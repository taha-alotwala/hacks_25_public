import { useState } from 'react';
import { useAuthContext } from '../../contexts/authContext';
import axios from 'axios';

const CreateProduct = () => {
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        harvest_date: '',
        organic: false,
        image: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : 
                    type === 'file' ? files[0] : 
                    type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const productFormData = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null) {
                    productFormData.append(key, formData[key]);
                }
            });

            const response = await axios.post(
                'http://localhost:3000/api/v1/products',
                productFormData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setSuccess('Product created successfully!');
            setFormData({
                name: '',
                price: '',
                harvest_date: '',
                organic: false,
                image: null
            });
            
            // Reset file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';

        } catch (err) {
            console.error('Error creating product:', err);
            setError(err.response?.data?.msg || 'Failed to create product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_0_50px_rgba(0,128,0,0.1)] border border-green-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Product</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-xl border border-green-100 px-3 py-2
                                    focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                required
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-xl border border-green-100 px-3 py-2
                                    focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20"
                            />
                        </div>

                        {/* Harvest Date */}
                        <div>
                            <label htmlFor="harvest_date" className="block text-sm font-medium text-gray-700">
                                Harvest Date
                            </label>
                            <input
                                type="date"
                                name="harvest_date"
                                id="harvest_date"
                                required
                                value={formData.harvest_date}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-xl border border-green-100 px-3 py-2
                                    focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20"
                            />
                        </div>

                        {/* Organic Checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="organic"
                                id="organic"
                                checked={formData.organic}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500/20 border-green-100 rounded"
                            />
                            <label htmlFor="organic" className="ml-2 block text-sm text-gray-700">
                                Organic Product
                            </label>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Product Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-green-50 file:text-green-700
                                    hover:file:bg-green-100"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm 
                                text-sm font-medium text-white bg-green-600 hover:bg-green-700 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                                transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Creating...' : 'Create Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
