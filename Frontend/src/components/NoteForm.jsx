import React from 'react';
import { Plus, Check, X } from 'lucide-react';

export default function NoteForm({
  title,
  setTitle,
  content,
  setContent,
  onSubmit,
  onCancel,
  isEditing
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden group"
    >
      {/* Dynamic Background Glow on Hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <h3 className="text-xl sm:text-2xl font-display font-semibold mb-6 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
        {isEditing ? (
          <>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            Edit Note
          </>
        ) : (
          <>
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
            Write a New Note
          </>
        )}
      </h3>

      <div className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Give your note a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 focus:outline-none transition-all duration-300 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
          />
        </div>

        {/* Content Area */}
        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Content
          </label>
          <textarea
            placeholder="Type your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 focus:outline-none transition-all duration-300 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 focus:outline-none transition-all duration-300 flex items-center gap-2 text-sm font-medium"
            >
              <X size={16} />
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            disabled={!title.trim() && !content.trim()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500 text-white font-medium text-sm hover:from-violet-500 hover:to-indigo-500 dark:hover:from-violet-400 dark:hover:to-indigo-400 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 flex items-center gap-2 transform active:scale-[0.98]"
          >
            {isEditing ? (
              <>
                <Check size={16} />
                Save Changes
              </>
            ) : (
              <>
                <Plus size={16} />
                Add Note
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
