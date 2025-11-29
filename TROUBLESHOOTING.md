# FixHub Troubleshooting Guide

## 🔴 Problem: Login/Signup shows "Please wait..." forever

### Cause:
The backend server is not running or not responding on port 4000.

### Solution:

#### Option 1: Use the Startup Script (Easiest)
1. Double-click `START_SERVERS.bat` in the project root
2. Wait for both terminals to show "ready" messages
3. Go to http://localhost:3000

#### Option 2: Manual Start
**Terminal 1 - Backend:**
```bash
cd backend
npm install     # Only first time
npm run dev
```
Wait for: `✅ Backend server running on http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install     # Only first time
npm run dev
```
Wait for: `▲ Next.js ready on http://localhost:3000`

---

## 🧪 Test if Backend is Running

Open browser: **http://localhost:4000/health**

✅ **Working**: You should see:
```json
{"status":"ok","timestamp":"2024-..."}
```

❌ **Not Working**: "This site can't be reached" or connection error

---

## Common Errors

### 1. "Cannot connect to server" (in browser console)
**Problem**: Backend not running
**Fix**: Start backend server (see above)

### 2. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::4000
```
**Fix**: 
- Option A: Kill the process using port 4000
  ```bash
  npx kill-port 4000
  ```
- Option B: Change backend port in `backend/src/server.ts` (line 6)

### 3. "Module not found" errors
**Problem**: Dependencies not installed
**Fix**:
```bash
cd backend
npm install

cd ../frontend
npm install
```

### 4. TypeScript errors
**Problem**: TypeScript compilation issues
**Fix**: Check terminal output for specific errors

---

## Quick Health Check

Run these commands:

```bash
# Check if Node.js is installed
node --version

# Check if npm is installed
npm --version

# Check if ports are in use
netstat -ano | findstr :3000
netstat -ano | findstr :4000
```

---

## Still Not Working?

1. **Clear everything and reinstall:**
   ```bash
   # Backend
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   
   # Frontend
   cd ../frontend
   rm -rf node_modules package-lock.json .next
   npm install
   ```

2. **Check browser console** (F12) for error messages

3. **Check terminal output** for backend/frontend errors

4. **Verify file structure**:
   ```
   fixHubnew/
   ├── backend/
   │   ├── src/
   │   ├── package.json
   │   └── tsconfig.json
   └── frontend/
       ├── app/
       ├── package.json
       └── tsconfig.json
   ```

---

## Expected Behavior

### Sign Up Flow:
1. Fill in all fields (username, email, phone, password)
2. Click "Sign Up"
3. Button shows "Sending..." with spinner
4. **Success**: Automatically redirected to Dashboard
5. **Error**: Red error message appears below form

### Login Flow:
1. Fill in email and password
2. Click "Log In"
3. Button shows "Please wait..." with spinner
4. **Success**: Automatically redirected to Dashboard
5. **Error**: Red error message appears below form

---

## Debug Mode

To see detailed API calls, open browser console (F12) and look for:
- `API Request: POST http://localhost:4000/api/auth/signup`
- `API Success:` or `API Error:`

This will tell you exactly what's happening with your requests.

