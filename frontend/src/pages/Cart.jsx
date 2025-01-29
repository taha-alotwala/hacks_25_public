export default function Cart() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-100 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
                    Shopping Cart
                    <div className="h-1 w-24 bg-gradient-to-r from-green-300 to-green-500 mx-auto mt-2 rounded-full"></div>
                </h1>

                <div className="grid grid-cols-12 gap-8">
                    {/* Left Section - Form */}
                    <div className="col-span-7">
                        <div className="bg-gradient-to-br from-green-200 to-green-500 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Delivery Details
                            </h2>

                            <form className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
                                        <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 text-sm flex items-center justify-center">1</span>
                                        Address Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="First Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300" />
                                        <input type="text" placeholder="Last Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300" />
                                    </div>
                                    <input type="text" placeholder="Street Address" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300" />
                                    <div className="grid grid-cols-3 gap-4">
                                        <input type="text" placeholder="City" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300" />
                                        <input type="text" placeholder="State" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300" />
                                        <input type="text" placeholder="ZIP Code" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
                                        <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 text-sm flex items-center justify-center">2</span>
                                        Payment Details
                                    </h3>
                                    <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300" />
                                    <div className="grid grid-cols-3 gap-4">
                                        <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300" />
                                        <input type="text" placeholder="CVV" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300" />
                                    </div>
                                </div>

                                <button className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                                    Place Order
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Section - Cart Summary */}
                    <div className="col-span-5 space-y-6">
                        {/* Cart Items */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Order Summary
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                                            <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 animate-pulse"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Vegetable Name</h3>
                                            <p className="text-sm text-gray-500">Quantity: 1kg</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <button className="text-green-600 hover:text-green-700">-</button>
                                                <span className="text-sm font-medium">1</span>
                                                <button className="text-green-600 hover:text-green-700">+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-800">$4.99</p>
                                        <button className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bill Summary */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bill Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>$14.97</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>$2.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>$1.02</span>
                                </div>
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-3"></div>
                                <div className="flex justify-between font-semibold text-lg text-gray-800">
                                    <span>Total</span>
                                    <span className="text-green-600">$17.99</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
