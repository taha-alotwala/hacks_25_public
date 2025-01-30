import { useAuthContext } from "../contexts/authContext"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PreBooking from "../pages/Payment/Prebooking";
export default function Navbar() {
  const { token, user } = useAuthContext();
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user type from localStorage on component mount
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);

    // Redirect vendor to seller page if they're on a non-vendor route
  
  }, [token]);

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
          className="w-10 h-10 text-green-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <h1 className="font-bold text-2xl text-gray-900 tracking-tight hover:text-green-600 transition-colors duration-300">Freshofy</h1>
      </Link>

      <div className="flex items-center gap-10">
        
        
        {/* Conditional Navigation Links */}
        {token && userType === 'user' && (
          <>
            
            <Link to="/map" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-y-0.5">Find Vendors</Link>
            <Link to="/leaflet-map" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-y-0.5">Verified Vendors</Link>
            <Link to="/product-list" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-y-0.5">Products</Link>
            <Link to='prebooking' element={<PreBooking/>} className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-y-0.5">Prebooking</Link>
          </>
        )}

        {token && userType === 'vendor' && (
          <>
          
            <Link to="/create-product" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-y-0.5">Create Product</Link>
            <Link to="/update-dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-y-0.5">Update Dashboard</Link>
          </>
        )}

        
        
        {/* User Section */}
        <div className="flex items-center gap-6">
          {token ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-medium">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-700 font-medium">
                  {user?.name}
                </span>
              </div>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  localStorage.removeItem('userType'); // Also remove userType
                  window.location.reload();
                }}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300"
            >
              Login
            </Link>
          )}

          {/* Cart Button - Only show for buyers */}
          {userType === 'user' && (
            <button className="relative group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-7 h-7 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-pulse">0</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}