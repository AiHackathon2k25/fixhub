# Vercel Deployment Guide for FixHub

## Current Architecture
- **Frontend**: Next.js 14 (App Router)
- **Backend**: Separate Express server on port 4000
- **Database**: MockDB (file-based JSON storage)

## Option 1: Deploy Separately (Quick & Easy) ⭐ RECOMMENDED

### Frontend (Next.js) → Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
   - **Environment Variables**: Add `NEXT_PUBLIC_API_URL=your-backend-url`

### Backend (Express) → Railway or Render
**Railway:**
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
   - Add environment variables

**Render:**
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

## Option 2: Migrate to Next.js API Routes (More Work)

### What Needs to Be Done:
1. ✅ Create `frontend/app/api/` directory structure
2. ⬜ Copy backend utilities to `frontend/lib/server/`
3. ⬜ Create Next.js API routes for:
   - `/api/auth/signup` and `/api/auth/login`
   - `/api/analyze`
   - `/api/tickets`
   - `/api/history`
   - `/api/upload-session/*`
4. ⬜ Update `frontend/lib/apiClient.ts` to use relative URLs
5. ⬜ Install backend dependencies in frontend:
   ```bash
   cd frontend
   npm install bcryptjs jsonwebtoken zod multer @google/generative-ai
   ```
6. ⬜ Handle file uploads with Next.js (requires config changes)
7. ⬜ Replace MockDB with Vercel-compatible storage (Vercel KV or database)

### Issues with Option 2:
- **MockDB won't work on Vercel** (read-only filesystem)
- Need to use Vercel KV, Postgres, or MongoDB
- File uploads need special handling
- More configuration required

## Option 3: Hybrid Approach (Best for Quick Deploy)

Keep your current setup and deploy:
1. **Frontend to Vercel** (Next.js)
2. **Backend to Railway** (Express)
3. Update `frontend/lib/apiClient.ts`:
   ```typescript
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
   ```

## Quick Deploy Commands

### Deploy Frontend to Vercel:
```bash
cd frontend
npm install -g vercel
vercel
```

Follow prompts:
- Set up and deploy: Yes
- Which scope: Your account
- Link to existing project: No
- Project name: fixhub
- Directory: ./
- Override settings: No

### Deploy Backend to Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
cd backend
railway login
railway init
railway up
```

## Environment Variables

### Frontend (Vercel):
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

### Backend (Railway/Render):
```env
JWT_SECRET=your-secure-secret-here
GEMINI_API_KEY=your-gemini-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
PORT=4000
```

## Post-Deployment Steps

1. Update CORS in `backend/src/server.ts`:
   ```typescript
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
     credentials: true,
   }));
   ```

2. Test the deployment:
   - Sign up/Login
   - Upload file
   - Generate QR code
   - Test analysis

3. Update QR code URLs in `frontend/app/components/QRCodeUpload.tsx`:
   ```typescript
   const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
   ```

## Recommendation

**I recommend Option 1 or 3** (separate deployments):
- ✅ Fastest to deploy
- ✅ No code changes needed
- ✅ Keep your existing architecture
- ✅ Easy to debug and maintain
- ✅ MockDB works as-is

**Avoid Option 2** unless you:
- Want everything in one repo
- Are ready to migrate to a real database
- Have time to rewrite all API routes

## Need Help?

Run these commands to deploy now:

```bash
# 1. Push to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main

# 2. Deploy Frontend
cd frontend
npx vercel

# 3. Deploy Backend  
cd ../backend
railway login
railway init
railway up

# 4. Update frontend env
# Add NEXT_PUBLIC_API_URL in Vercel dashboard
```

You'll have your app live in ~10 minutes! 🚀

