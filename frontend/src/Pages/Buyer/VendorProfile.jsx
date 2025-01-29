import React from 'react';

const VendorProfile = () => {
    // Mock data - replace with actual data from your backend
    const vendor = {
        name: "Green Valley Farms",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop",
        location: "Nashik, Maharashtra",
        rating: 4.8,
        totalReviews: 126,
        description: "Specializing in organic vegetables and fruits, grown with sustainable farming practices.",
        badges: ["Verified", "Organic Certified", "Premium Seller"],
        inventory: [
            { id: 1, name: "Fresh Tomatoes", price: "₹40/kg", stock: "In Stock", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=2070&auto=format&fit=crop" },
            { id: 2, name: "Organic Potatoes", price: "₹30/kg", stock: "Low Stock", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop" },
            { id: 3, name: "Green Peppers", price: "₹60/kg", stock: "In Stock", image: "https://images.unsplash.com/photo-1509377244-b2845657a9fc?q=80&w=1974&auto=format&fit=crop" },
            { id: 4, name: "Fresh Carrots", price: "₹35/kg", stock: "In Stock", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1974&auto=format&fit=crop" },
            { id: 5, name: "Cauliflower", price: "₹45/kg", stock: "Out of Stock", image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?q=80&w=1974&auto=format&fit=crop" },
            { id: 6, name: "Spinach", price: "₹25/bunch", stock: "In Stock", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1972&auto=format&fit=crop" },
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Vendor Profile Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_0_50px_rgba(0,128,0,0.1)] border border-green-100 overflow-hidden">
                    {/* Cover Image */}
                    <div className="h-48 w-full overflow-hidden">
                        <img 
                            src={vendor.image} 
                            alt={vendor.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Profile Content */}
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold text-gray-800">{vendor.name}</h1>
                                <div className="flex items-center space-x-4 text-gray-600">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <span className="ml-2">{vendor.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <span className="ml-2">{vendor.rating} ({vendor.totalReviews} reviews)</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 max-w-2xl">{vendor.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {vendor.badges.map((badge, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Inventory Section */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Products</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {vendor.inventory.map((item) => (
                                    <div 
                                        key={item.id}
                                        className="bg-white rounded-xl border border-green-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                                    >
                                        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                                    <p className="text-green-600 font-medium">{item.price}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    item.stock === "In Stock" ? "bg-green-100 text-green-700" :
                                                    item.stock === "Low Stock" ? "bg-yellow-100 text-yellow-700" :
                                                    "bg-red-100 text-red-700"
                                                }`}>
                                                    {item.stock}
                                                </span>
                                            </div>
                                            <button className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;
