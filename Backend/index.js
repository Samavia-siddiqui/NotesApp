const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing middlewares
app.use(cors());
app.use(express.json());

// In-memory database array for storing notes
let notes = [
  {
    id: '1',
    title: '📋 Today\'s Task List',
    content: 'Morning workout (30 mins)\nReply to pending emails\nTeam standup at 10 AM\nReview pull requests on GitHub\nLunch break — go outside!\nFinish the project report\nRead for 20 mins before bed',
    createdAt: Date.now() - 3600000 * 2
  },
  {
    id: '2',
    title: '🛒 Weekly Grocery List',
    content: 'Almond milk, avocados, dark chocolate (85%), organic eggs, sourdough bread, fresh spinach, and single-origin coffee beans.',
    createdAt: Date.now() - 3600000 * 24
  }
];

// GET: Fetch all notes
app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
});

// POST: Add a new note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  
  if (!title && !content) {
    return res.status(400).json({ error: 'Title or content is required.' });
  }

  const newNote = {
    id: Date.now().toString(),
    title: title?.trim() || 'Untitled Note',
    content: content?.trim() || '',
    createdAt: Date.now()
  };

  // Prepend to array so the newest note appears first
  notes.unshift(newNote);
  res.status(201).json(newNote);
});

// PUT: Update an existing note
app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const noteIndex = notes.findIndex(n => n.id === id);
  
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  if (!title && !content) {
    return res.status(400).json({ error: 'Title or content is required to update.' });
  }

  const updatedNote = {
    ...notes[noteIndex],
    title: title !== undefined ? title.trim() : notes[noteIndex].title,
    content: content !== undefined ? content.trim() : notes[noteIndex].content
  };

  notes[noteIndex] = updatedNote;
  res.status(200).json(updatedNote);
});

// DELETE: Remove a note
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const noteExists = notes.some(n => n.id === id);

  if (!noteExists) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  notes = notes.filter(n => n.id !== id);
  res.status(200).json({ message: 'Note deleted successfully.', id });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('GlowNotes API is running smoothly.');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
