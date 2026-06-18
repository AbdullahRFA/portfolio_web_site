"use client";

import { useEffect, useState } from "react";
import { fetchTableData, insertRecord, updateRecord, deleteRecord } from "../../../actions/adminCrud";

const initialForm = { 
  role: "", 
  company: "", 
  location: "", 
  period: "", 
  description: "", 
  tags: "" 
};

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [form, setForm] = useState<any>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await fetchTableData("experiences");
    setExperiences(data);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse description (newline separated) and tags (comma separated) into arrays for Supabase
    const payload = { 
      ...form, 
      description: typeof form.description === 'string' 
        ? form.description.split('\n').map((d:string)=>d.trim()).filter(Boolean) 
        : form.description,
      tags: typeof form.tags === 'string' 
        ? form.tags.split(',').map((t:string)=>t.trim()).filter(Boolean) 
        : form.tags 
    };
    
    try {
      if (editingId) {
        await updateRecord("experiences", editingId, payload);
      } else {
        await insertRecord("experiences", payload);
      }
      setForm(initialForm);
      setEditingId(null);
      loadData();
    } catch (err: any) { alert(err.message); }
  };

  const handleEdit = (exp: any) => {
    setForm({ 
      ...exp, 
      // Convert arrays back to strings for the input fields
      description: exp.description ? exp.description.join('\n') : "",
      tags: exp.tags ? exp.tags.join(', ') : ""
    });
    setEditingId(exp.id);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this experience record?")) {
      await deleteRecord("experiences", id);
      loadData();
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Manage Experiences</h1>
        <p className="text-sm text-zinc-400 mt-2">Add or update your chronological career and education path.</p>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Role / Degree</label>
            <input required value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="e.g., AI & Machine Learning Engineering Track" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Company / Institution</label>
            <input required value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="e.g., Ostad" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Location</label>
            <input required value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="e.g., Dhaka, Bangladesh" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Period</label>
            <input required value={form.period} onChange={e => setForm({...form, period: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="e.g., May 2026 - Present" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Description (One bullet point per line)</label>
            <textarea rows={4} required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="Developed production-ready systems...&#10;Gained hands-on expertise..." />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tags (Comma Separated)</label>
            <input required value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Python, Computer Vision, LLMs" className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-2.5 bg-cyan-500 text-zinc-950 font-bold rounded-xl hover:bg-cyan-400 transition-colors">
            {editingId ? "Update Experience" : "Insert Experience"}
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
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Period</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800/60">
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="px-6 py-4 font-bold text-zinc-200">{exp.role}</td>
                <td className="px-6 py-4">{exp.company}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md text-[10px] uppercase font-black tracking-widest">{exp.period}</span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleEdit(exp)} className="text-zinc-500 hover:text-cyan-400 font-bold">Edit</button>
                  <button onClick={() => handleDelete(exp.id)} className="text-zinc-500 hover:text-red-400 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}