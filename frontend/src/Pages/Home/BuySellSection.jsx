import React from 'react';
import {Link} from 'react-router-dom';
const supplyChain = [
    { id: 1, title: "Retailer", side: "buy" },
    { id: 2, title: "Distributor", side: "buy" },
    { id: 3, title: "Food Processing", side: "buy" },
    { id: 4, title: "Quality Check", side: "sell" },
    { id: 5, title: "Farmer", side: "sell" },
    { id: 6, title: "Production", side: "sell" },
];

const BuySellSection = () => {
    return (
        <div className="flex h-screen mt-10 px-8 gap-8">
            {/* Buy Section */}
            <div className="flex-1 bg-white p-12 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center relative rounded-2xl
                border-4 border-green-500 before:absolute before:inset-0">
                <svg className="w-24 h-24 text-green-500 mb-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">I want to buy</h1>
                <p className="text-gray-600 text-xl text-center max-w-md mb-8">
                    Quick order and delivery. Pay securely.
                </p>
                <Link to='/login' className=" text-center w-64 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    Start Shopping
                </Link>

                {/* Supply Chain - Buy Side */}
                <div className="flex flex-row justify-center gap-10 mt-16 relative w-full">
                    <div className="absolute top-4 left-1/4 right-1/4 w-full h-1 bg-green-600"></div>
                    {supplyChain.filter(item => item.side === "buy").map((item, index) => (
                        <div key={item.id} className="flex flex-col items-center mb-6 relative">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold z-10">
                                {item.id}
                            </div>
                            <div className="text-center mt-2">
                                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sell Section */}
            <div className="flex-1 bg-gradient-to-r from-green-500 to-green-600 p-12 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center relative rounded-2xl
                border-4 border-white ">
                <svg className="w-24 h-24 text-white mb-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 1 1-10 10A10.011 10.011 0 0 1 12 2m0 18a8 8 0 1 0-8-8 8.008 8.008 0 0 0 8 8m-1-11h2v5h-2zm0 6h2v2h-2z" />
                </svg>
                <h1 className="text-4xl font-bold text-white mb-4">I want to sell</h1>
                <p className="text-green-50 text-xl text-center max-w-md mb-8">
                    Easy to schedule and sell. Receive direct payments.
                </p>
                <Link to='/signup' className="w-64 bg-white text-green-600 text-center font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1">
                    Start Selling
                </Link>

                {/* Supply Chain - Sell Side */}
                <div className="flex flex-row justify-center gap-10 mt-16 relative w-full">
                    <div className="absolute top-4 right-1/4 h-1 w-full bg-green-600"></div>
                    {supplyChain.filter(item => item.side === "sell").map((item, index) => (
                        <div key={item.id} className="flex flex-col items-center mb-6 relative">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 font-bold z-10">
                                {item.id}
                            </div>
                            <div className="text-center mt-2">
                                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BuySellSection; 