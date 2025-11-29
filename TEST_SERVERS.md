# Quick Server Test

## Check if servers are running:

### Test Backend (Port 4000):
Open browser: http://localhost:4000/health

Should see: `{"status":"ok","timestamp":"..."}`

### Test Frontend (Port 3000):
Open browser: http://localhost:3000

Should see: FixHub homepage

## Start Servers:

### Terminal 1 - Backend:
```bash
cd backend
npm install
npm run dev
```

Wait for: ✅ Backend server running on http://localhost:4000

### Terminal 2 - Frontend:
```bash
cd frontend
npm install  
npm run dev
```

Wait for: ▲ Next.js 14... ready on http://localhost:3000

## Common Issues:

1. **"Please wait..." forever** = Backend not running
2. **"Unauthorized" error** = Backend running but issue with auth
3. **"Network error"** = Wrong backend URL or CORS issue

