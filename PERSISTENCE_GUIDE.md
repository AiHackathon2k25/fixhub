# 💾 File Persistence Guide

## ✅ What's Been Added

FixHub now **saves all data to JSON files**! Your history persists even after:
- ✅ Logging out
- ✅ Backend restart
- ✅ Browser refresh
- ✅ Computer restart

---

## 📁 Where Data is Stored

### **Location:**
```
backend/data/
├── users.json          (User accounts)
├── analysisHistory.json (All analysis history)
└── tickets.json        (Support tickets)
```

### **File Format:**
Each file contains a JSON array of documents:
```json
[
  {
    "_id": "analysisHistory_1234567890_abc123",
    "userId": "user_xxx",
    "description": "My washing machine is leaking",
    "fileNames": ["image1.jpg", "image2.jpg"],
    "imageUrls": ["https://..."],
    "result": { ... },
    "createdAt": "2025-11-29T..."
  },
  ...
]
```

---

## 🔄 How It Works

### **On Startup:**
1. Backend starts
2. Mock MongoDB loads data from JSON files
3. You see: `📂 [MockDB] Loaded X documents from analysisHistory.json`
4. All your history is restored! ✅

### **On Data Changes:**
1. You create analysis → Auto-saved to `analysisHistory.json`
2. You create ticket → Auto-saved to `tickets.json`
3. You sign up → Auto-saved to `users.json`
4. **No manual save needed!** ✅

---

## 🧪 Test Persistence

### **Test 1: Create History**
1. Login: test@fixhub.com / test123
2. Analyze 2-3 damage reports
3. Check `backend/data/analysisHistory.json` - see your data!

### **Test 2: Restart Backend**
1. Stop backend (Ctrl+C)
2. Start again: `npm run dev`
3. Login again
4. **Your history is still there!** ✅

### **Test 3: Logout & Login**
1. Logout
2. Login again
3. **History persists!** ✅

---

## 📊 What Gets Saved

| Collection | File | What's Stored |
|-----------|------|---------------|
| **users** | `users.json` | User accounts (email, password hash, etc.) |
| **analysisHistory** | `analysisHistory.json` | All damage analyses with images |
| **tickets** | `tickets.json` | Support tickets linked to analyses |

---

## 🔍 View Your Data

### **Method 1: Check Files Directly**
```bash
# Windows PowerShell
cat backend\data\analysisHistory.json

# Or open in any text editor
```

### **Method 2: Backend Logs**
When backend starts, you'll see:
```
📂 [MockDB] Created data directory: C:\...\backend\data
📦 [MockDB] Mock MongoDB initialized with file persistence
📂 [MockDB] Loaded 5 documents from analysisHistory.json
📂 [MockDB] Loaded 1 documents from users.json
📂 [MockDB] Loaded 3 documents from tickets.json
```

---

## ⚠️ Important Notes

### **Data Safety:**
- ✅ Files are in `backend/data/` directory
- ✅ Auto-saved on every change
- ✅ Human-readable JSON format
- ✅ Easy to backup (just copy the folder!)

### **Backup Your Data:**
```bash
# Copy the entire data folder
cp -r backend/data backend/data_backup

# Or on Windows:
xcopy backend\data backend\data_backup /E /I
```

### **Reset Data:**
```bash
# Delete JSON files to start fresh
rm backend/data/*.json

# Or on Windows:
del backend\data\*.json
```

---

## 🎯 Benefits

| Before | After |
|--------|-------|
| ❌ Data lost on restart | ✅ Data persists forever |
| ❌ History resets | ✅ History saved to file |
| ❌ No backup | ✅ Easy to backup JSON files |
| ❌ In-memory only | ✅ File-based storage |

---

## 📝 Example Data File

**`backend/data/analysisHistory.json`:**
```json
[
  {
    "_id": "analysisHistory_1732901234567_abc123",
    "userId": "users_1732900000000_xyz789",
    "description": "My washing machine is making loud noises",
    "fileNames": ["damage1.jpg", "damage2.jpg"],
    "imageUrls": [
      "data:image/jpeg;base64,/9j/4AAQ...",
      "https://res.cloudinary.com/..."
    ],
    "result": {
      "category": "appliance",
      "subCategory": "washing machine",
      "severity": "moderate",
      "estimatedCost": "800–1200 DKK",
      "repairOrReplace": "repair",
      "insuranceSummary": "..."
    },
    "ticketId": "tickets_1732901234568_def456",
    "createdAt": "2025-11-29T18:30:00.000Z"
  }
]
```

---

## 🚀 Migration Path

When you're ready for real MongoDB:

1. **Export current data:**
   ```bash
   # Your JSON files are already perfect!
   # Just import them into MongoDB
   ```

2. **Update code:**
   ```typescript
   // Change this:
   import { mockDB } from './mockDB';
   
   // To this:
   import { db } from './mongodb';
   
   // Same API! Everything else stays the same!
   ```

---

## ✅ Current Status

- ✅ **File persistence enabled**
- ✅ **Auto-save on every change**
- ✅ **Auto-load on startup**
- ✅ **History persists forever**
- ✅ **Easy to backup**
- ✅ **Human-readable format**

---

**Your history now persists forever! Test it by restarting the backend - your data will still be there!** 🎉

