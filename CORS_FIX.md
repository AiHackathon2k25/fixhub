# CORS Error Fix Guide

## Current Issue
- Frontend: `https://fixhub-gilt.vercel.app`
- Backend: `https://fixhub-production.up.railway.app`
- Error: CORS error + 502 on preflight

## Step-by-Step Fix

### 1. Verify Backend is Running
Test your backend directly:
```
https://fixhub-production.up.railway.app/health
```

**If this doesn't work:**
- Backend might be down
- Check Railway logs
- Verify deployment is active

### 2. Set FRONTEND_URL in Railway
Go to Railway → Your Service → Variables:
```
FRONTEND_URL=https://fixhub-gilt.vercel.app
```

**Important:**
- Must match your Vercel URL exactly
- Include `https://`
- No trailing slash

### 3. Verify CORS Configuration
The backend should allow:
- `https://fixhub-gilt.vercel.app`
- Any `.vercel.app` domain

### 4. Check Railway Logs
Look for:
- ✅ "Backend server running on port..."
- ❌ Any CORS-related errors
- ❌ Port binding errors

### 5. Redeploy Backend
After setting FRONTEND_URL:
- Railway auto-redeploys
- Wait 1-2 minutes
- Test again

## Quick Test Commands

### Test Backend Health:
```bash
curl https://fixhub-production.up.railway.app/health
```

### Test CORS (from browser console):
```javascript
fetch('https://fixhub-production.up.railway.app/health', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

## Common Issues

### 502 Bad Gateway
- Backend not running
- Wrong port configuration
- Check Railway logs

### CORS Error
- FRONTEND_URL not set in Railway
- FRONTEND_URL doesn't match Vercel URL exactly
- Backend CORS config not allowing origin

### Preflight Fails
- OPTIONS request not handled
- CORS middleware not working
- Backend crashed on startup

