# CORS & 502 Error Troubleshooting

## Current Errors
- ❌ CORS error on login request
- ❌ 502 Bad Gateway on preflight request
- Frontend: `https://fixhub-gilt.vercel.app`
- Backend: `https://fixhub-production.up.railway.app`

## 🔴 502 Error = Backend Not Running

A 502 error means Railway can't reach your backend. This is the root cause.

### Step 1: Check Railway Deployment Status

1. Go to [railway.app](https://railway.app) → Your Project
2. Click on your **backend service**
3. Check **Deployments** tab:
   - ✅ Should show "Active" status
   - ❌ If shows "Failed" or "Building" - that's the problem

### Step 2: Check Railway Logs

1. Railway Dashboard → Your Service → **Deployments**
2. Click on the **latest deployment**
3. View **Logs** tab
4. Look for:
   - ✅ `✅ Backend server running on port 4000`
   - ✅ `📋 Allowed CORS origins: ...`
   - ❌ Any error messages
   - ❌ "Port already in use"
   - ❌ "Cannot find module"
   - ❌ Build failures

### Step 3: Verify Environment Variables

In Railway → Variables tab, you MUST have:

```
✅ PORT=4000
✅ JWT_SECRET=<your-secret>
✅ FRONTEND_URL=https://fixhub-gilt.vercel.app
```

**Critical**: If `PORT` is not set or wrong, Railway can't route traffic!

### Step 4: Test Backend Directly

Open in browser:
```
https://fixhub-production.up.railway.app/health
```

**Expected**: `{"status":"ok","timestamp":"..."}`

**If you get 502:**
- Backend is not running
- Check Railway logs
- Verify deployment succeeded

**If you get CORS error:**
- Backend is running but CORS not configured
- Check `FRONTEND_URL` in Railway

**If you get 404:**
- Backend running but route not found
- Check Railway logs for startup errors

### Step 5: Common Railway Issues

#### Issue: Build Fails
**Check:**
- Railway → Deployments → View logs
- Look for npm install errors
- Check if `package.json` is correct
- Verify root directory is set to `backend`

#### Issue: Server Crashes on Startup
**Check logs for:**
- Missing environment variables
- Database connection errors
- Port binding errors
- Module not found errors

#### Issue: Port Not Set
**Fix:**
- Railway → Variables → Add `PORT=4000`
- Redeploy

#### Issue: Root Directory Wrong
**Fix:**
- Railway → Settings → Root Directory → Set to `backend`
- Redeploy

## 🔧 Quick Fixes

### Fix 1: Restart Backend
1. Railway → Your Service
2. Click **"Redeploy"** button
3. Wait for deployment to complete
4. Check logs

### Fix 2: Verify Build Settings
Railway should auto-detect Node.js, but verify:
- **Build Command**: (auto-detected, usually `npm install`)
- **Start Command**: Should be `npm start` or `node dist/server.js`
- **Root Directory**: `backend`

### Fix 3: Check package.json Scripts
Your `backend/package.json` should have:
```json
{
  "scripts": {
    "start": "node dist/server.js",
    "build": "tsc"
  }
}
```

## 🧪 Test Commands

### Test Backend Health:
```bash
curl https://fixhub-production.up.railway.app/health
```

### Test CORS (from browser console):
```javascript
fetch('https://fixhub-production.up.railway.app/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### Test Login Endpoint:
```bash
curl -X POST https://fixhub-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@fixhub.com","password":"test123"}'
```

## 📋 Railway Configuration Checklist

- [ ] Root Directory set to `backend`
- [ ] `PORT=4000` in variables
- [ ] `JWT_SECRET` set in variables
- [ ] `FRONTEND_URL=https://fixhub-gilt.vercel.app` in variables
- [ ] Build command works (check logs)
- [ ] Start command works (check logs)
- [ ] Server binds to `0.0.0.0` (not just `localhost`)
- [ ] Deployment shows "Active" status

## 🚨 Most Likely Issues

1. **Backend not deployed/running** (502 error)
   - Check Railway deployment status
   - Check Railway logs for errors

2. **PORT not set correctly**
   - Railway needs `PORT=4000` in variables
   - Or Railway auto-sets it (check logs)

3. **Build/Start command failing**
   - Check Railway logs
   - Verify `package.json` scripts

4. **CORS not allowing origin**
   - Set `FRONTEND_URL` in Railway
   - Must match Vercel URL exactly

## 💡 Next Steps

1. **Check Railway logs first** - This will tell you what's wrong
2. **Test `/health` endpoint** - Verify backend is running
3. **Verify environment variables** - Especially `PORT` and `FRONTEND_URL`
4. **Redeploy if needed** - Sometimes a fresh deploy fixes issues

## 🔍 Debugging Tips

### View Real-Time Logs:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and view logs
railway login
cd backend
railway logs --follow
```

### Check Deployment Status:
Railway Dashboard → Deployments → Latest → Status

### Verify Variables:
Railway Dashboard → Variables tab → Should list all your variables

---

**The 502 error is the main issue** - once that's fixed, CORS should work too!

