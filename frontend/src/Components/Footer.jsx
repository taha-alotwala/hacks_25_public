import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-green-50 via-white to-green-50">
            <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_0_50px_rgba(0,128,0,0.1)] border border-green-100 p-8 lg:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Company Info */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-green-800">Fresh Market</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Connecting farmers to consumers, bringing fresh produce directly to your doorstep.
                            </p>
                            <div className="flex space-x-4">
                                {/* Social Media Icons */}
                                <a href="#" className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-all duration-300 hover:scale-110">
                                    <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-all duration-300 hover:scale-110">
                                    <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-all duration-300 hover:scale-110">
                                    <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-green-800">Quick Links</h3>
                            <ul className="space-y-4">
                                <li>
                                    <a href="#" className="text-base text-gray-600 hover:text-green-700 transition-colors duration-300 hover:translate-x-1 inline-block">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-600 hover:text-green-700 transition-colors duration-300 hover:translate-x-1 inline-block">
                                        Our Products
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-600 hover:text-green-700 transition-colors duration-300 hover:translate-x-1 inline-block">
                                        Pre-booking
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-base text-gray-600 hover:text-green-700 transition-colors duration-300 hover:translate-x-1 inline-block">
                                        Delivery Areas
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-green-800">Contact Us</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4 group">
                                    <svg className="w-6 h-6 text-green-600 mt-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <p className="text-base text-gray-600 leading-relaxed group-hover:text-green-700 transition-colors">
                                        123 Fresh Market Street,<br />
                                        Green Valley, GV 12345
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4 group">
                                    <svg className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    <a href="mailto:info@freshmarket.com" className="text-base text-gray-600 hover:text-green-700 transition-colors duration-300">
                                        info@freshmarket.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-green-800">Stay Updated</h3>
                            <p className="text-base text-gray-600">Subscribe to our newsletter for fresh updates and seasonal offers.</p>
                            <div className="flex flex-col space-y-3">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="w-full px-4 py-3 text-base border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20"
                                />
                                <button className="w-full px-4 py-3 bg-green-600 text-white text-base font-medium rounded-xl hover:bg-green-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20 hover:-translate-y-0.5">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 pt-8 border-t border-green-100">
                        <p className="text-center text-base text-gray-600">
                            © 2024 Fresh Market. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}