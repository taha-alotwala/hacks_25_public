import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';

gsap.registerPlugin(ScrollTrigger);

export default function Seller() {
    const heroRef = useRef(null);
    const sellerTypesRef = useRef(null);
    const benefitsRef = useRef(null);
    const timelineRef = useRef(null);
    const stepsRef = useRef([]);
    const navigate = useNavigate();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Reset refs array
        stepsRef.current = [];

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

            // Seller Types Animation with enhanced effects
            const sellerCards = sellerTypesRef.current.querySelectorAll('.seller-card');
            
            sellerCards.forEach((card, index) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top center+=100",
                        toggleActions: "play none none reverse"
                    }
                });

                // Card entrance animation
                tl.from(card, {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                })
                
                // Icon animation
                .from(card.querySelector('.farmer-icon, .fpc-icon'), {
                    scale: 0,
                    rotation: -180,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, "-=0.4")
                
                // Title animation
                .from(card.querySelector('.seller-title'), {
                    y: 20,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.2")
                
                // Text animation
                .from(card.querySelector('.seller-text'), {
                    y: 20,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.2");

                // Hover animation
                card.addEventListener('mouseenter', () => {
                    gsap.to(card.querySelector('.farmer-icon, .fpc-icon'), {
                        scale: 1.1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card.querySelector('.farmer-icon, .fpc-icon'), {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });

            // Benefits Section Animation
            const benefits = benefitsRef.current.querySelectorAll('.benefit-item');
            gsap.from(benefits, {
                scrollTrigger: {
                    trigger: benefitsRef.current,
                    start: "top center+=100",
                    toggleActions: "play none none reverse"
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)"
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

    // Add ref to step
    const addToRefs = (el) => {
        if (el && !stepsRef.current.includes(el)) {
            stepsRef.current.push(el);
        }
    };

    const handleDashboardClick = (e) => {
        e.preventDefault();
        setIsTransitioning(true);
        
    };

    return (
        <div className="relative w-full">
            {isTransitioning && (
                <PageTransition 
                    onComplete={() => navigate('/vendor-dashboard')} 
                />
            )}
            
            {/* Background Image Wrapper */}
            <div className="relative w-full bg-gradient-to-br from-green-50 via-white to-green-50">
                {/* Hero Section */}
                <div ref={heroRef} className="relative h-[60vh] w-full">
                    <img 
                        src="https://go4fresh.com/assets/images/seller-lead.jpg" 
                        alt="Fresh Produce" 
                        className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-green-900/70">
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col items-center gap-6">
                                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2">
                                    Seller
                                </h1>
                                <Link to='/vendor-dashboard'
                                    onClick={handleDashboardClick}
                                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    View Dashboard
                                </Link>
                                <p className="text-lg md:text-xl text-white/90 text-center max-w-2xl leading-relaxed">
                                    Trusted platform offering higher savings, supply predictability & traceability for all your fresh produce needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seller Types Section */}
                <section ref={sellerTypesRef} className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl text-center text-gray-800 mb-12 leading-relaxed">
                            Maximise your income by accessing widest buyer network in 
                            <br /> secure & transparent way.
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {/* Farmer Card */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-green-800 mb-4">Farmer</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        We help farmers/suppliers in decision making by sharing market information & pricing options. 
                                        Our market tie-ups guarantee the payments, help you expand the reach & earn more.
                                    </p>
                                </div>
                            </div>

                            {/* FPC's Card */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-green-800 mb-4">FPC's / Farmer Groups</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        For better realization, we assist you in product & packaging standardization, 
                                        branding & value addition.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
            {/* Benefits Section with Background Image */}
            <div ref={benefitsRef} className="relative w-full min-h-screen">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src="https://go4fresh.com/assets/images/seller-benefits-parallax.jpg" 
                        alt="Benefits Background" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-green-900/70" /> {/* Overlay */}
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-20">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">
                        Benefits for Seller
                    </h2>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                                text: "Ease of selling"
                            },
                            {
                                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                                text: "Flexible trade terms"
                            },
                            {
                                icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                                text: "Access to market info"
                            },
                            {
                                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                                text: "Wider choice of buyers"
                            },
                            {
                                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                                text: "Secure payment system"
                            },
                            {
                                icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                                text: "Option to sell full harvest"
                            },
                            {
                                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                                text: "Support to enhance quality"
                            },
                            {
                                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                                text: "Transparent price discovery"
                            }
                        ].map((benefit, index) => (
                            <div 
                                key={index}
                                className="benefit-item flex flex-col items-center text-center"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg">
                                    <svg 
                                        className="w-8 h-8 text-white" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d={benefit.icon}
                                        />
                                    </svg>
                                </div>
                                <p className="text-white text-lg font-medium whitespace-pre-line">
                                    {benefit.text}
                                </p>
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                ),
                                text: "For small and medium enterprises in India",
                                align: "right"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                ),
                                text: "Register to share your information",
                                align: "left"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                ),
                                text: "To know you better, schedule site visit for our Associate",
                                align: "right"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                ),
                                text: "Receive Seller Registration approval & you are ready to trade",
                                align: "left"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                ),
                                text: "Update your Sell details by selecting Products, Quantity, Pick-up Slot, Price & Payment terms",
                                align: "right"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                ),
                                text: "Receive approval & schedule the pick-up & handover the produce",
                                align: "left"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                text: "Track your order status, receive payments & provide your valuable feedback so we can improve",
                                align: "right"
                            }
                        ].map((step, index) => (
                            <div 
                                key={index}
                                ref={addToRefs}
                                className={`timeline-step relative flex justify-center mb-24 ${
                                    step.align === 'right' ? 'right-content' : 'left-content'
                                }`}
                            >
                                {/* Left Content */}
                                <div className={`w-[40%] ${step.align === 'right' ? 'invisible' : 'pr-8 text-right'}`}>
                                    {step.align === 'left' && (
                                        <div className="timeline-content bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300 ml-auto">
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
                                        <div className="timeline-content bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_0_30px_rgba(0,128,0,0.1)] hover:shadow-[0_0_40px_rgba(0,128,0,0.15)] transition-all duration-300">
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