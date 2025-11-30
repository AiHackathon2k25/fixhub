# Next.js to React + Vite Migration Guide

## ✅ What's Been Completed

### Project Setup
- ✅ Vite + React + TypeScript configuration
- ✅ Tailwind CSS with custom design system
- ✅ PostCSS and Autoprefixer
- ✅ Path aliases (`@/` for `./src/`)
- ✅ All library files (auth, types, apiClient, deviceDetection, historyStore)

### Configuration Files
- ✅ `package.json` with all dependencies
- ✅ `vite.config.ts` with proxy to backend
- ✅ `tailwind.config.js` with custom colors and fonts
- ✅ `tsconfig.json` with proper TypeScript settings
- ✅ `index.html` as entry point

### Routing Setup
- ✅ React Router v6 configured in `App.tsx`
- ✅ Protected route wrapper for authentication
- ✅ Routes defined for all pages

### Styles
- ✅ Complete `globals.css` with all custom classes
- ✅ Card, button, badge, input field components
- ✅ Animations and gradients
- ✅ Soft color palette (teal, cream, slate)

## 🚧 What Needs to Be Done

### 1. Install Dependencies
```bash
cd frontend-vite
npm install
```

### 2. Create Page Components

You need to migrate these pages from `frontend/app/` to `frontend-vite/src/pages/`:

#### Required Pages:
- `Home.tsx` - Landing page (from `app/page.tsx`)
- `Login.tsx` - Login form (from `app/auth/login/page.tsx`)
- `Signup.tsx` - Signup form (from `app/auth/signup/page.tsx`)
- `Dashboard.tsx` - Main dashboard (from `app/dashboard/page.tsx`)
- `About.tsx` - About page (from `app/about/page.tsx`)
- `Contact.tsx` - Contact page (from `app/contact/page.tsx`)
- `MobileUpload.tsx` - Mobile upload page (from `app/mobile-upload/page.tsx`)

### 3. Create/Migrate Components

Copy these components from `frontend/app/components/` to `frontend-vite/src/components/`:

**Core Components:**
- `Header.tsx` / `DashboardNav.tsx`
- `Footer.tsx`
- `Logo.tsx`
- `UploadForm.tsx` ⭐ (Update: remove `'use client'`, use React Router's `useNavigate`)
- `AnalysisResultCard.tsx` ⭐
- `QRCodeUpload.tsx` ⭐
- `AnalysisHistory.tsx`
- `ClaimModal.tsx`

**Landing Page Components:**
- `HeroSection.tsx`
- `Features.tsx`
- `Testimonials.tsx`

**Auth Components:**
- `AuthForm.tsx`

**Key Changes Needed:**
1. Remove all `'use client'` directives
2. Change `import { useRouter } from 'next/navigation'` to `import { useNavigate } from 'react-router-dom'`
3. Change `import { useSearchParams } from 'next/navigation'` to `import { useSearchParams } from 'react-router-dom'`
4. Change `Link` from `next/link` to `react-router-dom`
5. Remove `next/image` → use regular `<img>` tags

### 4. Update Navigation

**Next.js:**
```tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/dashboard');

<Link href="/dashboard">Dashboard</Link>
```

**React Router:**
```tsx
import { Link, useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/dashboard');

<Link to="/dashboard">Dashboard</Link>
```

### 5. Copy Public Assets

Copy these from `frontend/public/` to `frontend-vite/public/`:
- `fixhub-logo.png`
- `favicon.ico`
- Any other static assets

### 6. Environment Variables

Create `.env` file:
```
VITE_API_URL=http://localhost:4000
```

Update `apiClient.ts` to use:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
```

### 7. Testing

Run the dev server:
```bash
npm run dev
```

Test these flows:
- [ ] Landing page loads
- [ ] Sign up / Login works
- [ ] Dashboard displays correctly
- [ ] File upload works
- [ ] QR code generation works
- [ ] Mobile upload page works
- [ ] Analysis results display
- [ ] History view works

### 8. Build for Production

```bash
npm run build
npm run preview
```

## Key Differences: Next.js vs React

| Feature | Next.js | React + Vite |
|---------|---------|--------------|
| Routing | File-based (`app/`) | Component-based (React Router) |
| Navigation | `useRouter()` | `useNavigate()` |
| Links | `<Link href="">` | `<Link to="">` |
| Images | `next/image` | `<img>` |
| Env Vars | `process.env.NEXT_PUBLIC_` | `import.meta.env.VITE_` |
| Client Components | `'use client'` directive | All client by default |
| Build Output | `.next/` | `dist/` |

## Deployment

### Frontend (Vite React)
- **Netlify**: Drag & drop the `dist/` folder
- **Vercel**: Still works great with Vite
- **Surge**: `surge dist/`

### Backend (Express)
- **Railway**: Connect GitHub repo
- **Render**: Deploy from GitHub
- **Heroku**: Git push

## Quick Migration Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Copy all page components
- [ ] Copy all shared components
- [ ] Update imports (Next → React Router)
- [ ] Remove `'use client'` directives
- [ ] Copy public assets
- [ ] Create `.env` file
- [ ] Test all features
- [ ] Build for production
- [ ] Deploy

## Need Help?

Common issues:
1. **Module not found**: Check import paths use `@/` alias
2. **Router issues**: Ensure using React Router hooks, not Next.js
3. **Styles not working**: Run `npm install` to get Tailwind
4. **API errors**: Check backend is running on port 4000

## Benefits of This Migration

✅ Lovable.dev compatible  
✅ Faster dev server (Vite is blazing fast)  
✅ Simpler deployment  
✅ No SSR complexity  
✅ Smaller bundle size  
✅ More flexible hosting options  

Good luck with the migration! 🚀

