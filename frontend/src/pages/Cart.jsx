import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cart() {
    const formRef = useRef(null);
    const summaryRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial animation timeline
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            // Animate the header section
            tl.from("h1", {
                y: -30,
                opacity: 0,
                duration: 0.8
            })
            .from("p.text-center", {
                y: -20,
                opacity: 0,
                duration: 0.6
            }, "-=0.4")
            
            // Animate the form card
            .from(formRef.current, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                clearProps: "all"
            }, "-=0.4")

            // Animate form elements
            .from(".form-element", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                clearProps: "all"
            }, "-=0.4")

            // Animate summary card
            .from(summaryRef.current, {
                x: 50,
                opacity: 0,
                duration: 0.8,
                clearProps: "all"
            }, "-=1.2")

            // Animate summary items
            .from(".summary-item", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                clearProps: "all"
            }, "-=0.4");

            // Add hover animation for the place order button
            const placeOrderButton = formRef.current.querySelector('.place-order-button');
            placeOrderButton.addEventListener('mouseenter', () => {
                gsap.to(placeOrderButton, {
                    scale: 1.02,
                    duration: 0.2
                });
            });

            placeOrderButton.addEventListener('mouseleave', () => {
                gsap.to(placeOrderButton, {
                    scale: 1,
                    duration: 0.2
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Shopping Cart
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Complete your purchase and get fresh vegetables delivered
                </p>

                <div className="grid grid-cols-12 gap-8">
                    {/* Left Section - Form */}
                    <div className="col-span-7">
                        <div ref={formRef} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-[0_0_15px_rgba(0,128,0,0.1)] hover:shadow-[0_0_20px_rgba(0,128,0,0.15)] transition-all duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                Delivery Details
                            </h2>

                            <form className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input 
                                            type="text" 
                                            placeholder="First Name" 
                                            className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Last Name" 
                                            className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Street Address" 
                                        className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                    />
                                    <div className="grid grid-cols-3 gap-4">
                                        <input 
                                            type="text" 
                                            placeholder="City" 
                                            className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="State" 
                                            className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="ZIP Code" 
                                            className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm flex items-center justify-center">2</span>
                                        Payment Details
                                    </h3>
                                    <input 
                                        type="text" 
                                        placeholder="Card Number" 
                                        className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                    />
                                    <div className="grid grid-cols-3 gap-4">
                                        <input 
                                            type="text" 
                                            placeholder="MM/YY" 
                                            className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="CVV" 
                                            className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="place-order-button w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span>Place Order</span>
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Section - Cart Summary */}
                    <div ref={summaryRef} className="col-span-5 space-y-6">
                        {/* Cart Items */}
                        <div className="summary-item bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-[0_0_15px_rgba(0,128,0,0.1)] hover:shadow-[0_0_20px_rgba(0,128,0,0.15)] transition-all duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-green-50/50 rounded-xl hover:bg-green-50 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-green-100 rounded-lg overflow-hidden">
                                            <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200"></div>
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
                                        <div className="ml-auto text-right">
                                            <p className="font-medium text-gray-800">$4.99</p>
                                            <button className="text-sm text-red-500 hover:text-red-600">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bill Summary */}
                        <div className="summary-item bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-[0_0_15px_rgba(0,128,0,0.1)] hover:shadow-[0_0_20px_rgba(0,128,0,0.15)] transition-all duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Bill Summary</h2>
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
                                <div className="flex justify-between font-semibold text-lg">
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
