import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/form/Input";

export default function Login() {
  const nav = useNavigate();
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setIsLoading(true);
    
    try { 
      console.log("Logging in...");
      await login(username, password); 
      console.log("Login successful, navigating to practitioner step1...");
      nav("/practitioner/step1"); 
    }
    catch (e:any) { 
      console.error("Login error:", e);
      setErr(e?.response?.data?.detail || "Login failed"); 
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200 to-yellow-200 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-3xl">🕉️</span>
              </div>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent drop-shadow-lg mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your Panditji account</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
            <form onSubmit={submit} className="space-y-6">
              {/* Error Message */}
              {err && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">⚠️</span>
                    </div>
                    <p className="text-sm text-red-700">{err}</p>
                  </div>
                </div>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <Input 
                  label="Username" 
                  value={username} 
                  onChange={e => setU(e.target.value)} 
                  required 
                  disabled={isLoading}
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Input 
                  label="Password" 
                  type="password" 
                  value={password} 
                  onChange={e => setP(e.target.value)} 
                  required 
                  disabled={isLoading}
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <span>🔐</span>
                    Sign In
                  </span>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                New here?{" "}
                <Link 
                  to="/signup" 
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 hover:bg-white/50 rounded-xl"
            >
              <span>🏠</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
