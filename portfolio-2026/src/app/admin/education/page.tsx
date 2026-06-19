"use client";

import { useEffect, useState } from "react";
import { fetchTableData, insertRecord, updateRecord, deleteRecord } from "../../../actions/adminCrud";

const initialForm = { 
  institution: "", 
  degree: "", 
  date: "", 
  description: "", 
  cgpa: "", 
  skills: "",
  sort_order: 0 // Added sort order
};

export default function AdminEducationPage() {
  const [education, setEducation] = useState<any[]>([]);
  const [form, setForm] = useState<any>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await fetchTableData("education");
    // Sort the data by sort_order ascending immediately after fetching
    const sortedData = data.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
    setEducation(sortedData);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ensure sort_order is passed as a number
      const submissionData = { ...form, sort_order: Number(form.sort_order) };
      
      if (editingId) {
        await updateRecord("education", editingId, submissionData);
      } else {
        await insertRecord("education", submissionData);
      }
      setForm(initialForm);
      setEditingId(null);
      loadData();
    } catch (err: any) { alert(err.message); }
  };

  const handleEdit = (edu: any) => {
    setForm({
      institution: edu.institution || "",
      degree: edu.degree || "",
      date: edu.date || "",
      description: edu.description || "",
      cgpa: edu.cgpa || "",
      skills: edu.skills || "",
      sort_order: edu.sort_order || 0
    });
    setEditingId(edu.id);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this education record?")) {
      await deleteRecord("education", id);
      loadData();
    }
  };

  // --- Quick Reorder Functionality ---
  const handleMove = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === education.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const currentItem = education[index];
    const targetItem = education[targetIndex];

    try {
      // Swap their sort_order values in the database
      await updateRecord("education", currentItem.id, { sort_order: targetItem.sort_order || targetIndex });
      await updateRecord("education", targetItem.id, { sort_order: currentItem.sort_order || index });
      
      // Reload the data to reflect changes
      loadData();
    } catch (err: any) {
      alert("Failed to reorder: " + err.message);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Manage Education</h1>
        <p className="text-sm text-zinc-400 mt-2">Maintain and organize your academic credentials.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ... (Keep your existing inputs for institution, degree, date, cgpa) ... */}
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
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">CGPA</label>
            <input value={form.cgpa} placeholder="e.g. 3.62 out of 4.00" onChange={e => setForm({...form, cgpa: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Display Order (Lower is First)</label>
            <input type="number" required value={form.sort_order} onChange={e => setForm({...form, sort_order: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-emerald-500" />
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
              <th className="px-6 py-4 w-16 text-center">Order</th>
              <th className="px-6 py-4">Institution</th>
              <th className="px-6 py-4">Degree</th>
              <th className="px-6 py-4">CGPA</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800/60">
            {education.map((edu, index) => (
              <tr key={edu.id} className="hover:bg-zinc-900/40">
                <td className="px-6 py-4 font-mono text-center">
                  <div className="flex flex-col items-center gap-1">
                    <button onClick={() => handleMove(index, "up")} disabled={index === 0} className={`text-zinc-500 hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-zinc-500`}>▲</button>
                    <span className="text-zinc-300">{edu.sort_order || 0}</span>
                    <button onClick={() => handleMove(index, "down")} disabled={index === education.length - 1} className={`text-zinc-500 hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-zinc-500`}>▼</button>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-zinc-200">{edu.institution}</td>
                <td className="px-6 py-4">{edu.degree}</td>
                <td className="px-6 py-4 text-emerald-400 font-medium">{edu.cgpa || "-"}</td>
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