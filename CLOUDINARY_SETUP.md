# ☁️ Cloudinary Image Storage - Setup Guide

## 🎉 What's Been Added

FixHub now uploads and stores images on **Cloudinary** - a FREE cloud image storage service!

---

## 🆓 Get FREE Cloudinary Account

### Step 1: Sign Up (FREE, No Credit Card!)

1. **Go to:** https://cloudinary.com/users/register_free
2. **Sign up** with your email or Google account
3. **Verify your email**
4. **You get FREE tier:**
   - 25 GB storage
   - 25 GB bandwidth/month
   - 25,000 transformations/month
   - Perfect for FixHub! 🎉

---

### Step 2: Get Your API Credentials

After signing up:

1. **Go to Dashboard:** https://console.cloudinary.com/
2. You'll see your **Account Details** at the top
3. Copy these 3 values:
   ```
   Cloud Name:  your-cloud-name
   API Key:     123456789012345
   API Secret:  abcdefgh-XXXXXXXXX
   ```

**Screenshot:**
```
┌────────────────────────────────────┐
│ Account Details                    │
│                                    │
│ Cloud Name:  your-cloud-name       │
│ API Key:     123456789012345       │
│ API Secret:  ****************  [👁] │
└────────────────────────────────────┘
```

---

### Step 3: Add to Backend `.env`

Open `backend/.env` and add your Cloudinary credentials:

```env
# JWT Secret for authentication
JWT_SECRET=fixhub-dev-secret-key-change-in-production

# Google Gemini API Key for FREE AI
GEMINI_API_KEY=your-gemini-key-here

# Cloudinary for Image Storage (FREE)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Replace:**
- `your-cloud-name` with your Cloud Name
- `your-api-key` with your API Key  
- `your-api-secret` with your API Secret

---

### Step 4: Restart Backend

The backend should auto-restart. Look for:

```
✅ Cloudinary configured
📦 [MockDB] Mock MongoDB initialized
✅ Backend server running on http://localhost:4000
```

**That's it! You're done!** 🎉

---

## 🧪 Test Image Upload

### Step 1: Go to Dashboard
http://localhost:3000/dashboard

### Step 2: Upload Images
1. Click **"Choose Files"**
2. Select **2-3 images** (Ctrl+Click for multiple)
3. See files listed
4. Enter damage description
5. Click **"Analyze Damage"**

### Step 3: Watch Backend Terminal

You should see:
```
📤 [Cloudinary] Uploading 3 images...
✅ [Cloudinary] Image uploaded: https://res.cloudinary.com/...
✅ [Cloudinary] Image uploaded: https://res.cloudinary.com/...
✅ [Cloudinary] Image uploaded: https://res.cloudinary.com/...
✅ [Cloudinary] 3 images uploaded successfully
📦 [MockDB] Analysis saved for user: xxx with 3 images
```

### Step 4: View History

1. Click **"View"** on a history item
2. **See your uploaded images!** 🖼️
3. Click any image to view full size
4. Images are stored permanently on Cloudinary! ✅

---

## 🖼️ Features:

### Image Upload:
- ✅ **Multiple images** per analysis
- ✅ **5MB limit** per image
- ✅ **10 images max** per submission
- ✅ **Image formats:** JPG, PNG, GIF, WebP
- ✅ **Automatic compression** by Cloudinary
- ✅ **CDN delivery** - fast loading worldwide

### Image Display in History:
- ✅ **Thumbnail grid** (2 columns)
- ✅ **Hover effects** - border highlights
- ✅ **Click to enlarge** - opens full size in new tab
- ✅ **Responsive** - looks good on all screens
- ✅ **Loading indicator** while uploading

---

## 🆚 With vs Without Cloudinary:

| Feature | Without Cloudinary | With Cloudinary |
|---------|-------------------|-----------------|
| **Image Upload** | ❌ Not stored | ✅ Stored in cloud |
| **History Images** | ❌ Only file names | ✅ Actual images shown |
| **Persistence** | ❌ Lost | ✅ Permanent |
| **Bandwidth** | - | ✅ FREE (25GB/month) |
| **Cost** | - | ✅ $0.00 (free tier) |

---

## 📊 What Happens to Images:

```
1. User selects images → Frontend
                          ↓
2. Submit analysis    → FormData with files
                          ↓
3. Backend receives   → Multer processes upload
                          ↓
4. Upload to cloud    → Cloudinary stores images
                          ↓
5. Get URLs           → https://res.cloudinary.com/...
                          ↓
6. Save to DB         → Mock MongoDB stores URLs
                          ↓
7. Frontend loads     → GET /api/history
                          ↓
8. Display images     → <img src="cloudinary-url" />
```

---

## 🔧 Technical Details:

### Backend:
- **Multer**: Handles multipart/form-data uploads
- **Memory Storage**: Buffers files in RAM temporarily
- **Cloudinary SDK**: Uploads to cloud
- **Mock MongoDB**: Stores image URLs

### Frontend:
- **FormData API**: Sends files to backend
- **Multiple file input**: `<input type="file" multiple />`
- **Image grid**: Displays thumbnails in history
- **Click to enlarge**: Opens full size

---

## 💰 Cloudinary Free Tier:

- ✅ **Storage:** 25 GB
- ✅ **Bandwidth:** 25 GB/month
- ✅ **Transformations:** 25,000/month
- ✅ **Images:** Unlimited uploads
- ✅ **CDN:** Global fast delivery
- ✅ **No Credit Card:** Required

Perfect for FixHub! 🎊

---

## ⚠️ Important Notes:

1. **Without Cloudinary config** - analysis still works, just no images saved
2. **With Cloudinary config** - images stored permanently
3. **Images persist** even if backend restarts
4. **FREE forever** on Cloudinary free tier

---

## 🚀 Quick Start:

1. Sign up: https://cloudinary.com/users/register_free
2. Get credentials from dashboard
3. Add to `backend/.env`
4. Restart backend
5. Upload images!
6. See them in history! 🖼️

---

## 🛠️ Troubleshooting:

### "Cloudinary not configured" Warning

**Solution:** Add all 3 credentials to `.env`:
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY  
- CLOUDINARY_API_SECRET

### Images not showing in history

**Check:**
- Backend logs show "✅ [Cloudinary] X images uploaded"
- History item has `imageUrls` array
- Cloudinary dashboard shows uploaded images

### Upload fails

**Possible causes:**
- File too large (>5MB)
- Not an image file
- Cloudinary quota exceeded (unlikely with free tier)
- Invalid credentials

---

## 📁 Files Created/Modified:

### Created:
✅ `backend/src/services/cloudinaryService.ts` - Image upload service  
✅ `CLOUDINARY_SETUP.md` - This guide

### Modified:
✅ `backend/src/routes/analyze.ts` - File upload with multer  
✅ `backend/src/models/AnalysisHistory.ts` - Added imageUrls field  
✅ `backend/src/services/analysisHistoryService.ts` - Saves image URLs  
✅ `frontend/app/dashboard/page.tsx` - Sends actual files via FormData  
✅ `frontend/app/components/AnalysisHistory.tsx` - Displays images  

---

**Get your FREE Cloudinary account now and see your damage images in the history!** 🎨✨

