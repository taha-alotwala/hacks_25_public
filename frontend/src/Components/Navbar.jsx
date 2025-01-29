export default function Navbar() {
    return (
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        {/* Logo Section */}
        <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="w-10 h-10 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <h1 className="font-bold text-2xl text-gray-900 tracking-tight hover:text-green-600 transition-colors duration-300">Freshofy</h1>
        </div>
        <div className="flex items-center gap-10">
          <a href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-y-0.5">Home</a>    
          <a href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-y-0.5">About</a>
          <a href="/contact" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-y-0.5">Contact</a>
          <a href="/business" className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:-translate-y-0.5">Business Buyers</a>
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium px-4 py-1.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">Login</button>
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium px-4 py-1.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">Signup</button>
          <button className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
              className="w-7 h-7 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-pulse">0</span>
          </button>
        </div>
      </div>
    )
  }