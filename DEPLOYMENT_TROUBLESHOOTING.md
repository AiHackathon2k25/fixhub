# FixHub Deployment Troubleshooting Guide

## 🔴 Error: "Failed to execute 'json' on 'Response': Unexpected end of JSON input"

This error means your frontend can't connect to your backend properly. Follow these steps:

---

## ✅ Step 1: Verify Environment Variables in Vercel

1. Go to [vercel.com](https://vercel.com) → Your Project
2. Click **Settings** → **Environment Variables**
3. Verify `NEXT_PUBLIC_API_URL` is set to your Railway backend URL
   - Example: `https://fixhub-production.up.railway.app`
   - **Important**: No trailing slash!
4. Make sure it's set for **Production** environment
5. **Redeploy** your Vercel app after adding/changing variables

---

## ✅ Step 2: Verify Backend is Running on Railway

1. Go to [railway.app](https://railway.app) → Your Backend Service
2. Check **Deployments** tab - should show "Active"
3. Click on the service → **Settings** → **Networking**
4. Copy your **Public Domain** (e.g., `https://fixhub-production.up.railway.app`)
5. Test the backend directly:
   - Open: `https://your-railway-url.railway.app/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

---

## ✅ Step 3: Verify CORS Configuration

**In Railway Variables**, make sure you have:
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

**Important**: 
- Must match your Vercel URL exactly (including `https://`)
- No trailing slash
- Update this if your Vercel URL changes

---

## ✅ Step 4: Check Railway Logs

1. Railway Dashboard → Your Service → **Deployments**
2. Click latest deployment → View logs
3. Look for:
   - ✅ `Backend server running on port 4000`
   - ✅ `Collection 'users' created`
   - ❌ Any error messages

---

## ✅ Step 5: Test Backend Endpoints Directly

Open these URLs in your browser (replace with your Railway URL):

```
# Health check
https://your-railway-url.railway.app/health

# Should return: {"status":"ok","timestamp":"..."}
```

If health check fails:
- Backend isn't running
- Check Railway logs for errors
- Verify `PORT=4000` is set in Railway variables

---

## ✅ Step 6: Test Login Endpoint

Use curl or Postman to test:

```bash
curl -X POST https://your-railway-url.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@fixhub.com","password":"test123"}'
```

**Expected response:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "test@fixhub.com",
    "username": "...",
    "phone": "..."
  }
}
```

**If you get CORS error:**
- Update `FRONTEND_URL` in Railway to match your Vercel URL
- Redeploy backend

**If you get 404:**
- Check Railway logs
- Verify backend routes are working

---

## ✅ Step 7: Create Test User (if needed)

If you don't have a test user, sign up first:

1. Go to your Vercel app → Sign Up page
2. Create an account
3. Or use Railway logs to see if user was created

---

## 🔍 Common Issues & Solutions

### Issue 1: "Cannot connect to server"
**Cause**: `NEXT_PUBLIC_API_URL` not set in Vercel  
**Fix**: Add environment variable in Vercel dashboard

### Issue 2: CORS errors in browser console
**Cause**: `FRONTEND_URL` in Railway doesn't match Vercel URL  
**Fix**: Update `FRONTEND_URL` in Railway variables

### Issue 3: 404 Not Found
**Cause**: Backend routes not deployed correctly  
**Fix**: Check Railway logs, verify backend is running

### Issue 4: Empty response / JSON parse error
**Cause**: Backend returning error without JSON  
**Fix**: Check Railway logs for backend errors

### Issue 5: "Invalid email or password"
**Cause**: User doesn't exist  
**Fix**: Sign up first, or check Railway logs for user creation

---

## 🧪 Quick Debug Checklist

- [ ] `NEXT_PUBLIC_API_URL` set in Vercel? (Check Settings → Environment Variables)
- [ ] Backend URL accessible? (Test `/health` endpoint)
- [ ] `FRONTEND_URL` set in Railway? (Must match Vercel URL exactly)
- [ ] Backend logs show server running? (Check Railway logs)
- [ ] Test user exists? (Try signup first)
- [ ] CORS configured? (Check `backend/src/server.ts`)

---

## 📝 Example Working Configuration

### Vercel Environment Variables:
```
NEXT_PUBLIC_API_URL=https://fixhub-production.up.railway.app
```

### Railway Environment Variables:
```
FRONTEND_URL=https://fixhub-aihackathon2k25.vercel.app
JWT_SECRET=your-generated-secret-here
PORT=4000
```

---

## 🚀 Quick Fix Steps

1. **Get your Railway backend URL:**
   - Railway → Service → Settings → Networking → Public Domain

2. **Add to Vercel:**
   - Vercel → Project → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = your Railway URL
   - Redeploy

3. **Update Railway CORS:**
   - Railway → Variables → `FRONTEND_URL` = your Vercel URL
   - Save (auto-redeploys)

4. **Test:**
   - Visit your Vercel app
   - Try login again

---

## 💡 Still Not Working?

1. **Check browser console** (F12) for detailed errors
2. **Check Network tab** to see the actual API request/response
3. **Check Railway logs** for backend errors
4. **Verify URLs match exactly** (no typos, correct protocol)

---

## 📞 Need More Help?

Check these files:
- `frontend/lib/apiClient.ts` - API client configuration
- `backend/src/server.ts` - CORS and server setup
- Railway logs - Backend errors
- Vercel deployment logs - Frontend build errors

