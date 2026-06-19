"use client";

import { useEffect, useState } from "react";
import { fetchTableData, insertRecord, updateRecord, deleteRecord } from "../../../actions/adminCrud";
import ImageUploader from "../../../components/ImageUploader";

const initialForm = { 
  title: "", 
  description: "", 
  issuer: "", 
  issue_date: "", 
  expire_date: "No expiration", 
  credential_id: "", 
  credential_url: "", 
  platform: "", 
  photos: "", 
  tags: "",
  sort_order: 0 // Added sort order
};

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [form, setForm] = useState<any>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await fetchTableData("certifications");
    // Sort data immediately after fetching
    const sortedData = data.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
    setCertifications(sortedData);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse comma-separated strings back into arrays for PostgreSQL TEXT[] columns
    const payload = { 
      ...form, 
      sort_order: Number(form.sort_order),
      photos: typeof form.photos === 'string' 
        ? form.photos.split(',').map((p:string) => p.trim()).filter(Boolean) 
        : form.photos,
      tags: typeof form.tags === 'string' 
        ? form.tags.split(',').map((t:string) => t.trim()).filter(Boolean) 
        : form.tags 
    };
    
    try {
      if (editingId) {
        await updateRecord("certifications", editingId, payload);
      } else {
        await insertRecord("certifications", payload);
      }
      setForm(initialForm);
      setEditingId(null);
      loadData();
    } catch (err: any) { alert(err.message); }
  };

  const handleEdit = (cert: any) => {
    setForm({ 
      ...cert, 
      photos: cert.photos ? cert.photos.join(', ') : "",
      tags: cert.tags ? cert.tags.join(', ') : "",
      sort_order: cert.sort_order || 0
    });
    setEditingId(cert.id);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this certification?")) {
      await deleteRecord("certifications", id);
      loadData();
    }
  };

  // --- Quick Reorder Functionality ---
  const handleMove = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === certifications.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const currentItem = certifications[index];
    const targetItem = certifications[targetIndex];

    try {
      // Swap their sort_order values in the database
      await updateRecord("certifications", currentItem.id, { sort_order: targetItem.sort_order || targetIndex });
      await updateRecord("certifications", targetItem.id, { sort_order: currentItem.sort_order || index });
      
      // Reload the data to reflect changes
      loadData();
    } catch (err: any) {
      alert("Failed to reorder: " + err.message);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Manage Certifications</h1>
        <p className="text-sm text-zinc-400 mt-2">Update and organize your verified achievements, professional licenses, and credentials.</p>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Certification Title</label>
            <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="e.g., Fundamental IT Engineer (FE)" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Description</label>
            <textarea rows={3} required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="Earned professional IT certification covering core engineering principles..." />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Issuer Organization</label>
            <input required value={form.issuer} onChange={e => setForm({...form, issuer: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="e.g., ITEE (BD-ITEC/BCC)" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Platform</label>
            <input required value={form.platform} onChange={e => setForm({...form, platform: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="e.g., Coursera, LinkedIn, ITEE" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Issue Date</label>
            <input required value={form.issue_date} onChange={e => setForm({...form, issue_date: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="e.g., April 2025" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Expiration Date</label>
            <input required value={form.expire_date} onChange={e => setForm({...form, expire_date: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Credential ID (Optional)</label>
            <input value={form.credential_id} onChange={e => setForm({...form, credential_id: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Credential URL</label>
            <input value={form.credential_url} onChange={e => setForm({...form, credential_url: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="https://..." />
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tags (Comma Separated)</label>
            <input required value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="Core Engineering, SQA, Architecture" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Display Order (Lower is First)</label>
            <input type="number" required value={form.sort_order} onChange={e => setForm({...form, sort_order: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Certification Image(s)</label>
            <ImageUploader 
              currentImageUrl={form.photos}
              onUploadSuccess={(url) => setForm({ ...form, photos: url })}
              folderName="certifications"
            />
            <p className="text-[9px] text-zinc-500 mt-1">Note: If adding multiple images, separate the URLs with commas in the text box.</p>
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-2.5 bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors">
            {editingId ? "Update Certification" : "Add Certification"}
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
              <th className="px-6 py-4 w-16 text-center">Order</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Issuer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800/60">
            {certifications.map((cert, index) => (
              <tr key={cert.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="px-6 py-4 font-mono text-center">
                  <div className="flex flex-col items-center gap-1">
                    <button onClick={() => handleMove(index, "up")} disabled={index === 0} className={`text-zinc-500 hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors`}>▲</button>
                    <span className="text-zinc-300">{cert.sort_order || 0}</span>
                    <button onClick={() => handleMove(index, "down")} disabled={index === certifications.length - 1} className={`text-zinc-500 hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors`}>▼</button>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-zinc-200">{cert.title}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md text-[10px] uppercase font-black tracking-widest">{cert.issuer}</span>
                </td>
                <td className="px-6 py-4">{cert.issue_date}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleEdit(cert)} className="text-zinc-500 hover:text-emerald-400 font-bold">Edit</button>
                  <button onClick={() => handleDelete(cert.id)} className="text-zinc-500 hover:text-red-400 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}