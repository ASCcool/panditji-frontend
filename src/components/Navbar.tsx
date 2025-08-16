import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthed, username } = useAuth();
  const nav = useNavigate();

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-purple-700">Panditji</Link>
        <nav className="flex items-center gap-4">
          <Link to="/practitioner/step1" className="text-sm">Empanelment</Link>
          {isAuthed ? (
            <button
              className="text-sm text-gray-600"
              onClick={() => { logout(); nav("/"); }}
            >
              Logout ({username})
            </button>
          ) : (
            <Link to="/login" className="text-sm">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
