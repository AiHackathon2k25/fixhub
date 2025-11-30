# Railway Data & Environment Variables Guide

## 🔧 Updating Environment Variables

### Via Railway Dashboard:
1. Go to [railway.app](https://railway.app) → Your Project
2. Click on your **backend service**
3. Click **Variables** tab
4. Click **+ New Variable** or edit existing ones
5. Add/Update:
   ```
   JWT_SECRET=your-secret-here
   FRONTEND_URL=https://your-vercel-app.vercel.app
   PORT=4000
   ```
6. Railway auto-redeploys when you save

### Via Railway CLI:
```bash
cd backend
railway login
railway link
railway variables set JWT_SECRET=your-secret
railway variables set FRONTEND_URL=https://your-app.vercel.app
```

## 📁 Handling Data Files

### ⚠️ Important: Railway's filesystem is ephemeral
- Data files reset on every deployment
- Use one of these solutions:

### Solution 1: Railway Volumes (Persistent Storage) ⭐ RECOMMENDED

1. In Railway Dashboard → Your Service
2. Go to **Volumes** tab
3. Click **+ New Volume**
4. Configure:
   - **Name**: `data`
   - **Mount Path**: `/app/data`
   - **Size**: 1GB (or as needed)
5. Click **Create**
6. Your `backend/data/*.json` files will now persist!

**Note**: After creating volume, you may need to:
- Redeploy your service
- Or manually copy data files to the volume

### Solution 2: Seed Data on Startup

Create a migration script that runs on startup:

```typescript
// backend/src/scripts/seedData.ts
import { mockDB } from '../mockDB';
import { initializeServiceProviders } from '../services/serviceProviderService';

export function seedInitialData() {
  // Check if data exists
  const users = mockDB.collection('users');
  if (users.countDocuments() === 0) {
    // Seed initial data
    console.log('📦 Seeding initial data...');
    initializeServiceProviders();
    // Add other seed operations
  }
}
```

Then call it in `server.ts`:
```typescript
import { seedInitialData } from './scripts/seedData';
seedInitialData();
```

### Solution 3: Use Real Database (Best for Production)

**Railway Postgres:**
1. Railway Dashboard → Your Project
2. Click **+ New** → **Database** → **Add PostgreSQL**
3. Update your code to use Postgres instead of MockDB

**MongoDB Atlas:**
1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Add to Railway variables: `MONGODB_URI=your-connection-string`
4. Update backend to use MongoDB

## 🔍 Viewing Logs

### Via Dashboard:
1. Railway Dashboard → Your Service
2. Click **Deployments** tab
3. Click on latest deployment
4. View logs in real-time

### Via CLI:
```bash
railway logs
railway logs --follow  # Follow logs in real-time
```

## 🚀 Quick Commands Reference

```bash
# Login to Railway
railway login

# Link project
cd backend
railway link

# View variables
railway variables

# Set variable
railway variables set KEY=value

# View logs
railway logs

# Open service in browser
railway open

# Get service URL
railway domain
```

## 📝 Current Data Files Location

Your data files are in: `backend/data/`
- `users.json`
- `tickets.json`
- `analysisHistory.json`
- `serviceProviders.json`
- `uploadSessions.json`

**To persist these:**
1. Use Railway Volumes (Solution 1) ✅
2. Or migrate to a database (Solution 3) ✅

## 🎯 Recommended Setup

For hackathon/demo:
1. ✅ Use Railway Volumes for data persistence
2. ✅ Set all environment variables in Railway dashboard
3. ✅ Monitor logs to ensure everything works

For production:
1. ✅ Migrate to Railway Postgres or MongoDB
2. ✅ Use proper database migrations
3. ✅ Set up backups

## 🔐 Security Notes

- **Never commit** `.env` files to Git
- Use Railway Variables for all secrets
- Generate strong `JWT_SECRET` (use: `openssl rand -base64 32`)
- Keep `FRONTEND_URL` updated when Vercel URL changes

## ❓ Troubleshooting

**Data disappears after redeploy?**
→ Use Railway Volumes (Solution 1)

**Can't see variables?**
→ Make sure you're in the correct service, not the project root

**Changes not taking effect?**
→ Check Railway logs for errors
→ Verify variable names match exactly (case-sensitive)

**Need to reset data?**
→ Delete volume and redeploy
→ Or manually edit files via Railway's file browser (if available)

