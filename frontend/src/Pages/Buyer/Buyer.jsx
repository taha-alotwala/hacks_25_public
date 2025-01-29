import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Buyer() {
    const heroRef = useRef(null);
    const buyerTypesRef = useRef(null);
    const benefitsRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Section Animation
            gsap.from(heroRef.current.querySelector('h1'), {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            
            gsap.from(heroRef.current.querySelector('p'), {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "power3.out"
            });

            // Optimized Benefits Section Animation
            const benefits = benefitsRef.current.querySelectorAll('.benefit-item');
            
            benefits.forEach((benefit, index) => {
                gsap.from(benefit, {
                    scrollTrigger: {
                        trigger: benefit,
                        start: "top bottom-=100",
                        toggleActions: "play none none reverse"
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: "power2.out"
                });
            });

            // Timeline Animation
            const timelineSteps = timelineRef.current.querySelectorAll('.timeline-step');
            
            // Animate the connecting line
            gsap.from(".timeline-line", {
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top center+=100",
                    toggleActions: "play none none reverse"
                },
                scaleY: 0,
                transformOrigin: "top center",
                duration: 1.5,
                ease: "power2.inOut"
            });

            // Animate each timeline step
            timelineSteps.forEach((step, index) => {
                const isRight = index % 2 === 0;
                const startX = isRight ? 100 : -100;
                
                gsap.from(step, {
                    scrollTrigger: {
                        trigger: step,
                        start: "top center+=100",
                        toggleActions: "play none none reverse"
                    },
                    x: startX,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });

                // Animate the icon with a bounce effect
                gsap.from(step.querySelector('.timeline-icon'), {
                    scrollTrigger: {
                        trigger: step,
                        start: "top center+=100",
                        toggleActions: "play none none reverse"
                    },
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.3,
                    ease: "back.out(1.7)"
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative w-full">
            {/* Hero Section */}
            <div ref={heroRef} className="relative h-[60vh] w-full">
                <img 
                    src="https://go4fresh.com/assets/images/buyer-lead.jpg" 
                    alt="Fresh Produce" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-green-900/70" />
                
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Fresh Produce Sourcing Platform
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 text-center max-w-2xl leading-relaxed">
                            Trusted platform offering higher savings, supply
                            predictability & traceability for all your fresh produce needs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Buyer Categories Section */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-center text-4xl font-serif mt-4 mb-8">
                    We partner with verified farms to offer you the freshest produce as per your schedule.
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Retailers Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300 border border-green-100">
                        <div className="flex flex-col space-y-4">
                            <span className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </span>
                            <h5 className="text-xl font-semibold text-green-800">Retailers</h5>
                            <p className="text-gray-600 leading-relaxed">
                                Daily delivery of quality fresh fruits & vegetables at best prices to Small Enterprises. We go extra mile to offer you the best selection of local & global produce. More happy customer. More income.
                            </p>
                        </div>
                    </div>

                    {/* Food Processing Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300 border border-green-100">
                        <div className="flex flex-col space-y-4">
                            <span className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </span>
                            <h5 className="text-xl font-semibold text-green-800">Food Processing</h5>
                            <p className="text-gray-600 leading-relaxed">
                                We offer right price & price hedging mechanism to suit your unique quality norms & delivery schedule. We arrange pre-season buyer-farmer meetings, dedicate farms to take up crop plan, extend regular guidance, offer you digital visibility of the crop and delivery status.
                            </p>
                        </div>
                    </div>

                    {/* Exporters Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300 border border-green-100">
                        <div className="flex flex-col space-y-4">
                            <span className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            </span>
                            <h5 className="text-xl font-semibold text-green-800">Exporters</h5>
                            <p className="text-gray-600 leading-relaxed">
                                We identify best source to suit your bulk requirement across our registered farms on pan India level. We ensure total process compliance on quality, packing & handling so as to deliver as per the contract.
                            </p>
                        </div>
                    </div>

                    {/* Hotels/Cloud Kitchens Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300 border border-green-100">
                        <div className="flex flex-col space-y-4">
                            <span className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                </svg>
                            </span>
                            <h5 className="text-xl font-semibold text-green-800">Hotels/Cloud Kitchens</h5>
                            <p className="text-gray-600 leading-relaxed">
                                Leave your sourcing worries to us & reap the benefits of our Dynamic Source Optimisation module. We identify best source offering lowest prices in sync with your daily demand. You save money by optimising purchase prices, inventory & overhead cost. We also help you with market price feeds & outlook so as to help you plan your purchases efficiently.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div ref={benefitsRef} className="relative w-full">
                <div className="absolute inset-0">
                    <img 
                        src="https://go4fresh.com/assets/images/buyer-benefits-parallax.jpg" 
                        alt="Benefits Background" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-green-900/70" />
                </div>
                
                <div className="relative z-10 container mx-auto px-4 py-20">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">Benefits for Buyers</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Each benefit item */}
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                ),
                                title: "Ease of ordering",
                                delay: "0"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                ),
                                title: "Product traceability",
                                delay: "100"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                title: "Access to verified sellers",
                                delay: "200"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                                title: "Realtime shipment tracking",
                                delay: "300"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                ),
                                title: "Quality assurance",
                                delay: "400"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                ),
                                title: "Safe & healthy food options",
                                delay: "500"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                title: "Predictable supply",
                                delay: "600"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Organic Vegetables",
                                delay: "700"
                            }
                        ].map((benefit, index) => (
                            <div 
                                key={index}
                                className="benefit-item bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300 transform hover:-translate-y-1"
                                data-aos="fade-up"
                                data-aos-delay={benefit.delay}
                            >
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <span className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-600">
                                        {benefit.icon}
                                    </span>
                                    <p className="text-lg font-semibold text-green-800">
                                        {benefit.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How it Works Section */}
            <section ref={timelineRef} className="py-20 bg-white">
                <h2 className="text-4xl font-bold text-green-800 text-center mb-16">How it Works</h2>
                
                <div className="container mx-auto px-4">
                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-200 -translate-x-1/2 hidden md:block timeline-line" />
                        
                        {/* Journey Steps */}
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                ),
                                text: "For small and medium enterprises in India",
                                align: "left"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                ),
                                text: "Register to share your information",
                                align: "right"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                ),
                                text: "To know you better, schedule site visit for our Associate",
                                align: "left"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                text: "Receive Buyer Registration approval & you're ready to trade",
                                align: "right"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                text: "Place your Order by selecting Products, Quantity, Delivery Slot & Payment terms",
                                align: "left"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                ),
                                text: "Track Order Status, receive goods & confirm",
                                align: "right"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                ),
                                text: "Provide your valuable feedback so we can improve",
                                align: "left"
                            }
                        ].map((step, index) => (
                            <div 
                                key={index}
                                className="timeline-step relative flex justify-center mb-24"
                            >
                                {/* Left Content */}
                                <div className={`w-[40%] ${step.align === 'right' ? 'invisible' : 'pr-8 text-right'}`}>
                                    {step.align === 'left' && (
                                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300 ml-auto">
                                            <p className="text-gray-700 text-lg leading-relaxed max-w-sm">
                                                {step.text}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Center Icon */}
                                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                                    <div className="timeline-icon w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Right Content */}
                                <div className={`w-[40%] ${step.align === 'left' ? 'invisible' : 'pl-8'}`}>
                                    {step.align === 'right' && (
                                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300">
                                            <p className="text-gray-700 text-lg leading-relaxed max-w-sm">
                                                {step.text}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}