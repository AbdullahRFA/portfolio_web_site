"use client";

import { useEffect, useState } from "react";
import { fetchTableData, insertRecord, updateRecord, deleteRecord } from "../../../actions/adminCrud";

const initialForm = { title: "", description: "", long_description: "", category: "Frontend", tech_stack: "", github_url: "", live_url: "", image_url: "" };

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [form, setForm] = useState<any>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await fetchTableData("projects");
    setProjects(data);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Parse comma-separated tech stack
    const payload = { ...form, tech_stack: typeof form.tech_stack === 'string' ? form.tech_stack.split(',').map((t:string)=>t.trim()) : form.tech_stack };
    
    try {
      if (editingId) {
        await updateRecord("projects", editingId, payload);
      } else {
        await insertRecord("projects", payload);
      }
      setForm(initialForm);
      setEditingId(null);
      loadData();
    } catch (err: any) { alert(err.message); }
  };

  const handleEdit = (proj: any) => {
    setForm({ ...proj, tech_stack: proj.tech_stack.join(', ') });
    setEditingId(proj.id);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this project?")) {
      await deleteRecord("projects", id);
      loadData();
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Manage Projects</h1>
        <p className="text-sm text-zinc-400 mt-2">Add, update, or remove portfolio case studies.</p>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Title</label>
            <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500">
              <option>Frontend</option><option>Backend</option><option>Full-Stack</option><option>Mobile Apps</option><option>AI/ML & IoT</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Short Description</label>
            <input required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Long Description (Modal)</label>
            <textarea rows={3} required value={form.long_description} onChange={e => setForm({...form, long_description: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tech Stack (Comma Separated)</label>
            <input required value={form.tech_stack} onChange={e => setForm({...form, tech_stack: e.target.value})} placeholder="Next.js, Tailwind, Supabase" className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-2.5 bg-cyan-500 text-zinc-950 font-bold rounded-xl hover:bg-cyan-400 transition-colors">
            {editingId ? "Update Project" : "Insert Project"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setForm(initialForm); setEditingId(null); }} className="px-6 py-2.5 bg-zinc-800 text-zinc-300 font-bold rounded-xl hover:bg-zinc-700 transition-colors">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-900 text-zinc-100 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Tech Stack</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800/60">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="px-6 py-4 font-bold text-zinc-200">{proj.title}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-md text-[10px] uppercase font-black tracking-widest">{proj.category}</span>
                </td>
                <td className="px-6 py-4">{proj.tech_stack.join(', ')}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleEdit(proj)} className="text-zinc-500 hover:text-cyan-400 font-bold">Edit</button>
                  <button onClick={() => handleDelete(proj.id)} className="text-zinc-500 hover:text-red-400 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}