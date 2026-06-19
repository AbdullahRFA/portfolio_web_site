"use client";

import { useEffect, useState } from "react";
import { fetchTableData, insertRecord, updateRecord, deleteRecord } from "../../../actions/adminCrud";
import ImageUploader from "../../../components/ImageUploader";

const initialForm = { 
  slug: "", 
  title: "", 
  excerpt: "", 
  date: "", 
  category: "Web Development", 
  reading_time: "5 min read", 
  content: "",
  image_url: "",
  sort_order: 0 // Added sort order
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [form, setForm] = useState<any>(initialForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const loadData = async () => {
    // We still fetch initially, but now we sort by custom sort_order locally
    const data = await fetchTableData("blogs", "created_at");
    const sortedData = data.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
    setBlogs(sortedData);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure sort_order is passed as a number
    const payload = { ...form, sort_order: Number(form.sort_order) };

    try {
      if (editingSlug) {
        // Pass "slug" as the primary key column to our updated generic action
        await updateRecord("blogs", editingSlug, payload, "slug");
      } else {
        await insertRecord("blogs", payload);
      }
      setForm(initialForm);
      setEditingSlug(null);
      loadData();
    } catch (err: any) { alert("Database Error: " + err.message); }
  };

  const handleEdit = (blog: any) => {
    setForm({
      ...blog,
      sort_order: blog.sort_order || 0
    });
    setEditingSlug(blog.slug);
  };

  const handleDelete = async (slug: string) => {
    if(confirm("Are you sure you want to permanently delete this technical insight?")) {
      await deleteRecord("blogs", slug, "slug"); // Pass "slug" as the primary key
      loadData();
    }
  };

  // --- Quick Reorder Functionality ---
  const handleMove = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === blogs.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const currentItem = blogs[index];
    const targetItem = blogs[targetIndex];

    try {
      // Swap their sort_order values in the database. Primary key is "slug"
      await updateRecord("blogs", currentItem.slug, { sort_order: targetItem.sort_order || targetIndex }, "slug");
      await updateRecord("blogs", targetItem.slug, { sort_order: currentItem.sort_order || index }, "slug");
      
      // Reload the data to reflect changes
      loadData();
    } catch (err: any) {
      alert("Failed to reorder: " + err.message);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Manage Technical Insights</h1>
        <p className="text-sm text-zinc-400 mt-2">Publish, edit, and organize your technical blog posts and markdown content.</p>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">URL Slug (Primary Key)</label>
            <input 
              required 
              value={form.slug} 
              onChange={e => setForm({...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} 
              disabled={!!editingSlug} // Prevent editing the primary key once created
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed" 
              placeholder="e.g., demystifying-explainable-ai" 
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-fuchsia-500">
              <option>Web Development</option>
              <option>AI & ML</option>
              <option>SQA Engineering</option>
              <option>Hardware & IoT</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Article Title</label>
            <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-fuchsia-500" placeholder="Demystifying Explainable AI..." />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Publication Date</label>
            <input required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-fuchsia-500" placeholder="June 12, 2026" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Estimated Reading Time</label>
            <input required value={form.reading_time} onChange={e => setForm({...form, reading_time: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-fuchsia-500" placeholder="5 min read" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Excerpt Summary</label>
            <input required value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-fuchsia-500" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Full Markdown / Content Body</label>
            <textarea rows={8} required value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-fuchsia-500 font-mono leading-relaxed" placeholder="Write your technical content here..." />
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Display Order (Lower is First)</label>
            <input type="number" required value={form.sort_order} onChange={e => setForm({...form, sort_order: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-fuchsia-500" />
          </div>

          {/* Image Uploader */}
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Cover Image</label>
            <ImageUploader 
              currentImageUrl={form.image_url}
              onUploadSuccess={(url) => setForm({ ...form, image_url: url })}
              folderName="blogs"
            />
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-6 py-2.5 bg-fuchsia-500 text-zinc-950 font-bold rounded-xl hover:bg-fuchsia-400 transition-colors">
            {editingSlug ? "Update Publication" : "Publish Article"}
          </button>
          {editingSlug && (
            <button type="button" onClick={() => { setForm(initialForm); setEditingSlug(null); }} className="px-6 py-2.5 bg-zinc-800 text-zinc-300 font-bold rounded-xl hover:bg-zinc-700 transition-colors">
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
              <th className="px-6 py-4">Title & Slug</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800/60">
            {blogs.map((blog, index) => (
              <tr key={blog.slug} className="hover:bg-zinc-900/40 transition-colors">
                <td className="px-6 py-4 font-mono text-center">
                  <div className="flex flex-col items-center gap-1">
                    <button onClick={() => handleMove(index, "up")} disabled={index === 0} className={`text-zinc-500 hover:text-fuchsia-400 disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors`}>▲</button>
                    <span className="text-zinc-300">{blog.sort_order || 0}</span>
                    <button onClick={() => handleMove(index, "down")} disabled={index === blogs.length - 1} className={`text-zinc-500 hover:text-fuchsia-400 disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors`}>▼</button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {blog.image_url && (
                       <img src={blog.image_url} alt="cover" className="w-10 h-10 rounded-md object-cover border border-zinc-700 shrink-0" />
                    )}
                    <div>
                      <p className="font-bold text-zinc-200">{blog.title}</p>
                      <p className="text-[10px] text-zinc-600 font-mono mt-1">/{blog.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-fuchsia-500/10 text-fuchsia-400 rounded-md text-[10px] uppercase font-black tracking-widest">{blog.category}</span>
                </td>
                <td className="px-6 py-4 font-medium">{blog.date}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleEdit(blog)} className="text-zinc-500 hover:text-fuchsia-400 font-bold">Edit</button>
                  <button onClick={() => handleDelete(blog.slug)} className="text-zinc-500 hover:text-red-400 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}