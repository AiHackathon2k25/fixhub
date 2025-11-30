# Railway Environment Variables Checklist

## ✅ REQUIRED Variables (Must Set)

These are **essential** for your backend to work:

### 1. `JWT_SECRET` ⚠️ CRITICAL
- **Purpose**: Secures authentication tokens
- **How to generate**: 
  ```bash
  openssl rand -base64 32
  ```
  Or use: https://generate-secret.vercel.app/32
- **Example**: `aB3xK9mP2qR7vN5tY8wE1uI6oA4sD0fG2hJ9kL3zX5cV8bN1mQ4wE7rT0yU3i`
- **Status**: ⚠️ **MUST SET** - Without this, authentication won't work securely

### 2. `FRONTEND_URL` ⚠️ CRITICAL
- **Purpose**: Allows CORS requests from your Vercel frontend
- **Value**: Your Vercel deployment URL
- **Example**: `https://fixhub-gilt.vercel.app`
- **Important**: 
  - Must include `https://`
  - No trailing slash
  - Update this if your Vercel URL changes
- **Status**: ⚠️ **MUST SET** - Without this, you'll get CORS errors

### 3. `PORT` ✅ OPTIONAL (but recommended)
- **Purpose**: Server port (Railway usually sets this automatically)
- **Value**: `4000`
- **Status**: Railway sets this automatically, but you can override

---

## 🔧 OPTIONAL Variables (Nice to Have)

These enhance functionality but aren't required:

### 4. `GEMINI_API_KEY` (Optional)
- **Purpose**: Enables real AI analysis (otherwise uses mock)
- **How to get**: 
  1. Go to https://makersuite.google.com/app/apikey
  2. Sign in with Google
  3. Click "Create API Key"
  4. Copy the key
- **Format**: `AIzaSy...` (long string)
- **Status**: Optional - App works with mock analysis without it

### 5. `CLOUDINARY_CLOUD_NAME` (Optional)
- **Purpose**: Cloud image storage
- **How to get**: Cloudinary dashboard
- **Status**: Optional - Images stored as base64 without it

### 6. `CLOUDINARY_API_KEY` (Optional)
- **Purpose**: Cloudinary authentication
- **How to get**: Cloudinary dashboard
- **Status**: Optional

### 7. `CLOUDINARY_API_SECRET` (Optional)
- **Purpose**: Cloudinary authentication
- **How to get**: Cloudinary dashboard
- **Status**: Optional

---

## 📋 Complete Railway Variables Setup

### Minimum Required (App works, but limited features):
```
JWT_SECRET=<generate-using-openssl>
FRONTEND_URL=https://your-vercel-app.vercel.app
PORT=4000
```

### Full Setup (All features enabled):
```
JWT_SECRET=<generate-using-openssl>
FRONTEND_URL=https://your-vercel-app.vercel.app
PORT=4000
GEMINI_API_KEY=AIzaSy...
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 🚨 Common Issues

### Issue: "Unauthorized: Invalid token"
**Cause**: `JWT_SECRET` not set or changed  
**Fix**: Set `JWT_SECRET` in Railway variables

### Issue: CORS errors
**Cause**: `FRONTEND_URL` not set or wrong  
**Fix**: Set `FRONTEND_URL` to exact Vercel URL (with https://)

### Issue: AI analysis always uses mock
**Cause**: `GEMINI_API_KEY` not set  
**Fix**: Add `GEMINI_API_KEY` (optional, but needed for real AI)

### Issue: Images not uploading
**Cause**: Cloudinary not configured  
**Fix**: Add all 3 Cloudinary variables (optional, base64 works without it)

---

## ✅ Quick Setup Checklist

- [ ] `JWT_SECRET` - Generate and set
- [ ] `FRONTEND_URL` - Your Vercel URL
- [ ] `PORT` - Set to `4000` (or let Railway auto-set)
- [ ] `GEMINI_API_KEY` - Optional, for real AI
- [ ] `CLOUDINARY_*` - Optional, for cloud image storage

---

## 🔍 How to Verify Variables Are Set

1. Railway Dashboard → Your Service → **Variables** tab
2. You should see all variables listed
3. Check that values are correct (no typos)
4. After adding/changing, Railway auto-redeploys

---

## 📝 Current Status Based on Your Code

From your `backend/env` file, you have:
- ✅ `JWT_SECRET` - Set (but use a stronger one in production!)
- ✅ `GEMINI_API_KEY` - Set
- ✅ `CLOUDINARY_*` - All set

**What you need to add in Railway:**
1. ✅ `JWT_SECRET` - Copy from your env file (or generate new)
2. ✅ `FRONTEND_URL` - Your Vercel URL (this is the missing one!)
3. ✅ `PORT` - Set to `4000`
4. ✅ `GEMINI_API_KEY` - Copy from your env file (optional)
5. ✅ `CLOUDINARY_*` - Copy from your env file (optional)

---

## 🎯 Most Likely Missing Variable

Based on the errors you're seeing, you're probably missing:

**`FRONTEND_URL`** - This is critical for CORS!

Set it to: `https://fixhub-gilt.vercel.app` (or whatever your Vercel URL is)

---

## 💡 Pro Tip

After setting variables in Railway:
1. Check Railway logs to see if server starts correctly
2. Test the `/health` endpoint: `https://your-railway-url.railway.app/health`
3. Check browser console for CORS errors
4. If CORS errors persist, verify `FRONTEND_URL` matches Vercel URL exactly

