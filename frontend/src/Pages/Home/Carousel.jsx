import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState('right');
    const textRef = useRef(null);

    const slides = [
        {
            image: "https://c0.wallpaperflare.com/preview/350/716/16/bunch-of-vegetables.jpg",
            title: "Fresh From Farm",
            description: "Direct farm-to-table produce ensuring maximum freshness",
            position: "left" // text on left side
        },
        {
            image: "https://healthybuddha.in/image/catalog/Healthy%20Buddha%20Mobile%20App(4).png",
            title: "Digital Agriculture",
            description: "Transforming farming with modern technology",
            position: "right" // text on right side
        },
        {
            image: "https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2024/07/AGRICULTURE.jpg",
            title: "Sustainable Farming",
            description: "Supporting local farmers and sustainable practices",
            position: "left"
        },
        {
            image: "https://hips.hearstapps.com/hmg-prod/images/online-fresh-food-delivery-service-royalty-free-image-1602082153.jpg",
            title: "Quick Delivery",
            description: "Fast and reliable delivery to your doorstep",
            position: "right"
        },
        {
            image: "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6",
            title: "Quality Assured",
            description: "Premium quality vegetables and fruits",
            position: "left"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection('right');
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Animate text for current slide
        const textElement = document.querySelector(`.slide-text-${currentSlide}`);
        if (textElement) {
            gsap.fromTo(textElement,
                {
                    y: -100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                }
            );
        }
    }, [currentSlide]);

    const handleDotClick = (index) => {
        setDirection(index > currentSlide ? 'right' : 'left');
        setCurrentSlide(index);
    };

    return (
        <div className='relative h-[90vh] bg-gray-100 flex justify-center'>
            <div className='relative w-[95%] h-[100%] rounded-3xl overflow-hidden shadow-2xl'>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-all duration-500 ease-in-out
                            ${currentSlide === index
                                ? 'translate-x-0 opacity-100'
                                : direction === 'left'
                                    ? 'translate-x-full opacity-0'
                                    : '-translate-x-full opacity-0'
                            }
                            ${currentSlide < index ? 'translate-x-full' : ''}
                            ${currentSlide > index ? '-translate-x-full' : ''}
                        `}
                    >
                        <img
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className='w-full h-full object-cover rounded-3xl'
                        />
                        <div className='absolute inset-0 bg-black/30 rounded-3xl'></div>
                        
                        {/* Slide Text */}
                        <div 
                            className={`slide-text-${index} absolute top-1/2 transform -translate-y-1/2 
                                ${slide.position === 'left' ? 'left-20' : 'right-20'} 
                                max-w-lg p-6 bg-black/40 backdrop-blur-sm rounded-xl`}
                        >
                            <h2 className="text-5xl font-bold text-white mb-4">
                                {slide.title}
                            </h2>
                            <p className="text-xl text-white/90">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                ))}

                <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10'>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentSlide === index
                                    ? 'bg-white scale-125'
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel; 