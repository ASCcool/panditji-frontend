import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthed, username } = useAuth();

  return (
    <header className="w-full bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 shadow-2xl border-b-4 border-purple-500">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">🕉️</span>
          </div>
          <span className="font-extrabold text-3xl bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
            Panditji
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link 
            to="/practitioner/step1" 
            className="relative px-4 py-2 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 group"
          >
            <span className="relative z-10">Empanelment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          {isAuthed ? (
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-white/10 rounded-full text-white text-sm font-medium">
                👋 {username}
              </div>
              <button
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
