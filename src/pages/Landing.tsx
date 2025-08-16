import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center bg-gradient-to-r from-yellow-50 to-pink-50">
      <div className="p-8 bg-white rounded-2xl shadow-md text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-purple-700">Welcome to Panditji</h1>
        <div className="flex gap-4 justify-center">
          <Link to="/practitioner/step1" className="px-5 py-3 rounded bg-purple-600 text-white hover:bg-purple-700">
            I’m a Practitioner
          </Link>
          <Link to="/user" className="px-5 py-3 rounded bg-gray-400 text-white">I’m a User</Link>
        </div>
      </div>
    </div>
  );
}
