import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Calendar, Sparkles } from 'lucide-react';
import { getAutoEmoji } from '../utils/emojiHelper';

export default function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get auto emoji — returns '' if title already starts with an emoji
  const autoEmoji = getAutoEmoji(note.title);

  // Full display title: prepend emoji only if title doesn't already have one
  const displayTitle = autoEmoji
    ? `${autoEmoji} ${note.title || 'Untitled Note'}`
    : (note.title || 'Untitled Note');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="glass-card p-6 rounded-2xl flex flex-col justify-between min-h-[200px] border border-zinc-200/50 dark:border-zinc-800/40 relative overflow-hidden group/card"
    >
      {/* Decorative gradient corner effect on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none" />

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold font-display text-zinc-800 dark:text-zinc-100 leading-snug group-hover/card:text-violet-600 dark:group-hover/card:text-violet-400 transition-colors duration-300">
            {displayTitle}
          </h3>
          {/* Subtle star decoration on hover */}
          <Sparkles size={14} className="text-violet-400/0 group-hover/card:text-violet-400/40 transition-colors duration-500 mt-1 shrink-0" />
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {note.content}
        </p>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/40">
        <span className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 font-medium">
          <Calendar size={13} />
          {formatDate(note.createdAt)}
        </span>

        <div className="flex items-center gap-1">
          {/* Edit Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(note)}
            className="p-2 rounded-xl text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 dark:text-zinc-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
            title="Edit note"
          >
            <Edit2 size={15} />
          </motion.button>

          {/* Delete Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(note.id)}
            className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 dark:text-zinc-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
            title="Delete note"
          >
            <Trash2 size={15} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
