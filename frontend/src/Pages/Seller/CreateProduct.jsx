import { useState } from 'react';
import { useAuthContext } from '../../contexts/authContext';
import axios from 'axios';

const CreateProduct = () => {
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        harvest_date: '',
        organic: false,
        image: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'file' && files[0]) {
            setPreviewImage(URL.createObjectURL(files[0]));
        }
        
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_0_50px_rgba(0,128,0,0.1)] border border-green-100 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Create New Product</h2>
                            <p className="mt-1 text-sm text-gray-500">Add your product details below</p>
                        </div>
                        <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl">
                            <div className="flex">
                                <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-xl">
                            <div className="flex">
                                <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {success}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
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
                                        className="mt-1 block w-full rounded-xl border border-green-100 px-4 py-3
                                            focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20
                                            transition-all duration-300"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Price (₹)
                                    </label>
                                    <div className="mt-1 relative rounded-xl">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500">₹</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            required
                                            min="0"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="block w-full rounded-xl border border-green-100 pl-8 pr-4 py-3
                                                focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20
                                                transition-all duration-300"
                                            placeholder="0.00"
                                        />
                                    </div>
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
                                        className="mt-1 block w-full rounded-xl border border-green-100 px-4 py-3
                                            focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20
                                            transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Image
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-green-500/50 transition-colors duration-300">
                                        <div className="space-y-1 text-center">
                                            {previewImage ? (
                                                <img src={previewImage} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                                            ) : (
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="image"
                                                        name="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleChange}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
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
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl 
                                text-sm font-medium text-white bg-green-600 hover:bg-green-700 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                                transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create Product
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
