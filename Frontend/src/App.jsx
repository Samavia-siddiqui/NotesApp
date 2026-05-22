import React, { useState } from 'react';
import NoteForm from './components/NoteForm';
import { Sparkles, Edit2, Trash2, Calendar } from 'lucide-react';
import './App.css';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Note state (mock state for now)
  const [notes, setNotes] = useState([
    {
      id: '1',
      title: '💡 App Idea: GlowNotes',
      content: 'Create a full-stack notes app with Tailwind CSS, Framer Motion, and a Node.js/Express.js backend. Include glassmorphic cards and beautiful transitions.',
      createdAt: Date.now() - 3600000 * 2
    },
    {
      id: '2',
      title: '🛒 Weekly Grocery List',
      content: 'Almond milk, avocados, dark chocolate (85%), organic eggs, sourdough bread, fresh spinach, and single-origin coffee beans.',
      createdAt: Date.now() - 3600000 * 24
    }
  ]);

  // Form input states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  // Toggle Dark Mode
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newVal = !prev;
      if (newVal) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newVal;
    });
  };

  // Add or Update Note
  const handleSubmitNote = () => {
    if (editingNote) {
      // Update note (mock)
      setNotes(prev =>
        prev.map(note =>
          note.id === editingNote.id
            ? { ...note, title, content }
            : note
        )
      );
      setEditingNote(null);
    } else {
      // Add note (mock)
      const newNote = {
        id: Date.now().toString(),
        title: title || 'Untitled Note',
        content,
        createdAt: Date.now()
      };
      setNotes(prev => [newNote, ...prev]);
    }
    // Reset form
    setTitle('');
    setContent('');
  };

  // Edit action
  const handleStartEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
  };

  // Delete note
  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (editingNote && editingNote.id === id) {
      handleCancelEdit();
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-500 pb-16">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-violet-100/40 via-indigo-50/20 to-transparent dark:from-violet-950/10 dark:via-transparent dark:to-transparent pointer-events-none -z-10" />
      
      {/* Header */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/60 dark:bg-zinc-950/60 border-b border-zinc-200/50 dark:border-zinc-800/40 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent m-0 select-none">
                GlowNotes
              </h1>
              <p className="text-[10px] sm:text-xs font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
                Premium Space
              </p>
            </div>
          </div>

          {/* Theme Switcher Button Placeholder */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-sm font-semibold flex items-center gap-2"
          >
            {isDarkMode ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 mt-8 sm:mt-12 space-y-12">
        {/* Note Form */}
        <section className="relative">
          <NoteForm
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            onSubmit={handleSubmitNote}
            onCancel={handleCancelEdit}
            isEditing={!!editingNote}
          />
        </section>

        {/* Notes Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-3">
            Your Thoughts
            <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400">
              {notes.length}
            </span>
          </h2>

          {notes.length === 0 ? (
            /* Empty State */
            <div className="w-full max-w-md mx-auto text-center py-16 px-4 glass-panel rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center text-violet-500 dark:text-violet-400 animate-pulse">
                <Sparkles size={28} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 font-display">
                  Your board is empty
                </h3>
                <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1 max-w-xs mx-auto">
                  Create your first note above to capture inspiration, tasks, or daily logs!
                </p>
              </div>
            </div>
          ) : (
            /* Notes Grid (basic cards for Commit 3) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(note => (
                <div
                  key={note.id}
                  className="glass-card p-6 rounded-2xl flex flex-col justify-between min-h-[180px] group border border-zinc-200/50 dark:border-zinc-800/40"
                >
                  <div>
                    <h3 className="text-lg font-semibold font-display text-zinc-800 dark:text-zinc-100 leading-snug">
                      {note.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-3 whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/40">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 font-medium">
                      <Calendar size={13} />
                      {formatDate(note.createdAt)}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStartEdit(note)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 dark:text-zinc-500 dark:hover:text-amber-400 transition-colors"
                        title="Edit note"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 dark:text-zinc-500 dark:hover:text-rose-400 transition-colors"
                        title="Delete note"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
