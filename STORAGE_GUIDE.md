# 🗄️ FixHub Storage Guide

## ⚠️ Important: No Traditional Database!

FixHub uses **mock/demo storage** for the hackathon. Here's what's actually being used:

---

## 📊 Storage Systems:

### 1. **Frontend History - localStorage**

**What:**
- Browser's localStorage API
- Stores analysis history
- Persists across page refreshes
- Clears if you clear browser data

**Location:**
- Key: `fixhub_analysis_history`
- In your browser's localStorage

**Check Status:**
1. Go to dashboard: http://localhost:3000/dashboard
2. Look for **"🗄️ Storage Status"** card (top right)
3. See:
   - ✅ localStorage Available
   - Number of history items
   - Storage used (KB)
   - Last analysis timestamp

**Manual Check (Browser Console):**
```javascript
// Press F12, then in Console tab:
localStorage.getItem('fixhub_analysis_history')
```

---

### 2. **Backend Users - In-Memory**

**What:**
- Simple array in RAM
- Users stored temporarily
- **Resets when backend restarts!**

**Location:**
- File: `backend/src/userStore.ts`
- Variable: `const users: User[] = []`

**Check Status:**
- Backend terminal shows: `✅ Backend server running`
- Users exist only while backend is running
- Default user: `test@fixhub.com` is pre-loaded

**Test it:**
```bash
# Login with default user
# If it works, in-memory storage is working!
Email: test@fixhub.com
Password: test123
```

---

### 3. **AI Provider - Google Gemini**

**What:**
- External API connection (not database)
- Real-time AI analysis
- Completely FREE

**Check Status:**

Backend terminal shows:
```
✅ GEMINI_API_KEY loaded from environment
🤖 [FixHub] Using Google Gemini AI for analysis...
✅ [FixHub] AI analysis completed successfully!
```

**Test Endpoint:**
```bash
# In terminal (while logged in):
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:4000/api/debug/storage
```

---

## 🧪 How to Verify Everything Works:

### **Method 1: Visual Dashboard Check**

1. **Go to:** http://localhost:3000/dashboard
2. **Login:** test@fixhub.com / test123
3. **See "Storage Status" card** showing:
   ```
   localStorage Available: ✅ Yes
   History Items: 0 (or more)
   Storage Used: X KB
   ```

### **Method 2: Browser DevTools**

1. Press **F12** to open DevTools
2. Go to **Application tab**
3. Left sidebar: **Storage → Local Storage → http://localhost:3000**
4. Look for key: `fixhub_analysis_history`
5. See JSON data if you have history

### **Method 3: Test by Using**

1. **Analyze damage** (upload files + description)
2. **See "Storage Status"** update instantly
3. **Refresh page** - history persists ✅
4. Backend terminal shows Gemini AI logs ✅

---

## 📈 What Happens When:

| Action | What Gets Stored | Where |
|--------|------------------|-------|
| **Sign Up** | User created | Backend RAM (temporary) |
| **Log In** | JWT token | Browser localStorage (`fixhub_token`) |
| **Analyze Damage** | Analysis result | Browser localStorage (`fixhub_analysis_history`) |
| **Restart Backend** | Users reset to default | - |
| **Clear Browser Data** | History cleared | - |
| **Close Browser** | Everything persists | Reopens fine ✅ |

---

## ⚡ Quick Status Check Commands:

### **Frontend (Browser Console - F12):**

```javascript
// Check if localStorage works
typeof localStorage !== 'undefined' // Should return: true

// Check history
localStorage.getItem('fixhub_analysis_history')

// Check auth token
localStorage.getItem('fixhub_token')

// Count history items
JSON.parse(localStorage.getItem('fixhub_analysis_history') || '[]').length
```

### **Backend (Terminal):**

Look for these logs:
```
✅ JWT_SECRET loaded from environment
✅ GEMINI_API_KEY loaded from environment
✅ Backend server running on http://localhost:4000
```

---

## 🔧 Troubleshooting:

### **"Storage Status not showing"**
- Refresh the page
- Make sure you're on dashboard
- Check browser console for errors

### **"History not saving"**
- localStorage might be disabled
- Check browser privacy settings
- Try incognito/private window

### **"Backend resets users"**
- This is NORMAL! In-memory storage
- Default user always exists
- Sign-ups lost on restart (expected for demo)

### **"AI not working"**
- Check backend terminal for Gemini logs
- Verify `GEMINI_API_KEY` in `.env`
- See `GEMINI_SETUP_QUICK_START.md`

---

## 🚀 Production Recommendation:

For a real production app, replace with:

1. **Database**: PostgreSQL, MongoDB, MySQL
2. **File Storage**: AWS S3, Cloudinary, Azure Blob
3. **Auth**: Auth0, Firebase Auth, Supabase
4. **Session**: Redis, database sessions

But for now, the mock storage works perfectly for testing! ✅

---

## 📊 Current Setup Summary:

| Component | Technology | Persistent? | Production-Ready? |
|-----------|-----------|-------------|-------------------|
| **User Auth** | In-Memory Array | ❌ No | ❌ No - Use database |
| **Analysis History** | localStorage | ✅ Yes | ⚠️ Maybe - Use server DB |
| **JWT Tokens** | localStorage | ✅ Yes | ⚠️ Use HttpOnly cookies |
| **AI Analysis** | Google Gemini API | N/A | ✅ Yes - Already free & good |
| **File Upload** | Memory (not saved) | ❌ No | ❌ No - Use cloud storage |

---

**TL;DR:** No real database - everything uses mock storage. Check the "Storage Status" card on dashboard to verify it's working! 📊

