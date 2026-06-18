"use client";

import { useEffect, useState } from "react";
import { fetchTableData, insertRecord, updateRecord, deleteRecord } from "../../../actions/adminCrud";

const initialForm = { 
  title: "", 
  description: "", 
  grid_class: "md:col-span-1 bg-zinc-900/40", // Default baseline styling
  skills: [{ name: "", level: "" }] // Start with one empty skill row
};

export default function AdminSkillsPage() {
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [form, setForm] = useState<any>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await fetchTableData("skills");
    setSkillCategories(data);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out any completely empty skill rows before saving to JSONB
    const cleanedSkills = form.skills.filter((s: any) => s.name.trim() !== "" || s.level.trim() !== "");
    const payload = { ...form, skills: cleanedSkills };
    
    try {
      if (editingId) {
        await updateRecord("skills", editingId, payload);
      } else {
        await insertRecord("skills", payload);
      }
      setForm(initialForm);
      setEditingId(null);
      loadData();
    } catch (err: any) { alert(err.message); }
  };

  const handleEdit = (category: any) => {
    setForm({
      ...category,
      // Ensure there's at least one empty row if the array happens to be empty
      skills: category.skills?.length > 0 ? category.skills : [{ name: "", level: "" }]
    });
    setEditingId(category.id);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this entire skill category?")) {
      await deleteRecord("skills", id);
      loadData();
    }
  };

  // --- Dynamic JSONB Array Handlers ---
  const addSkillRow = () => {
    setForm({ ...form, skills: [...form.skills, { name: "", level: "" }] });
  };

  const removeSkillRow = (index: number) => {
    const updatedSkills = form.skills.filter((_: any, i: number) => i !== index);
    setForm({ ...form, skills: updatedSkills });
  };

  const updateSkill = (index: number, field: "name" | "level", value: string) => {
    const updatedSkills = [...form.skills];
    updatedSkills[index][field] = value;
    setForm({ ...form, skills: updatedSkills });
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Manage Technical Toolkit</h1>
        <p className="text-sm text-zinc-400 mt-2">Configure your Bento Grid categories and nested proficiency levels.</p>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Category Title</label>
            <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="e.g., Web Architecture" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Grid Class (Tailwind)</label>
            <input required value={form.grid_class} onChange={e => setForm({...form, grid_class: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500 font-mono text-xs" placeholder="md:col-span-2 bg-gradient..." />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Description</label>
            <textarea rows={2} required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 outline-none focus:border-cyan-500" placeholder="Building secure full-stack applications..." />
          </div>
        </div>

        {/* Dynamic Nested JSONB Skills List */}
        <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-950/50 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-300">Individual Skills (JSONB Array)</h3>
            <button type="button" onClick={addSkillRow} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors">
              + Add Skill
            </button>
          </div>
          
          <div className="space-y-2">
            {form.skills.map((skill: any, index: number) => (
              <div key={index} className="flex gap-2 items-center">
                <input 
                  value={skill.name} 
                  onChange={e => updateSkill(index, "name", e.target.value)} 
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm text-zinc-100 outline-none focus:border-cyan-500" 
                  placeholder="Skill Name (e.g., React)" 
                />
                <input 
                  value={skill.level} 
                  onChange={e => updateSkill(index, "level", e.target.value)} 
                  className="w-1/3 bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm text-zinc-100 outline-none focus:border-cyan-500" 
                  placeholder="Level (e.g., Advanced)" 
                />
                <button 
                  type="button" 
                  onClick={() => removeSkillRow(index)} 
                  className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  aria-label="Remove skill"
                >
                  ✕
                </button>
              </div>
            ))}
            {form.skills.length === 0 && (
              <p className="text-xs text-zinc-500 italic">No skills added yet. Click "+ Add Skill" above.</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-4 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            {editingId ? "Update Category" : "Add Category"}
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
              <th className="px-6 py-4">Category Title</th>
              <th className="px-6 py-4">Included Skills</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800/60">
            {skillCategories.map((category) => (
              <tr key={category.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="px-6 py-4 font-bold text-zinc-200">{category.title}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {category.skills?.map((s: any, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-md text-[9px] uppercase font-bold">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleEdit(category)} className="text-zinc-500 hover:text-blue-400 font-bold">Edit</button>
                  <button onClick={() => handleDelete(category.id)} className="text-zinc-500 hover:text-red-400 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}