# FixHub - Damage Triage SaaS MVP

A full-featured damage-triage SaaS demo for insurance claims with authentication, protected routes, and ticket management.

## Project Structure

```
/backend     - Node.js + Express + TypeScript server (JWT auth, Zod validation)
/frontend    - Next.js + React + TypeScript + Tailwind CSS app
```

## Features

### Authentication
- 🔐 User sign up with email/password
- 🔑 User login with JWT tokens
- 🛡️ Protected routes requiring authentication
- 🚪 Logout functionality

### Damage Analysis
- 📸 Upload image of damaged item
- 📝 Enter damage description
- 🤖 Get mock AI analysis including:
  - Category and subcategory
  - Severity level (minor/moderate/severe)
  - Estimated repair cost
  - Repair or replace recommendation
  - Detailed insurance claim summary
- 👁️ Preview full claim details in modal

### Ticket Management
- 🎫 Create tickets from analysis results
- 📤 Send tickets to company (mocked Zendesk integration)
- 💾 Tickets stored in-memory (backend)
- ✅ Success/error feedback

## Setup & Running

### Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional - defaults provided):
```bash
# The backend will use fallback values if .env is not created
# JWT_SECRET=your-super-secret-jwt-key
# PORT=4000
```

4. Start the development server:
```bash
npm run dev
```

Backend will run on **http://localhost:4000**

#### Backend API Endpoints

**Public:**
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login and receive JWT token

**Protected (require Authorization header):**
- `GET /api/auth/me` - Get current user info
- `POST /api/analyze` - Analyze damage description
- `POST /api/tickets` - Create and send ticket
- `GET /api/tickets` - List user's tickets

### Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on **http://localhost:3000**

## Usage Flow

### First Time Users

1. Open **http://localhost:3000** in your browser
2. Click **"Sign Up"** in the header or landing page
3. Enter email and password (min 6 characters)
4. Confirm password
5. Submit - you'll be automatically logged in and redirected to dashboard

### Returning Users

1. Open **http://localhost:3000**
2. Click **"Log In"**
3. Enter your credentials
4. Submit - redirected to dashboard

### Analyzing Damage

1. On the dashboard, you'll see the damage analysis form
2. **Upload an image** of the damaged item (required for UI, not sent to backend)
3. **Enter a description** (min 5 characters), try:
   - "dishwasher door fell off and won't close"
   - "phone screen cracked after dropping it"
   - "water leak from pipe connection"
   - Any other description for default response
4. Click **"Analyze Damage"**
5. View the analysis result card showing:
   - Category and subcategory
   - Severity badge (color-coded)
   - Estimated cost
   - Repair vs Replace recommendation
   - Summary preview

### Viewing & Sending Claims

1. Click **"Preview Full Claim"** to see the complete insurance summary in a modal
2. Click **"Send Ticket to Company"** to:
   - Create a ticket with the analysis
   - Send to Zendesk (currently mocked - logs to backend console)
   - See success confirmation message

### Logging Out

- Click **"Log Out"** in the header to clear your session

## Technology Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Zod** for client-side validation
- **localStorage** for JWT storage (hackathon demo - see security notes)

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **JWT (jsonwebtoken)** for authentication
- **bcryptjs** for password hashing
- **Zod** for request validation
- **CORS** enabled for localhost:3000

## Mock Analysis Logic

The backend provides different mock responses based on keywords in the description:

- **"dishwasher"** → Appliance/Dishwasher, Moderate severity, 600-900 DKK
- **"phone" or "screen"** → Electronics/Smartphone, Severe severity, 1200-2000 DKK
- **"leak" or "water"** → VVS/Pipe leak, Moderate severity, 800-1500 DKK
- **Default** → Appliance/General, Minor severity, 400-800 DKK

## Architecture Notes

### Authentication Flow
1. User submits credentials to `/api/auth/signup` or `/api/auth/login`
2. Backend validates with Zod, hashes password (signup), compares hash (login)
3. Backend generates JWT with `userId` payload
4. Frontend stores JWT in localStorage
5. Frontend includes JWT in `Authorization: Bearer <token>` header for protected routes
6. Backend middleware validates JWT and attaches user to request

### In-Memory Storage
⚠️ **Hackathon Demo Only** - The following use in-memory storage and will be lost on server restart:
- User accounts (`backend/src/userStore.ts`)
- Tickets (`backend/src/routes/tickets.ts`)

In production, these would use a proper database (PostgreSQL, MongoDB, etc.)

### Zendesk Integration (Stub)
The `sendTicketToZendesk()` function in `backend/src/zendeskStub.ts` currently:
- Logs ticket details to console
- Simulates API delay (100ms)
- Includes commented example of real Zendesk API integration

To implement real Zendesk:
1. Get Zendesk API credentials
2. Uncomment and configure the fetch call in `zendeskStub.ts`
3. Add environment variables for Zendesk URL and auth token

## Security Notes

### For Hackathon Demo
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ Input validation with Zod
- ⚠️ JWT stored in localStorage (XSS vulnerable)
- ⚠️ In-memory storage (data lost on restart)

### For Production
Would need:
- HttpOnly cookies for JWT storage
- Refresh token rotation
- Proper database with migrations
- Rate limiting on auth endpoints
- HTTPS/TLS encryption
- Environment-based configuration
- Session management
- CSRF protection
- Input sanitization
- Logging and monitoring

## Development Scripts

### Backend
```bash
npm run dev    # Start development server with hot reload
npm run build  # Compile TypeScript to dist/
npm start      # Run compiled JavaScript from dist/
```

### Frontend
```bash
npm run dev    # Start Next.js development server
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

## Troubleshooting

### "Unauthorized" errors
- Make sure you're logged in
- Check that JWT token is present in localStorage (browser DevTools → Application → Local Storage)
- Token may have expired (1 day expiry) - log in again

### Backend not connecting
- Verify backend is running on port 4000
- Check terminal for error messages
- Ensure no other service is using port 4000

### Frontend not connecting to backend
- Verify backend is running
- Check browser console for CORS errors
- Frontend expects backend at `http://localhost:4000`

## Testing Examples

Try these test scenarios:

1. **Sign up flow:**
   - Email: `test@example.com`
   - Password: `test123456`

2. **Appliance damage:**
   - Description: "dishwasher door dropped and hinge is bent"
   - Expected: Moderate severity, repair recommendation

3. **Electronics damage:**
   - Description: "phone screen is completely shattered"
   - Expected: Severe severity, replace recommendation

4. **VVS damage:**
   - Description: "water leak coming from pipe connection"
   - Expected: Moderate severity, repair recommendation

## Future Enhancements

- Real database integration (PostgreSQL/MongoDB)
- Actual Zendesk API integration
- Image upload to storage (S3, CloudFlare R2)
- Real AI/ML damage analysis (OpenAI Vision, Google Cloud Vision)
- Multi-factor authentication
- Email verification
- Password reset flow
- User profile management
- Ticket history page
- Admin dashboard
- Real-time notifications
- File attachments
- Mobile app (React Native)

---

**Built for hackathon demonstration purposes. Not for production use without proper security hardening and infrastructure.**

#   f i x h u b  
 