# FixHub Deployment Steps (Option A)

## Overview
- **Frontend**: Next.js → Vercel
- **Backend**: Express → Railway  
- **Estimated Time**: 10-15 minutes

---

## Step 1: Prepare Your Code (DONE ✅)

The following changes have been made:
- ✅ Frontend API client now uses `NEXT_PUBLIC_API_URL` environment variable
- ✅ Backend CORS updated to accept `FRONTEND_URL` environment variable
- ✅ Environment example files created
- ✅ Vercel configuration added

---

## Step 2: Push to GitHub

```bash
# Make sure you're on main branch
git checkout main

# Add and commit all changes
git add .
git commit -m "Prepare for production deployment"

# Push to GitHub
git push origin main
```

If you don't have a GitHub repository yet:
```bash
# Create new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/fixhub.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend to Railway

### Option 3A: Via Railway Dashboard (Recommended)
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your FixHub repository
6. Click on the new service
7. Go to **Settings** → **Root Directory** → Set to `backend`
8. Go to **Variables** tab and add:
   ```
   FRONTEND_URL=https://your-vercel-url.vercel.app
   JWT_SECRET=your-random-secret-here-make-it-long
   PORT=4000
   ```
   (Optional: Add GEMINI_API_KEY and Cloudinary keys)
9. Click **Deploy**
10. Copy your Railway URL (e.g., `https://fixhub-backend.railway.app`)

### Option 3B: Via Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Navigate to backend
cd backend

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set FRONTEND_URL=https://your-vercel-url.vercel.app
railway variables set JWT_SECRET=your-random-secret-here
railway variables set PORT=4000

# Deploy
railway up

# Get your URL
railway domain
```

---

## Step 4: Deploy Frontend to Vercel

### Option 4A: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**
4. Import your FixHub repository
5. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Add **Environment Variable**:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-backend-url.railway.app
   ```
7. Click **"Deploy"**
8. Wait for build to complete (~2 minutes)
9. Visit your live site! 🎉

### Option 4B: Via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts:
# - Set up and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: fixhub
# - Directory: ./
# - Override settings: No
# - Want to add env variables: Yes
#   - Name: NEXT_PUBLIC_API_URL
#   - Value: https://your-railway-backend-url.railway.app

# Deploy to production
vercel --prod
```

---

## Step 5: Update CORS (Important!)

After deploying frontend, update backend environment variables:

**In Railway Dashboard:**
1. Go to your backend service
2. Variables tab
3. Update `FRONTEND_URL` to your Vercel URL
4. Example: `https://fixhub-YOUR-USERNAME.vercel.app`
5. Save (Railway will auto-redeploy)

---

## Step 6: Test Your Deployment

Visit your Vercel URL and test:
- ✅ Sign up / Login
- ✅ File upload with camera
- ✅ QR code generation
- ✅ AI analysis
- ✅ Ticket creation
- ✅ History view

---

## Troubleshooting

### Issue: "Cannot connect to server"
**Solution**: Check that `NEXT_PUBLIC_API_URL` is set in Vercel environment variables

### Issue: CORS errors
**Solution**: Verify `FRONTEND_URL` in Railway matches your Vercel URL exactly (including https://)

### Issue: QR code doesn't work
**Solution**: QR codes use `window.location.origin` which should automatically work with your Vercel URL

### Issue: 500 errors from backend
**Solution**: Check Railway logs:
```bash
railway logs
```
or view logs in Railway Dashboard

### Issue: Images not uploading
**Solution**: Add Cloudinary environment variables in Railway

---

## Environment Variables Reference

### Frontend (Vercel):
| Variable | Example | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_API_URL` | `https://backend.railway.app` | Yes |

### Backend (Railway):
| Variable | Example | Required |
|----------|---------|----------|
| `FRONTEND_URL` | `https://app.vercel.app` | Yes |
| `JWT_SECRET` | `long-random-string-here` | Yes |
| `PORT` | `4000` | Yes |
| `GEMINI_API_KEY` | `your-key` | No (uses mock) |
| `CLOUDINARY_CLOUD_NAME` | `your-cloud` | No |
| `CLOUDINARY_API_KEY` | `your-key` | No |
| `CLOUDINARY_API_SECRET` | `your-secret` | No |

---

## Post-Deployment

### Get Custom Domain (Optional)
**Vercel:**
- Go to Project Settings → Domains
- Add your custom domain

**Railway:**
- Go to Settings → Domains
- Add your custom domain

### Monitor Your App
**Vercel:**
- Dashboard → Your Project → Deployments
- View logs and analytics

**Railway:**
- Dashboard → Your Service → Deployments
- View logs and metrics

---

## Cost Estimates

### Free Tier Limits:
- **Vercel**: 100GB bandwidth/month, unlimited deployments
- **Railway**: $5 free credit/month, ~500 hours of uptime

### When You'll Need to Pay:
- Vercel: After 100GB bandwidth (usually 10k+ users)
- Railway: After $5 credit (~17 days of 24/7 runtime)

---

## Quick Commands Summary

```bash
# 1. Commit and push
git add .
git commit -m "Deploy"
git push origin main

# 2. Deploy backend (Railway)
cd backend
railway login
railway init
railway up

# 3. Deploy frontend (Vercel)
cd ../frontend
vercel --prod

# 4. View your app
# Open the Vercel URL in your browser
```

---

## Need Help?

Common issues and solutions:
1. **Build fails**: Check package.json scripts
2. **Runtime errors**: Check environment variables
3. **CORS errors**: Verify FRONTEND_URL matches Vercel URL
4. **API not working**: Check NEXT_PUBLIC_API_URL

Your app should be live in ~10 minutes! 🚀

