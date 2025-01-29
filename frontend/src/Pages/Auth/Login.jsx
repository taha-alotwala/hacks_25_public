import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Login() {
    const formRef = useRef(null);

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
            .from(".login-card", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                clearProps: "all"
            }, "-=0.4")

            // Animate form elements
            .from(".form-element", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                clearProps: "all"
            }, "-=0.4");

            // Add hover animation for the login button
            const loginButton = formRef.current.querySelector('.login-button');
            loginButton.addEventListener('mouseenter', () => {
                gsap.to(loginButton, {
                    scale: 1.02,
                    duration: 0.2
                });
            });

            loginButton.addEventListener('mouseleave', () => {
                gsap.to(loginButton, {
                    scale: 1,
                    duration: 0.2
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8 brand-section">
                    <h2 className="text-3xl font-bold text-green-800">Fresh Market</h2>
                    <p className="mt-2 text-gray-600">Welcome back! Please login to your account.</p>
                </div>

                {/* Login Form Card */}
                <div ref={formRef} className="login-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_0_50px_rgba(0,128,0,0.1)] border border-green-100 p-8">
                    <form className="space-y-6">
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
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-green-100 rounded-xl 
                                             text-gray-900 placeholder-gray-400
                                             focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20
                                             transition-all duration-300"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="form-element flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-green-600 focus:ring-green-500/20 border-green-100 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-300">
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="login-button w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm 
                                     text-sm font-medium text-white bg-green-600 hover:bg-green-700 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                                     transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Sign in
                        </button>

                        {/* Sign Up Link */}
                        <div className="form-element text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <a href="#" className="font-medium text-green-600 hover:text-green-700 transition-colors duration-300">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}