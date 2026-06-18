"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "../../../actions/adminCrud";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginAdmin(password);
    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Failed to login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        <h1 className="text-2xl font-black text-zinc-50 mb-6 text-center">System Override Access</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Admin Password"
          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 focus:border-cyan-500 outline-none mb-4"
        />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-full py-3 rounded-xl bg-cyan-500 text-zinc-950 font-bold hover:bg-cyan-400 transition-colors">
          Authenticate
        </button>
      </form>
    </div>
  );
}