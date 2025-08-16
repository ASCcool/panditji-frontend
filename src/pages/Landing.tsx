import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200 to-yellow-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <span className="text-5xl">🕉️</span>
                </div>
              </div>
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                Welcome to Panditji
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Connect with authentic spiritual practitioners and discover ancient wisdom in the modern world
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/practitioner/step1" 
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">🧘‍♂️</span>
                I'm a Practitioner
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            
            <Link 
              to="/user" 
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">🙏</span>
                I'm a User
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Authentic Expertise</h3>
              <p className="text-gray-600">Connect with verified spiritual practitioners and astrologers</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔮</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ancient Wisdom</h3>
              <p className="text-gray-600">Access traditional knowledge and spiritual guidance</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💫</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Modern Convenience</h3>
              <p className="text-gray-600">Get spiritual services online from anywhere in the world</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
