import React from 'react';

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
    const radius = 250; // Reduced from 400 to 250
    const totalItems = ecosystemData.items.length;
    
    return (
        <div className="relative min-h-screen bg-gray-50 py-10 -z-10">
            <h2 className="text-4xl font-bold text-center text-green-600 mb-10">
                Freshofy Ecosystem
            </h2>

            <div className="relative max-w-6xl mx-auto h-[700px]"> {/* Reduced height */}
                {/* Circular Items */}
                {ecosystemData.items.map((item, index) => {
                    const angle = ((index * (360 / totalItems)) - 90) * (Math.PI / 180);
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    // Determine position for text alignment
                    const isTop = y < -radius * 0.7;
                    const isBottom = y > radius * 0.7;
                    const isLeft = x < 0;
                    const isRight = x > 0;

                    // Calculate text position and alignment
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
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                            }}
                        >
                            {/* Icon in circle */}
                            <div className="relative">
                                <span className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </span>
                                
                                {/* Text label */}
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

                {/* Connecting Circle */}
                <div className="absolute inset-0 -z-20">
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
            </div>
        </div>
    );
};

export default EcosystemSection; 