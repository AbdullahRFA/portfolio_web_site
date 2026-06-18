"use client";

import { useEffect, useState } from "react";
import { fetchTableData, updateRecord, insertRecord } from "../../actions/adminCrud";

export default function AdminHomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTableData("home_page", "updated_at").then((res) => {
      if (res.length > 0) setData(res[0]);
      else setData({ id: 1, greeting: "Hello", name: "", roles: [], bio: "", resume_url: "" });
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    // Convert comma-separated roles string back to array if modified as string
    const formattedData = { ...data, roles: typeof data.roles === 'string' ? data.roles.split(',').map((r:string)=>r.trim()) : data.roles };
    
    try {
      if (data.created_at || data.updated_at) {
        await updateRecord("home_page", 1, formattedData);
      } else {
        await insertRecord("home_page", formattedData);
      }
      alert("Home Page updated successfully!");
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  if (loading) return <div className="text-zinc-500 animate-pulse">Loading core metrics...</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Home Page Configuration</h1>
        <p className="text-sm text-zinc-400 mt-2">Manage your hero section introduction and primary links.</p>
      </div>

      <div className="space-y-4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
        <div>
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Name</label>
          <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Bio</label>
          <textarea rows={4} value={data.bio} onChange={(e) => setData({ ...data, bio: e.target.value })} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Roles (Comma Separated)</label>
          <input type="text" value={Array.isArray(data.roles) ? data.roles.join(', ') : data.roles} onChange={(e) => setData({ ...data, roles: e.target.value })} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
        </div>
        <div>
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Resume URL</label>
          <input type="text" value={data.resume_url} onChange={(e) => setData({ ...data, resume_url: e.target.value })} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
        </div>
        
        <button onClick={handleSave} className="px-6 py-3 bg-fuchsia-500 text-white font-bold rounded-xl hover:bg-fuchsia-400 transition-colors shadow-[0_0_15px_rgba(232,121,249,0.3)]">
          Commit Changes
        </button>
      </div>
    </div>
  );
}