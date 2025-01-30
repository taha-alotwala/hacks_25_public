import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PreBooking() {
  const formRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Animate the header section
      tl.from("h1", {
        y: -30,
        opacity: 0,
        duration: 0.8
      })
      .from("p.text-center", {
        y: -20,
        opacity: 0,
        duration: 0.6
      }, "-=0.4")
      
      // Animate the form card
      .from(formRef.current, {
        x: -50,
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
      }, "-=0.4")

      // Animate summary card
      .from(summaryRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        clearProps: "all"
      }, "-=1.2")

      // Animate summary items
      .from(".summary-item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        clearProps: "all"
      }, "-=0.4");

      // Add hover animation for the confirm button
      const confirmButton = summaryRef.current.querySelector('.confirm-button');
      confirmButton.addEventListener('mouseenter', () => {
        gsap.to(confirmButton, {
          scale: 1.02,
          duration: 0.2
        });
      });

      confirmButton.addEventListener('mouseleave', () => {
        gsap.to(confirmButton, {
          scale: 1,
          duration: 0.2
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Pre-Book Your Fresh Produce
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Secure your fresh vegetables with just 10% advance payment
        </p>
        
        <div className="grid grid-cols-12 gap-8">
          {/* Left Section - Form */}
          <div className="col-span-7">
            <div ref={formRef} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-[0_0_15px_rgba(0,128,0,0.1)] hover:shadow-[0_0_20px_rgba(0,128,0,0.15)] transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                Booking Information
              </h2>

              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
                  />
                  <div className="bg-green-50/50 p-4 rounded-xl space-y-2">
                    <h3 className="text-sm font-medium text-green-800">Preferred Delivery Time</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="date" 
                        className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700"
                      />
                      <select className="form-element w-full p-3 bg-white border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all duration-300 text-gray-700">
                        <option value="">Select Time Slot</option>
                        <option value="morning">Morning (8AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 4PM)</option>
                        <option value="evening">Evening (4PM - 8PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50/50 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-green-800 mb-3">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button type="button" className="form-element p-3 border border-green-200 rounded-xl hover:bg-green-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20">
                      <img src="/upi-icon.svg" alt="UPI" className="h-6 w-6 mx-auto" />
                      <span className="text-sm text-gray-600 mt-1">UPI</span>
                    </button>
                    <button type="button" className="form-element p-3 border border-green-200 rounded-xl hover:bg-green-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20">
                      <img src="/card-icon.svg" alt="Card" className="h-6 w-6 mx-auto" />
                      <span className="text-sm text-gray-600 mt-1">Card</span>
                    </button>
                    <button type="button" className="form-element p-3 border border-green-200 rounded-xl hover:bg-green-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20">
                      <img src="/netbanking-icon.svg" alt="NetBanking" className="h-6 w-6 mx-auto" />
                      <span className="text-sm text-gray-600 mt-1">NetBanking</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Section - Booking Summary */}
          <div ref={summaryRef} className="col-span-5 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-[0_0_15px_rgba(0,128,0,0.1)] hover:shadow-[0_0_20px_rgba(0,128,0,0.15)] transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Booking Summary</h2>
              <div className="space-y-4">
                {/* Vegetable Items */}
                <div className="space-y-3">
                  <div className="summary-item p-4 bg-green-50/50 rounded-xl hover:bg-green-50 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
                        <img 
                          src="https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?cs=srgb&dl=pexels-julia-nagy-568948-1327838.jpg&fm=jpg" 
                          alt="Tomato" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">Fresh Tomatoes</h3>
                        <p className="text-sm text-gray-600">Quantity: 4kg</p>
                        <p className="text-sm font-medium text-green-600">₹40.00/kg</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹160.00</p>
                      </div>
                    </div>
                  </div>

                  <div className="summary-item p-4 bg-green-50/50 rounded-xl hover:bg-green-50 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
                        <img 
                          src="https://hips.hearstapps.com/hmg-prod/images/roasted-potatoes-index-66b12d409240c.jpg?crop=0.6669219966807098xw:1xh;center,top&resize=1200:*" 
                          alt="Potato" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">Fresh Potatoes</h3>
                        <p className="text-sm text-gray-600">Quantity: 5kg</p>
                        <p className="text-sm font-medium text-green-600">₹40.00/kg</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹200.00</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="summary-item p-4 bg-green-50/50 rounded-xl">
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Total Order Value</span>
                    <span className="font-semibold">₹360.00</span>
                  </div>
                  <div className="h-px bg-green-100 my-3"></div>
                  <div className="flex justify-between items-center text-green-800 font-medium">
                    <span>Pre-booking Amount (10%)</span>
                    <span>₹36.00</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * Remaining amount to be paid at delivery: ₹324.00
                  </p>
                </div>

                <div className="bg-green-50/50 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Pre-booking Benefits</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Priority Delivery
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Guaranteed Fresh Produce
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      5% Extra Discount
                    </li>
                  </ul>
                </div>

                <button className="confirm-button w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2">
                  <span>Pay ₹36.00 to Confirm</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
