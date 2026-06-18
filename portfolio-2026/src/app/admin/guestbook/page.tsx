"use client";

import { useEffect, useState } from "react";
import { fetchTableData, insertRecord, updateRecord, deleteRecord } from "../../../actions/adminCrud";

const initialForm = { 
  name: "Abdullah Nazmus-Sakib", 
  avatar: "/profile_pic_2.jpg", 
  message: "", 
  date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), 
  is_owner: true 
};

export default function AdminGuestbookPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [form, setForm] = useState<any>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    // Sort by created_at descending
    const data = await fetchTableData("guestbook", "created_at");
    setEntries(data);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRecord("guestbook", editingId, form);
      } else {
        await insertRecord("guestbook", form);
      }
      setForm(initialForm);
      setEditingId(null);
      loadData();
    } catch (err: any) { alert(err.message); }
  };

  const handleEdit = (entry: any) => {
    setForm(entry);
    setEditingId(entry.id);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to remove this signature from your guestbook?")) {
      await deleteRecord("guestbook", id);
      loadData();
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Manage Guestbook</h1>
        <p className="text-sm text-zinc-400 mt-2">Moderate public logs or post your own official replies.</p>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Display Name</label>
            <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Avatar URL</label>
            <input required value={form.avatar} onChange={e => setForm({...form, avatar: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Display Date</label>
            <input required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div className="flex items-center gap-3 mt-6">
            <input 
              type="checkbox" 
              checked={form.is_owner} 
              onChange={e => setForm({...form, is_owner: e.target.checked})} 
              className="w-5 h-5 accent-fuchsia-500 rounded bg-zinc-950 border-zinc-800"
            />
            <label className="text-xs font-bold text-zinc-300">Highlight as Owner (Admin Reply)</label>
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Log Message</label>
            <textarea rows={3} required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-2.5 bg-fuchsia-500 text-zinc-950 font-bold rounded-xl hover:bg-fuchsia-400 transition-colors">
            {editingId ? "Update Entry" : "Sign Guestbook"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setForm(initialForm); setEditingId(null); }} className="px-6 py-2.5 bg-zinc-800 text-zinc-300 font-bold rounded-xl hover:bg-zinc-700 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-900 text-zinc-100 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4">Visitor</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800/60">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={entry.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-zinc-800" />
                    <div>
                      <p className={`font-bold ${entry.is_owner ? 'text-fuchsia-400' : 'text-zinc-200'}`}>{entry.name}</p>
                      {entry.is_owner && <span className="text-[8px] bg-fuchsia-500/10 text-fuchsia-400 px-1.5 py-0.5 rounded uppercase tracking-widest font-black border border-fuchsia-500/20">Admin</span>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs truncate">{entry.message}</td>
                <td className="px-6 py-4">{entry.date}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleEdit(entry)} className="text-zinc-500 hover:text-cyan-400 font-bold">Edit</button>
                  <button onClick={() => handleDelete(entry.id)} className="text-zinc-500 hover:text-red-400 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}