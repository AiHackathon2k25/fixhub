# FixHub - Complete Project Structure

```
fixHubnew/
│
├── README.md                           # Complete documentation
├── QUICKSTART.md                       # 3-minute setup guide
├── PROJECT_STRUCTURE.md                # This file
│
├── backend/                            # Express + TypeScript API
│   ├── package.json                    # Dependencies: express, jwt, bcryptjs, zod, cors
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── .env.example                    # Environment variables template
│   ├── .gitignore                      # Git ignore rules
│   │
│   └── src/
│       ├── server.ts                   # Main Express app (CORS, routes, port 4000)
│       ├── userStore.ts                # In-memory user storage (hackathon only)
│       ├── mockAnalysis.ts             # Mock damage analysis logic
│       ├── zendeskStub.ts              # Zendesk integration stub
│       │
│       ├── types/
│       │   ├── analysis.ts             # AnalysisResult interface
│       │   ├── user.ts                 # User interface
│       │   └── ticket.ts               # Ticket interface
│       │
│       ├── middleware/
│       │   └── authMiddleware.ts       # JWT verification middleware
│       │
│       └── routes/
│           ├── auth.ts                 # POST /signup, /login, GET /me
│           ├── analyze.ts              # POST /analyze (protected)
│           └── tickets.ts              # POST /tickets, GET /tickets (protected)
│
└── frontend/                           # Next.js + React + Tailwind
    ├── package.json                    # Dependencies: next, react, zod, tailwind
    ├── tsconfig.json                   # TypeScript configuration
    ├── next.config.mjs                 # Next.js configuration
    ├── tailwind.config.mjs             # Tailwind CSS configuration
    ├── postcss.config.mjs              # PostCSS configuration
    ├── .eslintrc.cjs                   # ESLint configuration
    ├── .gitignore                      # Git ignore rules
    │
    ├── public/
    │   ├── favicon.ico                 # Favicon
    │   └── logo.svg                    # FixHub logo
    │
    ├── lib/
    │   ├── types.ts                    # Shared TypeScript types
    │   ├── auth.ts                     # Auth helpers (token management)
    │   └── apiClient.ts                # API helpers (fetch with JWT)
    │
    └── app/                            # Next.js App Router
        ├── layout.tsx                  # Root layout with Header
        ├── page.tsx                    # Landing page (redirects if logged in)
        │
        ├── styles/
        │   └── globals.css             # Tailwind imports + global styles
        │
        ├── auth/
        │   ├── login/
        │   │   └── page.tsx            # Login page
        │   └── signup/
        │       └── page.tsx            # Signup page
        │
        ├── dashboard/
        │   └── page.tsx                # Protected dashboard (analyze + ticket)
        │
        └── components/
            ├── Header.tsx              # Global header with nav & logout
            ├── Footer.tsx              # Global footer
            ├── AuthForm.tsx            # Reusable login/signup form
            ├── ProtectedClient.tsx     # Client-side auth guard
            ├── UploadForm.tsx          # Image + description upload form
            ├── AnalysisResultCard.tsx  # Display analysis results
            ├── ClaimModal.tsx          # Modal for full claim preview
            └── ComingSoonModal.tsx     # Modal for future features (unused now)
```

## File Purposes

### Backend Core
- **server.ts**: Express app setup, middleware, route mounting, server start
- **userStore.ts**: In-memory user array with create/find functions
- **mockAnalysis.ts**: Keyword-based mock analysis generator
- **zendeskStub.ts**: Placeholder for future Zendesk API integration

### Backend Auth System
- **routes/auth.ts**: User signup/login endpoints with JWT generation
- **middleware/authMiddleware.ts**: JWT verification, attaches user to req
- **types/user.ts**: User and UserResponse interfaces

### Backend Analysis & Tickets
- **routes/analyze.ts**: Protected endpoint for damage analysis
- **routes/tickets.ts**: Protected endpoints for ticket creation/listing
- **types/analysis.ts**: AnalysisResult type definition
- **types/ticket.ts**: Ticket type definition

### Frontend Auth System
- **lib/auth.ts**: Token storage in localStorage (getToken, setToken, clearToken)
- **lib/apiClient.ts**: Fetch helpers with automatic JWT injection
- **components/AuthForm.tsx**: Reusable form for login/signup with Zod validation
- **components/ProtectedClient.tsx**: HOC that redirects to login if not authenticated

### Frontend Pages
- **app/page.tsx**: Landing page with "How It Works" and CTA buttons
- **app/auth/login/page.tsx**: Login form page
- **app/auth/signup/page.tsx**: Signup form page
- **app/dashboard/page.tsx**: Main app - upload, analyze, send ticket

### Frontend Components
- **Header.tsx**: Navigation bar with conditional login/logout buttons
- **Footer.tsx**: Simple footer with disclaimer
- **UploadForm.tsx**: File + description input with validation
- **AnalysisResultCard.tsx**: Display results with action buttons
- **ClaimModal.tsx**: Modal showing full insurance summary
- **ComingSoonModal.tsx**: Generic info modal (not currently used)

## Data Flow

### Authentication Flow
```
User submits credentials
    ↓
Frontend validates (Zod)
    ↓
POST /api/auth/signup or /login
    ↓
Backend validates (Zod)
    ↓
Backend hashes password (bcrypt)
    ↓
Backend generates JWT
    ↓
Frontend stores JWT (localStorage)
    ↓
Frontend includes JWT in future requests
```

### Analysis Flow
```
User uploads image + description
    ↓
Frontend validates locally
    ↓
POST /api/analyze with JWT
    ↓
Backend verifies JWT (authMiddleware)
    ↓
Backend validates description (Zod)
    ↓
Backend calls mockAnalysis(description)
    ↓
Backend returns AnalysisResult
    ↓
Frontend displays result card
```

### Ticket Flow
```
User clicks "Send Ticket"
    ↓
POST /api/tickets with analysis + description + JWT
    ↓
Backend verifies JWT
    ↓
Backend validates payload (Zod)
    ↓
Backend creates Ticket object
    ↓
Backend stores in memory
    ↓
Backend calls sendTicketToZendesk() stub
    ↓
Backend returns success
    ↓
Frontend shows success message
```

## Key Technologies

| Technology | Purpose | Location |
|-----------|---------|----------|
| **Express** | HTTP server | Backend |
| **jsonwebtoken** | JWT auth | Backend |
| **bcryptjs** | Password hashing | Backend |
| **Zod** | Validation | Both |
| **CORS** | Cross-origin requests | Backend |
| **Next.js 14** | React framework | Frontend |
| **App Router** | File-based routing | Frontend |
| **Tailwind CSS** | Styling | Frontend |
| **localStorage** | JWT storage | Frontend |
| **TypeScript** | Type safety | Both |

## Environment Variables

### Backend (.env)
```env
JWT_SECRET=your-secret-key
PORT=4000
```

### Frontend
None required - API URL hardcoded to `http://localhost:4000`

## Development Workflow

1. **Start backend**: `cd backend && npm run dev`
2. **Start frontend**: `cd frontend && npm run dev`
3. **Test signup**: Create account at http://localhost:3000/auth/signup
4. **Test analysis**: Upload + describe damage at /dashboard
5. **Test ticket**: Click "Send Ticket to Company"
6. **Check logs**: See Zendesk stub output in backend terminal

## Production Readiness Checklist

Current state: ❌ Not production ready

To make production ready:
- [ ] Replace in-memory storage with database (PostgreSQL/MongoDB)
- [ ] Move JWT from localStorage to HttpOnly cookies
- [ ] Add refresh token rotation
- [ ] Implement rate limiting
- [ ] Add input sanitization
- [ ] Set up proper logging (Winston, Pino)
- [ ] Add monitoring (Sentry, DataDog)
- [ ] Implement HTTPS/TLS
- [ ] Add CSRF protection
- [ ] Set up CI/CD pipeline
- [ ] Add comprehensive tests
- [ ] Implement real Zendesk integration
- [ ] Add file upload to cloud storage (S3)
- [ ] Integrate real AI for analysis
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add multi-factor authentication
- [ ] Set up environment-based config
- [ ] Optimize bundle size
- [ ] Add caching layer (Redis)
- [ ] Set up CDN for static assets

---

**This is a hackathon prototype demonstrating full-stack TypeScript development with authentication.**

