"use client";

import { useEffect, useState } from "react";
import { fetchTableData, deleteRecord } from "../../../actions/adminCrud";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const data = await fetchTableData("messages", "created_at");
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to permanently delete this message?")) {
      await deleteRecord("messages", id);
      loadData();
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-zinc-50">Communications Inbox</h1>
        <p className="text-sm text-zinc-400 mt-2">Review and manage direct transmissions from your portfolio contact form.</p>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="text-zinc-500 animate-pulse">Loading secure channel data...</div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30 text-zinc-500 text-sm">
            Inbox is currently empty.
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="relative p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-cyan-400">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-xs text-zinc-400 hover:text-zinc-200 underline underline-offset-4 transition-colors">
                    {msg.email}
                  </a>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500">
                    {new Date(msg.created_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                  <button 
                    onClick={() => handleDelete(msg.id)} 
                    className="text-[10px] font-bold text-red-500/70 hover:text-red-400 uppercase tracking-widest transition-colors px-2 py-1 rounded bg-red-500/10 opacity-0 group-hover:opacity-100"
                  >
                    Delete Thread
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 shadow-inner">
                <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}