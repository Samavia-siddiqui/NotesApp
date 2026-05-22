# GlowNotes 💡

GlowNotes is a full-stack, premium-looking notes application featuring a sleek glassmorphic UI, responsive grids, persistent dark mode toggle, and smooth Framer Motion animations.

## 🔗 Live Demo
> [!IMPORTANT]
> **View Live Preview:** [👉 Click here to view the live app (Add your deployed URL here!)]()

---

## ✨ Features

- **Premium UI/UX**: Designed with vibrant gradients, glassmorphism card designs, subtle shadows, and responsive layouts.
- **Micro-Animations**: Uses `framer-motion` for entry/exit animations on note addition, edit, and delete actions.
- **Dynamic CRUD**: Seamlessly connects a React frontend with a Node.js/Express.js backend using native `fetch()` calls.
- **Dark/Light Mode**: Features a smooth sliding toggle switch that remembers your theme choice using `localStorage`.
- **In-Memory Storage**: Keep your data safe in the backend while active, making it lightweight and beginner-friendly.

---

## 🛠️ Technology Stack

**Frontend:**
- React.js (Vite compiler)
- Tailwind CSS v4 (CSS-first directives)
- Framer Motion (Animations)
- Lucide React (Icons)

**Backend:**
- Node.js & Express.js
- CORS & JSON parsing middleware

---

## 🚀 Running Locally

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/Samavia-siddiqui/NotesApp.git
cd NotesApp
```

### 2. Set Up the Backend
```bash
cd Backend
npm install
npm run dev
```
*The backend server will start on `http://localhost:5000`.*

### 3. Set Up the Frontend
Open a new terminal window at the root:
```bash
cd Frontend
npm install
npm run dev
```
*The frontend development server will start on `http://localhost:5173`.*

---

## 🌐 How to Deploy to a Live Link

To deploy this project to the web for free and share the link on GitHub, follow these instructions:

### Step 1: Deploy the Backend to Render
1. Go to [Render](https://render.com/) and log in using your GitHub account.
2. Click **New** > **Web Service**.
3. Connect your `NotesApp` repository.
4. Set the following configurations:
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **Deploy**. Render will generate a live URL for your backend (e.g., `https://notesapp-backend.onrender.com`).

### Step 2: Deploy the Frontend to Vercel
1. Go to [Vercel](https://vercel.com/) and log in using your GitHub account.
2. Click **Add New** > **Project** and import your `NotesApp` repository.
3. Set the following configurations:
   - **Root Directory**: `Frontend`
   - **Framework Preset**: `Vite`
   - **Environment Variables**: Add a new environment variable:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://your-backend.onrender.com/api/notes` *(replace with your actual Render backend URL)*
4. Click **Deploy**. Vercel will build your frontend and generate a live URL (e.g., `https://notesapp.vercel.app`).

### Step 3: Add the Link to your GitHub Repo Page
1. Go to your GitHub repository: [https://github.com/Samavia-siddiqui/NotesApp](https://github.com/Samavia-siddiqui/NotesApp)
2. In the top-right corner of the repository homepage, click the **Gear Icon ⚙️** next to **About**.
3. Enter your live Vercel link into the **Website** field and check the **Use your GitHub Pages website** option if desired.
4. Update the **Live Demo** link at the top of this `README.md` file and push it to GitHub!
