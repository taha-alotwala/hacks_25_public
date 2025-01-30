import React from 'react';
import { Link } from 'react-router-dom';
const HeroImage = () => {
    const stats = [
        { number: "10K+", label: "Active Users", delay: "100" },
        { number: "50+", label: "Cities", delay: "200" },
        { number: "100+", label: "Farmers", delay: "300" },
        { number: "24/7", label: "Support", delay: "400" }
    ];

    const flipWords = [
        "Consistency",
        "Transparency",
        "Savings",
        "Growth"
    ];

    return (
        <section className="relative min-h-[800px] bg-cover bg-center bg-fixed overflow-hidden group"
            style={{
                backgroundImage: `url('https://go4fresh.com/assets/images/B2BCustomers.jpg')`
            }}
        >
            {/* Dynamic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent 
                group-hover:from-black/85 group-hover:via-black/65 transition-all duration-700">
                
                {/* Content Container */}
                <div className="container mx-auto px-6 py-20 h-full">
                    <div className="flex flex-col h-full justify-between">
                        {/* Main Text Content with Slide-up Animation */}
                        <div className="max-w-3xl mt-20 animate-slide-up">
                            <div className="overflow-hidden">
                                <h1 className="text-6xl font-bold text-white leading-tight mb-6 animate-reveal">
                                    Empowering SMEs with <br />
                                    <div className="flip-words-container inline-block ml-4">
                                        {flipWords.map((word, index) => (
                                            <div 
                                                key={word}
                                                className="flip-word"
                                                style={{
                                                    '--index': index,
                                                    '--total': flipWords.length
                                                }}
                                            >
                                                <span className="text-green-400">{word}</span>
                                            </div>
                                        ))}
                                    </div>
                                </h1>
                            </div>
                            <p className="text-xl text-gray-300 mb-8 animate-reveal-delay">
                                Join thousands of businesses transforming their supply chain with Freshofy's innovative platform.
                            </p>
                            <button className="relative overflow-hidden bg-green-500 text-white px-8 py-4 rounded-lg 
                                font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 
                                hover:-translate-y-1 group/btn">
                                <Link to='/signup' className="relative z-10">Get Started Today</Link>
                                <div className="absolute inset-0 bg-green-600 transform scale-x-0 group-hover/btn:scale-x-100 
                                    transition-transform duration-300 origin-left"></div>
                            </button>
                        </div>

                        {/* Stats Grid with Fade-in Animation */}
                        <div className="grid grid-cols-4 gap-8 mt-16">
                            {stats.map((stat, index) => (
                                <div 
                                    key={index}
                                    className="relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl p-6 
                                        border border-white/10 hover:bg-white/10 transition-all duration-500
                                        animate-fade-in"
                                    style={{ animationDelay: `${stat.delay}ms` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent 
                                        opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                                    <h3 className="text-4xl font-bold text-green-400 mb-2">
                                        {stat.number}
                                    </h3>
                                    <p className="text-white/80">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl 
                animate-pulse-slow"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-2xl 
                animate-pulse-slow animation-delay-1000"></div>
        </section>
    );
};

export default HeroImage; 