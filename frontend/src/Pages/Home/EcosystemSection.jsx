import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ecosystemData = {
    items: [
        { id: 1, title: "Insource Services", icon: "🏢" },
        { id: 2, title: "Certifying Agencies", icon: "✓" },
        { id: 3, title: "Trade & Industry Consortiums", icon: "🤝" },
        { id: 4, title: "Food & Agri Research", icon: "🔬" },
        { id: 5, title: "NGO's/Capacity Building", icon: "🏛️" },
        { id: 6, title: "Banks/NBFC's", icon: "🏦" },
        { id: 7, title: "Farm Input Companies", icon: "🌱" },
        { id: 8, title: "Equipment Manufacturers", icon: "⚙️" },
        { id: 9, title: "Technology Services", icon: "💻" },
        { id: 10, title: "Cold Chain Solutions", icon: "❄️" },
        { id: 11, title: "Packaging & Handling", icon: "📦" },
        { id: 12, title: "Social Impact Organization", icon: "🌍" },
    ]
};

const EcosystemSection = () => {
    const radius = 250;
    const totalItems = ecosystemData.items.length;
    const sectionRef = useRef(null);
    const circleRef = useRef(null);
    const titleRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        // Initial setup - hide elements
        gsap.set(itemsRef.current, { scale: 0, opacity: 0 });
        gsap.set(circleRef.current, { scale: 0.5, opacity: 0 });
        gsap.set(titleRef.current, { y: 50, opacity: 0 });

        // Create timeline for entry animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                end: "center center",
                toggleActions: "play none none reverse"
            }
        });

        // Add animations to timeline
        tl.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
        })
        .to(circleRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.8)"
        })
        .to(itemsRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: {
                each: 0.1,
                from: "random"
            },
            ease: "back.out(2)"
        });

        // Cleanup
        return () => {
            tl.kill();
        };
    }, []);

    // Hover animations
    const handleItemHover = (index, isEnter) => {
        gsap.to(itemsRef.current[index], {
            scale: isEnter ? 1.15 : 1,
            duration: 0.3,
            ease: "power2.out"
        });

        // Animate connected items
        const connectedItems = getConnectedItems(index);
        connectedItems.forEach(connectedIndex => {
            gsap.to(itemsRef.current[connectedIndex], {
                scale: isEnter ? 1.05 : 1,
                opacity: isEnter ? 0.7 : 1,
                duration: 0.3
            });
        });
    };

    // Helper function to get connected items (you can customize this logic)
    const getConnectedItems = (index) => {
        const connected = [];
        const prevIndex = (index - 1 + totalItems) % totalItems;
        const nextIndex = (index + 1) % totalItems;
        connected.push(prevIndex, nextIndex);
        return connected;
    };

    return (
        <div ref={sectionRef} className="relative min-h-screen bg-gray-50 py-10 -z-10 overflow-hidden">
            <h2 ref={titleRef} className="text-4xl font-bold text-center text-green-600 mb-10">
                Freshofy Ecosystem
            </h2>

            <div className="relative max-w-6xl mx-auto h-[700px]">
                <div ref={circleRef} className="absolute inset-0 -z-20">
                    <svg className="w-full h-full" viewBox="0 0 800 800">
                        <circle 
                            cx="400" 
                            cy="400" 
                            r={radius + 40} 
                            fill="none" 
                            stroke="rgba(34, 204, 94, 0.6)" 
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        />
                    </svg>
                </div>

                {ecosystemData.items.map((item, index) => {
                    const angle = ((index * (360 / totalItems)) - 90) * (Math.PI / 180);
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    const isTop = y < -radius * 0.7;
                    const isBottom = y > radius * 0.7;
                    const isLeft = x < 0;
                    const isRight = x > 0;

                    const textStyles = {
                        position: 'absolute',
                        transform: 'none',
                        ...(isTop && {
                            top: '-60px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            textAlign: 'center',
                        }),
                        ...(isBottom && {
                            bottom: '-60px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            textAlign: 'center',
                        }),
                        ...(isLeft && !isTop && !isBottom && {
                            right: '100%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            marginRight: '20px',
                            textAlign: 'right',
                        }),
                        ...(isRight && !isTop && !isBottom && {
                            left: '100%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            marginLeft: '20px',
                            textAlign: 'left',
                        }),
                    };
                    
                    return (
                        <div
                            key={item.id}
                            ref={el => itemsRef.current[index] = el}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                            }}
                            onMouseEnter={() => handleItemHover(index, true)}
                            onMouseLeave={() => handleItemHover(index, false)}
                        >
                            <div className="relative">
                                <span className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center text-2xl 
                                    transition-shadow duration-300 hover:shadow-green-500/50 border border-green-100">
                                    {item.icon}
                                </span>
                                
                                <div
                                    className="w-48 absolute"
                                    style={textStyles}
                                >
                                    <p className="text-gray-700 font-medium">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EcosystemSection; 