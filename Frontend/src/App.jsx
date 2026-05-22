import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './App.css';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form input states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  const API_URL = 'http://localhost:5000/api/notes';

  // Fetch all notes from API
  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch notes.');
      const data = await response.json();
      setNotes(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server. Please make sure it is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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

  // Add or Update Note via API
  const handleSubmitNote = async () => {
    try {
      if (editingNote) {
        const response = await fetch(`${API_URL}/${editingNote.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        });
        if (!response.ok) throw new Error('Failed to update note.');
        const updatedNote = await response.json();
        setNotes(prev =>
          prev.map(note => note.id === updatedNote.id ? updatedNote : note)
        );
        setEditingNote(null);
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        });
        if (!response.ok) throw new Error('Failed to add note.');
        const newNote = await response.json();
        setNotes(prev => [newNote, ...prev]);
      }
      // Reset form
      setTitle('');
      setContent('');
      setError(null);
    } catch (err) {
      console.error(err);
      setError(editingNote ? 'Failed to update note.' : 'Failed to add note.');
    }
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

  // Delete note via API
  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete note.');
      setNotes(prev => prev.filter(note => note.id !== id));
      if (editingNote && editingNote.id === id) {
        handleCancelEdit();
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to delete note. Backend server may be offline.');
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
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-3">
              Your Thoughts
              <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400">
                {notes.length}
              </span>
            </h2>
            {isLoading && (
              <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            )}
          </div>

          {error && (
            <div className="w-full p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium flex items-center justify-between">
              <span>{error}</span>
              <button 
                onClick={() => setError(null)} 
                className="px-2 py-1 rounded hover:bg-rose-500/20 cursor-pointer transition-colors"
              >
                Dismiss
              </button>
            </div>
          )}

          {isLoading && notes.length === 0 ? (
            /* Loading Spinner (initial load) */
            <div className="w-full text-center py-16 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium">Fetching notes...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {notes.length === 0 ? (
                /* Empty State */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md mx-auto text-center py-16 px-4 glass-panel rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center space-y-4"
                >
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
                </motion.div>
              ) : (
                /* Notes Grid */
                <motion.div
                  key="grid"
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {notes.map(note => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={handleStartEdit}
                        onDelete={handleDeleteNote}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </section>
      </main>
    </div>
  );
}
