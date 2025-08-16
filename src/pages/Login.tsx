import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/form/Input";

export default function Login() {
  const nav = useNavigate();
  const [username, setU] = useState(""); const [password, setP] = useState("");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    try { 
      console.log("Logging in...");
      await login(username, password); 
      console.log("Login successful, navigating to practitioner step1...");
      nav("/practitioner/step1"); 
    }
    catch (e:any) { 
      console.error("Login error:", e);
      setErr(e?.response?.data?.detail || "Login failed"); 
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center">
      <form onSubmit={submit} className="w-full max-w-sm p-6 bg-white rounded-xl shadow space-y-3">
        <h2 className="text-xl font-bold">Login</h2>
        {err && <p className="text-sm text-red-600">{err}</p>}
        <Input label="Username" value={username} onChange={e=>setU(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={e=>setP(e.target.value)} required />
        <button type="submit" className="w-full py-2 rounded bg-purple-600 text-white">Sign in</button>
        <p className="text-xs text-gray-500">New here? <Link className="text-purple-700" to="/signup">Create account</Link></p>
      </form>
    </div>
  );
}
