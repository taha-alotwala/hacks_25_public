import React from 'react';

const CoreValues = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-12">
            <div className="container mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_0_50px_rgba(0,128,0,0.1)] overflow-hidden border border-green-100">
                <div className="flex flex-row items-center justify-between p-12 gap-12">
                    {/* Left Section - Image with Overlay Text */}
                    <div className="relative w-1/2 h-[500px] rounded-2xl overflow-hidden">
                        <img 
                            src="https://go4fresh.com/assets/images/integrated.jpg" 
                            alt="" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/20 to-transparent flex items-end p-8">
                            <h1 className="text-3xl font-bold text-white">
                                Integrated Fresh Market Produce
                            </h1>
                        </div>
                    </div>

                    {/* Right Section - Text Content */}
                    <div className="w-1/2 space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                                The Future of Food is Fast,
                                <br />
                                Fresh & Sustainable
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                We are on the cusp of a new agricultural revolution
                                that will reshape the way we farm, ship and
                                consume food.
                            </p>
                        </div>

                        {/* Icon Grid Section */}
                        <div className="bg-gradient-to-br from-green-500/5 to-green-600/10 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold text-green-800 mb-8">Our Core Values</h3>
                            <div className="grid grid-cols-2 gap-6" data-aos="fade-up" data-aos-delay="300">
                                {/* Adopt */}
                                <div className="group p-5 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,128,0,0.1)]">
                                    <div className="flex flex-col gap-4">
                                        <span className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </span>
                                        <div className="space-y-2">
                                            <h5 className="text-lg font-bold text-green-800 group-hover:text-green-700 transition-colors">Adopt</h5>
                                            <p className="text-sm text-green-700/70 font-medium group-hover:text-green-700/90">
                                                Smart tech solutions to optimize cost, achieve scale & continuously improve efficiency.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Deliver */}
                                <div className="group p-5 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,128,0,0.1)]">
                                    <div className="flex flex-col gap-4">
                                        <span className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </span>
                                        <div className="space-y-2">
                                            <h5 className="text-lg font-bold text-green-800 group-hover:text-green-700 transition-colors">Deliver</h5>
                                            <p className="text-sm text-green-700/70 font-medium group-hover:text-green-700/90">
                                                Freshest fruits & veggies to retailers & bulk buyers.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Promote */}
                                <div className="group p-5 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,128,0,0.1)]">
                                    <div className="flex flex-col gap-4">
                                        <span className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </span>
                                        <div className="space-y-2">
                                            <h5 className="text-lg font-bold text-green-800 group-hover:text-green-700 transition-colors">Promote</h5>
                                            <p className="text-sm text-green-700/70 font-medium group-hover:text-green-700/90">
                                                Promote sustainable farming, safe food & local community.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Strengthen */}
                                <div className="group p-5 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,128,0,0.1)]">
                                    <div className="flex flex-col gap-4">
                                        <span className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                            </svg>
                                        </span>
                                        <div className="space-y-2">
                                            <h5 className="text-lg font-bold text-green-800 group-hover:text-green-700 transition-colors">Strengthen</h5>
                                            <p className="text-sm text-green-700/70 font-medium group-hover:text-green-700/90">
                                                Small enterprises & farmers to earn more & thrive.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    );
}

export default CoreValues; 