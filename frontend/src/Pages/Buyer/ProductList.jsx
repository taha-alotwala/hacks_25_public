import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../contexts/authContext';
import gsap from 'gsap';

const ProductList = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { token } = useAuthContext()

    const cardsRef = useRef([]);

    const handleVendorClick = (e, vendorId) => {
        e.stopPropagation(); // Prevent modal from closing
        navigate(`/vendor/${vendorId}`);
    };

    useEffect(() => {
        // Animate cards on mount
        gsap.from(cardsRef.current, {
            duration: 0.6,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out"
        });

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/v1/product-listings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.products);
                
                setProducts(response.data.products);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Animation for modal
    const modalAnimation = (show) => {
        const modal = document.querySelector('.modal-content');
        if (show) {
            gsap.fromTo(modal, 
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
            );
        }
    };

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-5xl font-extrabold text-gray-900 mt-3 mb-4 text-center font-serif 
                    bg-gradient-to-r from-green-600 to-green-500  text-transparent bg-clip-text">
                    Fresh From The Farm
                </h2>
                <p className="text-center text-gray-600 mb-12 text-lg font-light">
                    Discover nature's finest, delivered fresh to your doorstep
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {products.map((product, index) => {
                        // console.log(product);
                        console.log(product.vendor.name);
                        return <div
                            ref={el => cardsRef.current[index] = el}
                            key={product._id}
                            onClick={() => {
                                setSelectedProduct(product);
                                modalAnimation(true);
                            }}
                            className="bg-gradient-to-b from-green-500 to-green-600 rounded-2xl overflow-hidden 
                                shadow-lg transform hover:-translate-y-2 transition-all duration-500 
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
                                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full 
                                    group-hover:translate-y-0 transition-transform duration-500 z-30 flex justify-end">
                                   
                                </div>
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
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-white/95 rounded-full flex items-center 
                                                    justify-center ring-2 ring-green-400/30 group-hover:ring-green-300/50
                                                    transition-all duration-300">
                                                    <span className="text-green-600 font-semibold">
                                                        {product.vendor.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-medium text-white group-hover:text-green-50">
                                                    {product.vendor.name}
                                                </span>
                                            </div>
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
                    })}
                </div>
            </div>

            {/* Enhanced Modal */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedProduct(null)}
                >
                    <div
                        className="modal-content bg-white/95 backdrop-blur-md rounded-2xl w-full max-w-lg 
                            overflow-hidden shadow-2xl border border-white/20"
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

                                            {/* <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>{selectedProduct.vendor.location}</span>
                                                </div>
                    
                                            </div> */}

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