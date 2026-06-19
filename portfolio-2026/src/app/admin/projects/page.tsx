"use client";

import { useEffect, useState } from "react";
import { fetchTableData, insertRecord, updateRecord, deleteRecord } from "../../../actions/adminCrud";
import ImageUploader from "../../../components/ImageUploader";

const initialForm = { 
  title: "", 
  description: "", 
  long_description: "", 
  category: "Frontend", 
  tech_stack: "", 
  github_url: "", 
  live_url: "", 
  image_url: "",
  sort_order: 0 // Added sort order
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [form, setForm] = useState<any>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await fetchTableData("projects");
    // Sort the data by sort_order ascending immediately after fetching
    const sortedData = data.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
    setProjects(sortedData);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Parse comma-separated tech stack and ensure sort_order is a Number
    const payload = { 
      ...form, 
      sort_order: Number(form.sort_order),
      tech_stack: typeof form.tech_stack === 'string' 
        ? form.tech_stack.split(',').map((t:string)=>t.trim()).filter(Boolean) 
        : form.tech_stack 
    };
    
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
    setForm({ 
      ...proj, 
      tech_stack: proj.tech_stack ? proj.tech_stack.join(', ') : "",
      sort_order: proj.sort_order || 0
    });
    setEditingId(proj.id);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this project?")) {
      await deleteRecord("projects", id);
      loadData();
    }
  };

  // --- Quick Reorder Functionality ---
  const handleMove = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === projects.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const currentItem = projects[index];
    const targetItem = projects[targetIndex];

    try {
      // Swap their sort_order values in the database
      await updateRecord("projects", currentItem.id, { sort_order: targetItem.sort_order || targetIndex });
      await updateRecord("projects", targetItem.id, { sort_order: currentItem.sort_order || index });
      
      // Reload the data to reflect changes
      loadData();
    } catch (err: any) {
      alert("Failed to reorder: " + err.message);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Manage Projects</h1>
        <p className="text-sm text-zinc-400 mt-2">Add, update, reorder, or remove portfolio case studies.</p>
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
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">GitHub URL</label>
            <input value={form.github_url} onChange={e => setForm({...form, github_url: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Live URL (Optional)</label>
            <input value={form.live_url} onChange={e => setForm({...form, live_url: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Short Description</label>
            <input required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Long Description (Modal)</label>
            <textarea rows={3} required value={form.long_description} onChange={e => setForm({...form, long_description: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tech Stack (Comma Separated)</label>
            <input required value={form.tech_stack} onChange={e => setForm({...form, tech_stack: e.target.value})} placeholder="Next.js, Tailwind, Supabase" className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Display Order (Lower is First)</label>
            <input type="number" required value={form.sort_order} onChange={e => setForm({...form, sort_order: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" />
          </div>
          
          {/* Cover Image Uploader Block */}
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Cover Image</label>
            <ImageUploader 
              currentImageUrl={form.image_url}
              onUploadSuccess={(url) => setForm({ ...form, image_url: url })}
              folderName="projects"
            />
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
              <th className="px-6 py-4 w-16 text-center">Order</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800/60">
            {projects.map((proj, index) => (
              <tr key={proj.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="px-6 py-4 font-mono text-center">
                  <div className="flex flex-col items-center gap-1">
                    <button onClick={() => handleMove(index, "up")} disabled={index === 0} className={`text-zinc-500 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors`}>▲</button>
                    <span className="text-zinc-300">{proj.sort_order || 0}</span>
                    <button onClick={() => handleMove(index, "down")} disabled={index === projects.length - 1} className={`text-zinc-500 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors`}>▼</button>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-zinc-200">
                  <div className="flex items-center gap-3">
                    {proj.image_url ? (
                      <img src={proj.image_url} alt="cover" className="w-10 h-10 rounded-md object-cover border border-zinc-700" />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[8px]">No Img</div>
                    )}
                    {proj.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-md text-[10px] uppercase font-black tracking-widest">{proj.category}</span>
                </td>
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