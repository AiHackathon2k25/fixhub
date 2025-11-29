# FixHub - Quick Start Guide

Get FixHub running in 3 minutes!

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup

### 1. Start Backend (Terminal 1)

```bash
cd backend
npm install
npm run dev
```

✅ You should see: `Backend server running on http://localhost:4000`

### 2. Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

✅ You should see: `- Local: http://localhost:3000`

### 3. Open Browser

Navigate to **http://localhost:3000**

## Test the Application

### Create Account
1. Click "Sign Up"
2. Email: `demo@fixhub.com`
3. Password: `demo123456`
4. Confirm password: `demo123456`
5. Click "Sign Up"

### Analyze Damage
1. Upload any image file
2. Description: `"dishwasher door fell off"`
3. Click "Analyze Damage"
4. View results

### Send Ticket
1. Click "Preview Full Claim" to see details
2. Click "Send Ticket to Company"
3. Check backend terminal - you'll see the ticket logged

### Logout & Login
1. Click "Log Out" in header
2. Click "Log In"
3. Enter your credentials
4. Access dashboard again

## Test Cases

Try these descriptions for different results:

| Description | Expected Result |
|------------|----------------|
| "dishwasher door broke" | Appliance, Moderate, Repair |
| "phone screen cracked" | Electronics, Severe, Replace |
| "water leak in pipe" | VVS, Moderate, Repair |
| "broken lamp" | Appliance, Minor, Repair (default) |

## Troubleshooting

**Backend won't start?**
- Kill any process using port 4000: `npx kill-port 4000` (Windows/Mac/Linux)

**Frontend won't start?**
- Kill any process using port 3000: `npx kill-port 3000`

**Can't log in after signup?**
- Check backend terminal for error messages
- Clear browser localStorage: DevTools → Application → Local Storage → Clear

**"Unauthorized" error?**
- Log out and log back in (token may have expired)

## Architecture

```
Frontend (Next.js) ─────HTTP────> Backend (Express)
     │                               │
     │ JWT in localStorage            │ JWT validation
     │                               │
     └─ React Components            └─ Protected Routes
        └─ Tailwind Styling            └─ Zod Validation
                                       └─ In-memory Storage
```

## API Endpoints

### Public
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Get JWT token

### Protected (need `Authorization: Bearer <token>`)
- `GET /api/auth/me` - Current user
- `POST /api/analyze` - Analyze damage
- `POST /api/tickets` - Create ticket
- `GET /api/tickets` - List tickets

## Next Steps

- Check `README.md` for full documentation
- Explore the codebase
- Add real AI integration
- Connect to Zendesk
- Deploy to production

---

**Happy hacking! 🚀**

