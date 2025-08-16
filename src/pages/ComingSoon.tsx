export default function ComingSoon() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Construction Icon */}
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <span className="text-6xl">🚧</span>
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
              Coming Soon!
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We're building something amazing for you. The user portal is under construction and will be ready soon!
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Your Perfect Practitioner</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Browse through verified spiritual practitioners, astrologers, and puja specialists based on your needs and location.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Book Services Online</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Schedule consultations, book pujas, and get spiritual guidance from the comfort of your home through our secure platform.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Development Progress</h4>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000 ease-out" style={{width: '75%'}}></div>
              </div>
              <p className="text-gray-600">75% Complete - Launching Soon!</p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8">
            <a 
              href="/" 
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>🏠</span>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
  