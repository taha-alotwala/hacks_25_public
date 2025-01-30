import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PageTransition = ({ onComplete }) => {
    const overlayRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete();
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => overlayRef.current.remove()
                });
            }
        });

        tl.set(overlayRef.current, {
            scale: 0,
            opacity: 0,
            borderRadius: '100%'
        })
        .to(overlayRef.current, {
            scale: 1,
            opacity: 1,
            borderRadius: '0%',
            duration: 0.8,
            ease: "power2.inOut"
        });
    }, []);

    return (
        <div 
            ref={overlayRef}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            style={{ transformOrigin: 'center center' }}
        />
    );
};

export default PageTransition; 