import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';

export default function SignUp() {
    const formRef = useRef(null);
    const navigate = useNavigate();
    
    // Individual state for each field
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState('');
    const [isUser, setIsUser] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial animation timeline
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            // Animate the brand section
            tl.from(".brand-section", {
                y: -30,
                opacity: 0,
                duration: 0.8
            })
            
            // Animate the form card
            tl.from(".signup-card", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                clearProps: "all"
            }, "-=0.4")

            // Animate form elements
            tl.from(".form-element", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                clearProps: "all"
            }, "-=0.4");

            // Add hover animation for the signup button
            const signupButton = formRef.current.querySelector('.signup-button');
            signupButton.addEventListener('mouseenter', () => {
                gsap.to(signupButton, {
                    scale: 1.02,
                    duration: 0.2
                });
            });

            signupButton.addEventListener('mouseleave', () => {
                gsap.to(signupButton, {
                    scale: 1,
                    duration: 0.2
                });
            });
        });

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const endpoint = isUser ? 'auth/register' : 'vendor/register';
            const response = await axios.post(`http://localhost:3000/api/v1/${endpoint}`, {
                name,
                email,
                password,
                location
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('userType', isUser ? 'user' : 'vendor');
            
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8 brand-section">
                    <h2 className="text-3xl font-bold text-green-800">Fresh Market</h2>
                    <p className="mt-2 text-gray-600">Create your account and start trading.</p>
                </div>

                {/* SignUp Form Card */}
                <div ref={formRef} className="signup-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_0_50px_rgba(0,128,0,0.1)] border border-green-100 p-8">
                    
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                            {error}
                        </div>
                    )}
                        <div className="form-element space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-green-100 rounded-xl 
                                             text-gray-900 placeholder-gray-400
                                             focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20
                                             transition-all duration-300"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="form-element space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-green-100 rounded-xl 
                                             text-gray-900 placeholder-gray-400
                                             focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20
                                             transition-all duration-300"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="form-element space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-green-100 rounded-xl 
                                             text-gray-900 placeholder-gray-400
                                             focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20
                                             transition-all duration-300"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Location Field */}
                        <div className="form-element space-y-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-green-100 rounded-xl 
                                             text-gray-900 placeholder-gray-400
                                             focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20
                                             transition-all duration-300"
                                    placeholder="Enter your location"
                                />
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="form-element flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500/20 border-green-100 rounded"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I agree to the Terms & Conditions
                            </label>
                        </div>

                        {/* SignUp Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !terms}
                            className={`signup-button w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm 
                                     text-sm font-medium text-white bg-green-600 
                                     transition-all duration-300 transform hover:-translate-y-0.5
                                     ${isLoading || !terms ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-700'}`}
                        >
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </button>

                        {/* Login Link */}
                        <div className="form-element text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="/login" className="font-medium text-green-600 hover:text-green-700 transition-colors duration-300">
                                    Sign in
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}