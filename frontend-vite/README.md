# FixHub - React + Vite Version

This is the React + Vite migration of FixHub for Lovable.dev compatibility.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend-vite/
├── src/
│   ├── main.tsx          # Entry point
│   ├── App.tsx           # Router setup
│   ├── components/       # React components (to be migrated)
│   ├── pages/            # Page components
│   ├── lib/              # Utilities (auth, API, types)
│   └── styles/           # Global CSS & Tailwind
├── public/               # Static assets
└── index.html            # HTML template
```

## 🔄 Migration Status

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed migration instructions.

### ✅ Completed
- Project setup with Vite
- TypeScript configuration
- Tailwind CSS with custom design system
- React Router setup
- All utility libraries (auth, API client, types)
- Basic page structure

### 🚧 To Do
- Migrate all components from Next.js
- Copy public assets
- Complete page implementations
- Test all features

## 🛠️ Tech Stack

- **React** 18.2
- **Vite** 5.0
- **TypeScript** 5.2
- **React Router** 6.20
- **Tailwind CSS** 3.3
- **QRCode.react** 3.1

## 📝 Key Differences from Next.js

- Uses React Router instead of file-based routing
- No `'use client'` directives needed
- Environment variables use `VITE_` prefix
- All components are client-side by default

## 🌐 Backend

The backend (Express + MockDB) remains unchanged at `http://localhost:4000`

## 📚 Documentation

- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Complete migration guide
- [../DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) - Design system documentation

## 🚢 Deployment

Compatible with:
- Lovable.dev ✅
- Vercel
- Netlify
- Surge
- Any static hosting

---

**Note:** This is a work-in-progress migration. See MIGRATION_GUIDE.md for what needs to be completed.

