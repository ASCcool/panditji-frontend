import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Input from "../components/form/Input";

export default function Signup() {
  const nav = useNavigate();
  const [username, setU] = useState(""); const [password, setP] = useState(""); const [email, setE] = useState("");
  const [msg, setMsg] = useState(""); const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setMsg("");
    try { await register(username, password, email); setMsg("Account created. Please login."); nav("/login"); }
    catch (e:any) { setErr(JSON.stringify(e?.response?.data) || "Signup failed"); }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center">
      <form onSubmit={submit} className="w-full max-w-sm p-6 bg-white rounded-xl shadow space-y-3">
        <h2 className="text-xl font-bold">Create account</h2>
        {msg && <p className="text-sm text-green-700">{msg}</p>}
        {err && <p className="text-sm text-red-600">{err}</p>}
        <Input label="Username" value={username} onChange={e=>setU(e.target.value)} required />
        <Input label="Email" type="email" value={email} onChange={e=>setE(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e=>setP(e.target.value)} required />
        <button className="w-full py-2 rounded bg-purple-600 text-white">Sign up</button>
      </form>
    </div>
  );
}
