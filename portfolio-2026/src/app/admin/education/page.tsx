"use client";

import { useEffect, useState } from "react";
import { fetchTableData, insertRecord, updateRecord, deleteRecord } from "../../../actions/adminCrud";

const initialForm = { 
  institution: "", 
  degree: "", 
  date: "", 
  description: "", 
  linkedin_url: "", 
  skills: "" 
};

export default function AdminEducationPage() {
  const [education, setEducation] = useState<any[]>([]);
  const [form, setForm] = useState<any>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await fetchTableData("education");
    setEducation(data);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRecord("education", editingId, form);
      } else {
        await insertRecord("education", form);
      }
      setForm(initialForm);
      setEditingId(null);
      loadData();
    } catch (err: any) { alert(err.message); }
  };

  const handleEdit = (edu: any) => {
    setForm(edu);
    setEditingId(edu.id);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this education record?")) {
      await deleteRecord("education", id);
      loadData();
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Manage Education</h1>
        <p className="text-sm text-zinc-400 mt-2">Maintain your academic credentials and qualifications.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Institution</label>
            <input required value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Degree</label>
            <input required value={form.degree} onChange={e => setForm({...form, degree: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Date / Period</label>
            <input required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">LinkedIn URL</label>
            <input value={form.linkedin_url} onChange={e => setForm({...form, linkedin_url: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-emerald-500" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Description</label>
            <textarea rows={3} required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-emerald-500" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Skills Gained (Comma Separated)</label>
            <input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-emerald-500" />
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-2.5 bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors">
            {editingId ? "Update Education" : "Add Education"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-900 text-zinc-100 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4">Institution</th>
              <th className="px-6 py-4">Degree</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800/60">
            {education.map((edu) => (
              <tr key={edu.id} className="hover:bg-zinc-900/40">
                <td className="px-6 py-4 font-bold text-zinc-200">{edu.institution}</td>
                <td className="px-6 py-4">{edu.degree}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleEdit(edu)} className="text-zinc-500 hover:text-emerald-400 font-bold">Edit</button>
                  <button onClick={() => handleDelete(edu.id)} className="text-zinc-500 hover:text-red-400 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}