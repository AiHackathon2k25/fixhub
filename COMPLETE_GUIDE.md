# FixHub - Complete Guide (From Zero to Hero)

**Version:** 1.0.0  
**Last Updated:** November 29, 2024  
**Team:** Hajar, Estefania, Faouzia (Co-Founders & Developers)

---

## 📚 Table of Contents

1. [What is FixHub?](#what-is-fixhub)
2. [Prerequisites](#prerequisites)
3. [Project Architecture](#project-architecture)
4. [Technology Stack](#technology-stack)
5. [Getting Started](#getting-started)
6. [How to Use the Application](#how-to-use-the-application)
7. [Features in Detail](#features-in-detail)
8. [Code Structure](#code-structure)
9. [API Documentation](#api-documentation)
10. [Database & Storage](#database--storage)
11. [Authentication System](#authentication-system)
12. [Frontend Components](#frontend-components)
13. [Backend Routes](#backend-routes)
14. [Styling & Design](#styling--design)
15. [Testing](#testing)
16. [Deployment](#deployment)
17. [Troubleshooting](#troubleshooting)
18. [Future Enhancements](#future-enhancements)
19. [Contributing](#contributing)

---

## 1. What is FixHub?

### Overview
FixHub is an **AI-powered insurance claim management platform** that simplifies the process of filing and processing insurance claims for damaged items.

### The Problem We Solve
- Traditional insurance claims take **weeks to process**
- Manual damage assessment is **slow and inconsistent**
- Users struggle with **complex paperwork**
- No instant cost estimates

### Our Solution
- **Instant damage analysis** using AI (currently mocked, ready for real AI integration)
- **Automated cost estimation** based on damage description
- **One-click ticket submission** to insurance companies (Zendesk integration ready)
- **User-friendly interface** with step-by-step guidance

### Key Features
1. **User Authentication** - Secure signup/login with JWT tokens
2. **Damage Analysis** - Upload photo + description → Get instant assessment
3. **Cost Estimation** - Accurate repair/replacement cost estimates
4. **Ticket Management** - Submit claims directly to insurance companies
5. **Professional UI** - Modern, responsive design with Tailwind CSS

---

## 2. Prerequisites

### What You Need Before Starting

#### Required Software
1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Check version: `node --version`

2. **npm** (comes with Node.js)
   - Check version: `npm --version`

3. **Git** (for version control)
   - Download: https://git-scm.com/
   - Check version: `git --version`

4. **Code Editor** (recommended: VS Code)
   - Download: https://code.visualstudio.com/

#### Optional but Recommended
- **Postman** - For testing API endpoints
- **Chrome DevTools** - For debugging

#### Knowledge Prerequisites
- **Basic JavaScript/TypeScript**
- **React fundamentals**
- **Node.js & Express basics**
- **REST API concepts**

---

## 3. Project Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                           USER BROWSER                          │
│                     (http://localhost:3000)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    FRONTEND (Next.js)                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Pages: Home, About, Contact, Login, Signup, Dashboard  │   │
│  │ Components: Header, Footer, Forms, Modals             │   │
│  │ State Management: React Hooks                          │   │
│  │ Styling: Tailwind CSS                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ API Calls (fetch)
                             │ JWT in Authorization header
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    BACKEND (Express)                            │
│                  (http://localhost:4000)                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Routes:                                                 │   │
│  │  • /api/auth/signup  - Create account                  │   │
│  │  • /api/auth/login   - Login user                      │   │
│  │  • /api/auth/me      - Get current user                │   │
│  │  • /api/analyze      - Analyze damage (protected)      │   │
│  │  • /api/tickets      - Create ticket (protected)       │   │
│  │                                                         │   │
│  │ Middleware:                                             │   │
│  │  • CORS              - Allow frontend requests         │   │
│  │  • JWT Verification  - Protect routes                  │   │
│  │  • Zod Validation    - Validate request data           │   │
│  │                                                         │   │
│  │ Services:                                               │   │
│  │  • User Store        - In-memory user storage          │   │
│  │  • Mock Analysis     - Keyword-based damage analysis   │   │
│  │  • Zendesk Stub      - Ticket submission (mocked)      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Frontend Component → API Client → Backend Route
                                                      ↓
                                              JWT Validation
                                                      ↓
                                              Zod Validation
                                                      ↓
                                              Business Logic
                                                      ↓
                                              Response ← Frontend
```

---

## 4. Technology Stack

### Frontend

| Technology | Purpose | Why We Use It |
|-----------|---------|---------------|
| **Next.js 14** | React Framework | Server-side rendering, App Router, built-in routing |
| **React 18** | UI Library | Component-based architecture, hooks, virtual DOM |
| **TypeScript** | Type Safety | Catch errors at compile time, better IDE support |
| **Tailwind CSS** | Styling | Utility-first CSS, rapid development, responsive design |
| **Zod** | Validation | Type-safe validation, easy to use with TypeScript |

### Backend

| Technology | Purpose | Why We Use It |
|-----------|---------|---------------|
| **Node.js** | Runtime | JavaScript on server, async I/O, large ecosystem |
| **Express** | Web Framework | Minimal, flexible, widely used, great middleware |
| **TypeScript** | Type Safety | Same codebase language as frontend |
| **JWT** | Authentication | Stateless auth, scalable, works with mobile apps |
| **bcryptjs** | Password Hashing | Secure password storage, salt generation |
| **Zod** | Validation | Runtime type checking, schema validation |
| **CORS** | Cross-Origin | Allow frontend to call backend on different port |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ts-node-dev** | TypeScript execution with hot reload |
| **ESLint** | Code quality and consistency |
| **Git** | Version control |

---

## 5. Getting Started

### Step 1: Clone or Download the Project

If from GitHub:
```bash
git clone https://github.com/AiHackathon2k25/fixhub.git
cd fixhub
```

### Step 2: Install Dependencies

#### Backend:
```bash
cd backend
npm install
```

This installs:
- express
- cors
- jsonwebtoken
- bcryptjs
- zod
- TypeScript
- ts-node-dev

#### Frontend:
```bash
cd frontend
npm install
```

This installs:
- next
- react
- react-dom
- TypeScript
- tailwindcss
- zod

### Step 3: Environment Variables (Optional)

Backend uses environment variables. Default values are provided, but you can create a `.env` file:

```bash
cd backend
# Create .env file
```

Add:
```env
JWT_SECRET=your-super-secret-key-change-in-production
PORT=4000
```

### Step 4: Start the Servers

#### Option A: Use the Startup Script (Windows)
```bash
# From project root
START_SERVERS.bat
```

#### Option B: Manual Start (Any OS)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Wait for:
```
✅ Backend server running on http://localhost:4000
📍 Endpoints:
   POST /api/auth/signup
   POST /api/auth/login
   ...
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Wait for:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- ready in 3.2s
```

### Step 5: Open in Browser

Go to: **http://localhost:3000**

You should see the FixHub homepage!

---

## 6. How to Use the Application

### 6.1 Create an Account

1. Open http://localhost:3000
2. Click **"Sign Up"** button (top right or in hero section)
3. Fill in the signup form:
   - **Username:** Your display name (min 2 characters)
   - **Email:** Valid email address
   - **Phone:** Phone number (min 8 characters, e.g., +45 12345678)
   - **Password:** Secure password (min 6 characters)
   - **Confirm Password:** Must match password
4. Click **"Sign Up"**
5. Wait for success message: "Account created successfully! Redirecting to login..."
6. You'll be redirected to the login page

### 6.2 Log In

1. On the login page (or click "Log In" from homepage)
2. Enter your credentials:
   - **Email:** The email you used during signup
   - **Password:** Your password
3. Click **"Log In"**
4. Wait for success message: "Login successful! Redirecting to dashboard..."
5. You'll be redirected to your Dashboard

### 6.3 Analyze Damage

1. On the Dashboard, you'll see the "Submit Your Claim" form
2. **Upload Image:**
   - Click the file input
   - Select an image of the damaged item
   - Supported formats: JPG, PNG, etc.
   - Note: Image is required but not sent to backend (for now)

3. **Describe Damage:**
   - Enter a description (min 5 characters)
   - Be specific about what happened
   - Try these examples:
     - "dishwasher door fell off and won't close properly"
     - "phone screen cracked after dropping it"
     - "water leak from pipe connection under sink"

4. Click **"Analyze Damage"**
5. Wait a few seconds (loading spinner appears)
6. See your analysis result!

### 6.4 View Analysis Results

The result card shows:
- **Category:** Type of item (Appliance, Electronics, VVS)
- **Sub-Category:** Specific item type
- **Severity:** Minor, Moderate, or Severe (with colored badge)
- **Estimated Cost:** Cost range in DKK
- **Recommendation:** Repair or Replace
- **Insurance Summary:** Brief description of the damage

### 6.5 Send Ticket to Company

1. Review your analysis results
2. Click **"Preview Full Claim"** to see complete insurance summary (optional)
3. Click **"Send Ticket to Company"**
4. Wait for confirmation (loading spinner)
5. Success message appears: "Ticket sent to company (mocked)"
6. Check the backend terminal - you'll see the ticket details logged

### 6.6 Log Out

1. Click **"Log Out"** in the header
2. You'll be redirected to the homepage
3. Your JWT token is cleared from localStorage

---

## 7. Features in Detail

### 7.1 Authentication System

#### How It Works:
1. **Sign Up:**
   - User provides: username, email, phone, password
   - Backend validates input with Zod
   - Password is hashed with bcrypt (10 rounds)
   - User is stored in memory
   - Account created (no auto-login)

2. **Log In:**
   - User provides: email, password
   - Backend finds user by email
   - Compares password hash
   - Generates JWT token (expires in 1 day)
   - Token contains: `{ userId: user.id }`
   - Frontend stores token in localStorage

3. **Protected Routes:**
   - Frontend includes JWT in `Authorization: Bearer <token>` header
   - Backend middleware verifies token
   - If valid: request proceeds
   - If invalid: 401 Unauthorized

#### Security Features:
- ✅ Passwords hashed with bcrypt
- ✅ JWT with expiration
- ✅ Input validation (email format, password length)
- ✅ Protected API routes

#### Security Limitations (Hackathon Demo):
- ⚠️ JWT stored in localStorage (vulnerable to XSS)
- ⚠️ No refresh tokens
- ⚠️ No rate limiting
- ⚠️ No email verification
- ⚠️ No password reset

### 7.2 Damage Analysis

#### Mock Analysis Logic:

The system uses keyword detection in descriptions:

```javascript
// Backend: src/mockAnalysis.ts

if (description.includes('dishwasher')) {
  return {
    category: 'appliance',
    subCategory: 'dishwasher',
    severity: 'moderate',
    estimatedCost: '600–900 DKK',
    repairOrReplace: 'repair',
    insuranceSummary: '...'
  }
}

// Similar for: phone, screen, leak, water
// Default: general appliance, minor severity
```

#### Analysis Categories:

| Keyword | Category | Sub-Category | Severity | Cost (DKK) | Action |
|---------|----------|--------------|----------|------------|--------|
| dishwasher | Appliance | Dishwasher | Moderate | 600-900 | Repair |
| phone/screen | Electronics | Smartphone | Severe | 1200-2000 | Replace |
| leak/water | VVS | Pipe Leak | Moderate | 800-1500 | Repair |
| (default) | Appliance | General | Minor | 400-800 | Repair |

#### Future: Real AI Integration

To integrate real AI (OpenAI Vision, Google Cloud Vision):

```typescript
// Replace mockAnalysis with:
import OpenAI from 'openai';

async function analyzeWithAI(imageUrl: string, description: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [{
      role: "user",
      content: [
        { type: "text", text: description },
        { type: "image_url", image_url: imageUrl }
      ]
    }]
  });
  
  // Parse AI response and return AnalysisResult
}
```

### 7.3 Ticket Management

#### Creating a Ticket:

1. User gets analysis results
2. Clicks "Send Ticket to Company"
3. Frontend sends POST to `/api/tickets`:
   ```json
   {
     "description": "dishwasher door fell off",
     "analysis": { /* AnalysisResult object */ }
   }
   ```
4. Backend creates ticket:
   ```json
   {
     "id": "ticket_1234567890_abc123",
     "userId": "user_1234567890_xyz789",
     "description": "...",
     "analysis": { ... },
     "createdAt": "2024-11-29T12:00:00.000Z"
   }
   ```
5. Ticket stored in memory
6. `sendTicketToZendesk()` called (currently logs to console)
7. Success response sent to frontend

#### Zendesk Integration (Future):

```typescript
// In zendeskStub.ts, replace with:
import axios from 'axios';

export async function sendTicketToZendesk(ticket: Ticket): Promise<void> {
  const response = await axios.post(
    'https://yourcompany.zendesk.com/api/v2/tickets.json',
    {
      ticket: {
        subject: `FixHub Claim: ${ticket.analysis.category}`,
        comment: {
          body: ticket.analysis.insuranceSummary
        },
        priority: ticket.analysis.severity,
        custom_fields: [
          { id: 123, value: ticket.analysis.estimatedCost }
        ]
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('email:api_token')}`
      }
    }
  );
  
  return response.data;
}
```

---

## 8. Code Structure

### Project Structure

```
fixhub/
├── backend/                      # Express + TypeScript backend
│   ├── src/
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts # JWT verification
│   │   ├── routes/
│   │   │   ├── auth.ts           # /api/auth/* endpoints
│   │   │   ├── analyze.ts        # /api/analyze endpoint
│   │   │   └── tickets.ts        # /api/tickets endpoints
│   │   ├── types/
│   │   │   ├── analysis.ts       # AnalysisResult interface
│   │   │   ├── ticket.ts         # Ticket interface
│   │   │   └── user.ts           # User interface
│   │   ├── mockAnalysis.ts       # Mock AI logic
│   │   ├── server.ts             # Main Express app
│   │   ├── userStore.ts          # In-memory user storage
│   │   └── zendeskStub.ts        # Zendesk integration stub
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                     # Next.js + React frontend
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx          # About Us page
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx      # Login page
│   │   │   └── signup/
│   │   │       └── page.tsx      # Signup page
│   │   ├── components/
│   │   │   ├── AnalysisResultCard.tsx  # Display results
│   │   │   ├── AuthForm.tsx            # Login/signup form
│   │   │   ├── ClaimModal.tsx          # Full claim modal
│   │   │   ├── ComingSoonModal.tsx     # Info modal
│   │   │   ├── Features.tsx            # Features section
│   │   │   ├── Footer.tsx              # Site footer
│   │   │   ├── Header.tsx              # Site header/nav
│   │   │   ├── HeroSection.tsx         # Homepage hero
│   │   │   ├── ProtectedClient.tsx     # Auth guard
│   │   │   ├── Testimonials.tsx        # Customer reviews
│   │   │   └── UploadForm.tsx          # Damage upload form
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact Us page
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard (protected)
│   │   ├── styles/
│   │   │   └── globals.css       # Global styles + Tailwind
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   ├── lib/
│   │   ├── apiClient.ts          # API call helpers
│   │   ├── auth.ts               # Auth helpers (token mgmt)
│   │   └── types.ts              # TypeScript types
│   ├── public/
│   │   ├── favicon.ico
│   │   └── logo.svg
│   ├── package.json
│   ├── tailwind.config.mjs
│   └── tsconfig.json
│
├── COMPLETE_GUIDE.md             # This file!
├── README.md                     # Quick overview
├── QUICKSTART.md                 # Fast setup guide
├── TROUBLESHOOTING.md            # Debug help
├── DESIGN_NOTES.md               # Design system docs
├── PROJECT_STRUCTURE.md          # Architecture details
├── CHANGELOG.md                  # Version history
├── START_SERVERS.bat             # Windows startup script
└── QUICK_START.txt               # Quick reference
```

### Key Files Explained

#### Backend Files

**`server.ts`** - Main entry point
```typescript
// Creates Express app
// Adds middleware (CORS, JSON parser)
// Mounts routes
// Starts server on port 4000
```

**`routes/auth.ts`** - Authentication endpoints
```typescript
POST /api/auth/signup  // Create account
POST /api/auth/login   // Login
GET  /api/auth/me      // Get current user (protected)
```

**`middleware/authMiddleware.ts`** - Protects routes
```typescript
// Reads Authorization header
// Verifies JWT token
// Attaches user to req.user
// Continues or returns 401
```

**`mockAnalysis.ts`** - Business logic
```typescript
// Takes description string
// Checks for keywords
// Returns AnalysisResult
```

**`userStore.ts`** - Data storage
```typescript
// In-memory user array
// findUserByEmail()
// createUser()
// findUserById()
```

#### Frontend Files

**`app/page.tsx`** - Homepage
```typescript
// Hero section
// How It Works
// Features
// Services
// Testimonials
// CTA sections
```

**`app/dashboard/page.tsx`** - Main app
```typescript
// Protected with ProtectedClient
// Upload form
// Analysis results
// Ticket sending
// Modals
```

**`lib/apiClient.ts`** - API helper
```typescript
export async function apiPost(path, body, withAuth) {
  // Adds JWT if withAuth=true
  // Makes fetch request
  // Handles errors
  // Returns response
}
```

**`lib/auth.ts`** - Auth helpers
```typescript
getToken()    // Get JWT from localStorage
setToken()    // Save JWT
clearToken()  // Remove JWT
isLoggedIn()  // Check if JWT exists
```

**`components/ProtectedClient.tsx`** - Route guard
```typescript
// Checks if user is logged in
// Redirects to /auth/login if not
// Renders children if authenticated
```

---

## 9. API Documentation

### Base URL
```
http://localhost:4000
```

### Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer <your-jwt-token>
```

---

### **POST** `/api/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "johndoe",
  "phone": "+45 12345678"
}
```

**Validation Rules:**
- `email`: Valid email format
- `password`: Min 6 characters
- `username`: Min 2 characters
- `phone`: Min 8 characters

**Success Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_1701234567890_abc123",
    "email": "user@example.com",
    "username": "johndoe",
    "phone": "+45 12345678"
  }
}
```

**Error Response (400):**
```json
{
  "error": "User already exists with this email"
}
```

**Error Response (400):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": ["email"],
      "message": "Invalid email format"
    }
  ]
}
```

---

### **POST** `/api/auth/login`

Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_1701234567890_abc123",
    "email": "user@example.com",
    "username": "johndoe",
    "phone": "+45 12345678"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid email or password"
}
```

---

### **GET** `/api/auth/me` 🔒

Get current authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "user": {
    "id": "user_1701234567890_abc123",
    "email": "user@example.com",
    "username": "johndoe",
    "phone": "+45 12345678"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Unauthorized: Invalid token"
}
```

---

### **POST** `/api/analyze` 🔒

Analyze damage description.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "description": "dishwasher door fell off and won't close"
}
```

**Validation Rules:**
- `description`: Min 5 characters, max 500 characters

**Success Response (200):**
```json
{
  "category": "appliance",
  "subCategory": "dishwasher",
  "severity": "moderate",
  "estimatedCost": "600–900 DKK",
  "repairOrReplace": "repair",
  "insuranceSummary": "Customer reports that the dishwasher door dropped open..."
}
```

---

### **POST** `/api/tickets` 🔒

Create a ticket from analysis.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "description": "dishwasher door fell off",
  "analysis": {
    "category": "appliance",
    "subCategory": "dishwasher",
    "severity": "moderate",
    "estimatedCost": "600–900 DKK",
    "repairOrReplace": "repair",
    "insuranceSummary": "..."
  }
}
```

**Success Response (201):**
```json
{
  "success": true,
  "ticketId": "ticket_1701234567890_xyz789",
  "message": "Ticket created and sent to company (mocked)"
}
```

---

### **GET** `/api/tickets` 🔒

List user's tickets.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "tickets": [
    {
      "id": "ticket_1701234567890_xyz789",
      "userId": "user_1701234567890_abc123",
      "description": "dishwasher door fell off",
      "analysis": { ... },
      "createdAt": "2024-11-29T12:00:00.000Z"
    }
  ]
}
```

---

### **GET** `/health`

Health check endpoint (no auth required).

**Success Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-11-29T12:00:00.000Z"
}
```

---

## 10. Database & Storage

### Current Implementation: In-Memory Storage

**Why In-Memory?**
- Hackathon/demo purposes
- Quick setup, no database required
- Easy to understand and modify

**What's Stored:**
- Users (array in `userStore.ts`)
- Tickets (array in `routes/tickets.ts`)

**Limitations:**
- ⚠️ Data lost when server restarts
- ⚠️ Not scalable
- ⚠️ No persistence
- ⚠️ Not suitable for production

### Production Solution: Database

For production, replace in-memory storage with a real database.

#### Option 1: PostgreSQL (Recommended)

**Install:**
```bash
npm install pg
npm install @types/pg --save-dev
```

**Setup:**
```typescript
// database.ts
import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Create tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  description TEXT NOT NULL,
  analysis JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Update userStore.ts:**
```typescript
import { pool } from './database';

export async function createUser(
  email: string, 
  passwordHash: string, 
  username: string, 
  phone: string
): Promise<User> {
  const result = await pool.query(
    'INSERT INTO users (email, password_hash, username, phone) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, passwordHash, username, phone]
  );
  return result.rows[0];
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
}
```

#### Option 2: MongoDB

**Install:**
```bash
npm install mongodb
```

**Setup:**
```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export const db = client.db('fixhub');
export const usersCollection = db.collection('users');
export const ticketsCollection = db.collection('tickets');
```

#### Option 3: Prisma ORM (Easiest)

**Install:**
```bash
npm install prisma @prisma/client
npx prisma init
```

**Schema (schema.prisma):**
```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  username     String
  phone        String
  passwordHash String
  tickets      Ticket[]
  createdAt    DateTime @default(now())
}

model Ticket {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  description String
  analysis    Json
  createdAt   DateTime @default(now())
}
```

**Usage:**
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create user
const user = await prisma.user.create({
  data: { email, passwordHash, username, phone }
});

// Find user
const user = await prisma.user.findUnique({
  where: { email }
});
```

---

## 11. Authentication System

### JWT (JSON Web Token) Flow

#### Token Structure:
```javascript
{
  header: {
    alg: "HS256",    // Algorithm
    typ: "JWT"       // Type
  },
  payload: {
    userId: "user_123...",  // Our data
    iat: 1701234567,        // Issued at
    exp: 1701320967         // Expires (1 day)
  },
  signature: "..." // Verification
}
```

#### Generation (Backend):
```typescript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

const token = jwt.sign(
  { userId: user.id },    // Payload
  JWT_SECRET,             // Secret key
  { expiresIn: '1d' }     // Options
);
```

#### Verification (Backend Middleware):
```typescript
const token = req.headers.authorization?.substring(7); // Remove "Bearer "
const decoded = jwt.verify(token, JWT_SECRET);
// decoded = { userId: "...", iat: ..., exp: ... }

const user = findUserById(decoded.userId);
req.user = user;
next();
```

#### Storage (Frontend):
```typescript
// Save token
localStorage.setItem('fixhub_token', token);

// Retrieve token
const token = localStorage.getItem('fixhub_token');

// Use token in API calls
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Password Hashing with bcrypt

#### Why Hash Passwords?
- Never store plain text passwords
- Even if database is compromised, passwords are safe
- One-way function (can't reverse)

#### How It Works:
```typescript
import bcrypt from 'bcryptjs';

// Hash password (signup)
const salt = await bcrypt.genSalt(10);  // Generate salt
const hash = await bcrypt.hash(password, 10);  // Hash password
// Result: "$2a$10$N9qo8uLOickgx2ZMRZoMye..."

// Verify password (login)
const isMatch = await bcrypt.compare(password, hash);
// Returns: true or false
```

#### What's a Salt?
- Random data added to password before hashing
- Prevents rainbow table attacks
- Each user gets unique salt
- bcrypt includes salt in the hash automatically

---

## 12. Frontend Components

### Component Architecture

```
App
├── layout.tsx (Root)
│   ├── Header
│   └── {children}
│
├── page.tsx (Home)
│   ├── HeroSection
│   ├── Features
│   ├── Services
│   ├── Testimonials
│   └── Footer
│
├── /auth/login
│   └── AuthForm (mode="login")
│
├── /auth/signup
│   └── AuthForm (mode="signup")
│
├── /dashboard (Protected)
│   ├── ProtectedClient
│   ├── UploadForm
│   ├── AnalysisResultCard
│   ├── ClaimModal
│   └── Footer
│
├── /about
│   ├── Team Section
│   ├── Mission
│   └── Values
│
└── /contact
    ├── ContactForm
    └── Contact Info Cards
```

### Key Components

#### **Header.tsx** - Navigation Bar
```typescript
Props: None
State: 
  - pathname (from usePathname)
  - loggedIn (from isLoggedIn())

Features:
- Sticky positioning
- Conditional navigation (logged in vs out)
- Active page highlighting
- Logout button
```

#### **HeroSection.tsx** - Homepage Hero
```typescript
Props: None

Features:
- Gradient background
- Animated floating elements
- CTA buttons
- Stats display (99%, <5min, 24/7)
- Wave SVG transition
```

#### **AuthForm.tsx** - Reusable Auth Form
```typescript
Props:
  - mode: 'login' | 'signup'
  - onSubmit: (email, password, username?, phone?) => Promise<void>

State:
  - email, password, confirmPassword, username, phone
  - errors (validation)
  - isLoading
  - serverError

Features:
- Client-side Zod validation
- Conditional fields (signup vs login)
- Loading states
- Error display
- Password match check
```

#### **UploadForm.tsx** - Damage Upload
```typescript
Props:
  - onAnalyze: (description, file) => Promise<void>
  - isLoading: boolean

State:
  - description
  - file
  - errors

Features:
- File input
- Textarea for description
- Client validation
- Loading spinner
- Error messages
```

#### **AnalysisResultCard.tsx** - Results Display
```typescript
Props:
  - result: AnalysisResult
  - onOpenClaim: () => void
  - onSendTicket: () => void
  - isSendingTicket: boolean

Features:
- Severity badge (color-coded)
- All analysis fields
- Action buttons
- Loading states
```

#### **ProtectedClient.tsx** - Auth Guard
```typescript
Props:
  - children: ReactNode

Features:
- Checks isLoggedIn()
- Redirects to /auth/login if not
- Shows loading spinner while checking
- Renders children if authenticated
```

### Component Communication

```
Dashboard (Parent)
    ↓ props
UploadForm
    ↓ callback
Dashboard.handleAnalyze()
    ↓ API call
Backend
    ↓ response
Dashboard.setAnalysisResult()
    ↓ props
AnalysisResultCard
```

---

## 13. Backend Routes

### Route Organization

```
server.ts
    ├── app.use('/api/auth', authRouter)
    ├── app.use('/api', analyzeRouter)
    └── app.use('/api', ticketsRouter)
```

### Middleware Chain

```
Request
    ↓
CORS Middleware
    ↓
JSON Parser
    ↓
Route Handler
    ↓
[Auth Middleware] (if protected)
    ↓
[Zod Validation]
    ↓
Business Logic
    ↓
Response
```

### Route Details

#### **routes/auth.ts**

**Endpoints:**
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me

**Flow (Signup):**
```
1. Receive request body
2. Validate with Zod (email, password, username, phone)
3. Check if user exists
4. Hash password with bcrypt
5. Create user in store
6. Generate JWT token
7. Return { token, user }
```

**Flow (Login):**
```
1. Receive request body
2. Validate with Zod
3. Find user by email
4. Compare password with hash
5. Generate JWT token
6. Return { token, user }
```

#### **routes/analyze.ts**

**Middleware:** authMiddleware (protected)

**Flow:**
```
1. JWT verification
2. Validate description (Zod)
3. Call mockAnalysis(description)
4. Return AnalysisResult
```

#### **routes/tickets.ts**

**Endpoints:**
- POST /api/tickets (create)
- GET /api/tickets (list)

**Middleware:** authMiddleware (protected)

**Flow (Create):**
```
1. JWT verification
2. Validate request body (description, analysis)
3. Create Ticket object
4. Store in memory
5. Call sendTicketToZendesk() stub
6. Return { success, ticketId }
```

---

## 14. Styling & Design

### Tailwind CSS

#### Utility-First Approach:
```html
<!-- Instead of writing CSS -->
<div class="container header-style">

<!-- We write utilities -->
<div class="max-w-6xl mx-auto px-4 py-4 bg-white shadow-md">
```

#### Common Patterns Used:

**Layout:**
```css
max-w-6xl mx-auto     /* Center container, max width */
px-4 py-8             /* Padding */
grid md:grid-cols-3   /* Responsive grid */
flex items-center     /* Flexbox centering */
```

**Spacing:**
```css
gap-4                 /* Grid/flex gap */
space-y-4             /* Vertical spacing between children */
mb-6                  /* Margin bottom */
```

**Colors:**
```css
bg-blue-600           /* Background */
text-white            /* Text color */
border-gray-300       /* Border color */
```

**Interactive:**
```css
hover:bg-blue-700     /* Hover state */
focus:ring-2          /* Focus ring */
transition-colors     /* Smooth transition */
```

**Responsive:**
```css
md:grid-cols-2        /* 2 columns on medium+ screens */
sm:flex-row           /* Row layout on small+ screens */
hidden md:block       /* Hide on mobile, show on desktop */
```

### Design System

#### Colors:
```javascript
Primary: blue-600 (#2563EB)
Secondary: purple-600 (#7C3AED)
Success: green-600 (#16A34A)
Error: red-600 (#DC2626)
Gray Scale: gray-50 to gray-900
```

#### Typography:
```javascript
Headings: text-4xl font-bold (2.25rem, 36px)
Subheadings: text-2xl font-semibold
Body: text-base (1rem, 16px)
Small: text-sm (0.875rem, 14px)
```

#### Spacing Scale:
```javascript
1 = 0.25rem = 4px
2 = 0.5rem = 8px
4 = 1rem = 16px
6 = 1.5rem = 24px
8 = 2rem = 32px
12 = 3rem = 48px
20 = 5rem = 80px
```

#### Shadows:
```javascript
shadow-md    /* Medium shadow */
shadow-lg    /* Large shadow */
shadow-xl    /* Extra large */
shadow-2xl   /* Massive */
```

### Custom Animations

**globals.css:**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

**Usage:**
```html
<div class="animate-fade-in">
  <!-- Fades in and slides up -->
</div>
```

### Responsive Design

#### Breakpoints:
```javascript
sm: 640px   // Small devices
md: 768px   // Medium devices (tablets)
lg: 1024px  // Large devices (desktops)
xl: 1280px  // Extra large
2xl: 1536px // Huge screens
```

#### Mobile-First:
```html
<!-- Base: Mobile -->
<div class="grid-cols-1 
             md:grid-cols-2 
             lg:grid-cols-3">
  <!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
</div>
```

---

## 15. Testing

### Manual Testing Checklist

#### Authentication:
- [ ] Sign up with valid data
- [ ] Sign up with existing email (should error)
- [ ] Sign up with invalid email format (should error)
- [ ] Sign up with short password (should error)
- [ ] Sign up with mismatched passwords (should error)
- [ ] Redirect to login after signup
- [ ] Login with correct credentials
- [ ] Login with wrong password (should error)
- [ ] Login with non-existent email (should error)
- [ ] Redirect to dashboard after login
- [ ] Logout clears token
- [ ] Cannot access dashboard when logged out

#### Dashboard:
- [ ] Upload image (required)
- [ ] Enter description with various keywords
- [ ] Analyze damage - see results
- [ ] Results show correct category
- [ ] Severity badge shows correct color
- [ ] Preview full claim modal works
- [ ] Send ticket shows success message
- [ ] Backend logs ticket to console

#### Navigation:
- [ ] Home page loads
- [ ] About Us page shows team
- [ ] Contact page form works
- [ ] Header navigation works
- [ ] Footer links work
- [ ] Go back buttons work
- [ ] Active page highlighting works

#### Responsive:
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768-1024px)
- [ ] Test on desktop (> 1024px)
- [ ] All forms usable on mobile
- [ ] Navigation works on mobile

### API Testing with Postman/curl

#### Test Signup:
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456",
    "username": "testuser",
    "phone": "+45 12345678"
  }'
```

#### Test Login:
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

#### Test Analyze (with token):
```bash
curl -X POST http://localhost:4000/api/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "description": "dishwasher door fell off"
  }'
```

### Automated Testing (Future)

**For Backend:**
```bash
npm install --save-dev jest supertest @types/jest
```

```typescript
// __tests__/auth.test.ts
import request from 'supertest';
import app from '../src/server';

describe('POST /api/auth/signup', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        phone: '+45 12345678'
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('test@example.com');
  });
});
```

**For Frontend:**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

```typescript
// __tests__/AuthForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '../app/components/AuthForm';

test('validates email format', () => {
  render(<AuthForm mode="login" onSubmit={jest.fn()} />);
  
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'invalid' } });
  fireEvent.submit(screen.getByRole('button'));
  
  expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
});
```

---

## 16. Deployment

### Production Checklist

#### Security:
- [ ] Change JWT_SECRET to strong random value
- [ ] Move JWT to HttpOnly cookies (not localStorage)
- [ ] Add HTTPS/TLS
- [ ] Add rate limiting
- [ ] Add CSRF protection
- [ ] Add input sanitization
- [ ] Enable CORS only for your domain
- [ ] Add helmet.js for security headers
- [ ] Implement refresh tokens
- [ ] Add email verification
- [ ] Add password reset

#### Database:
- [ ] Replace in-memory storage with real database
- [ ] Set up database migrations
- [ ] Add database backups
- [ ] Use connection pooling
- [ ] Add database indexes

#### Performance:
- [ ] Minify and bundle code
- [ ] Enable compression (gzip/brotli)
- [ ] Add caching (Redis)
- [ ] Use CDN for static assets
- [ ] Optimize images
- [ ] Add monitoring (Sentry, DataDog)
- [ ] Set up logging (Winston, Pino)

#### Environment:
- [ ] Use environment variables
- [ ] Never commit secrets to git
- [ ] Set NODE_ENV=production
- [ ] Use process manager (PM2)

### Deployment Options

#### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Backend (Railway):**
1. Go to railway.app
2. New Project → Deploy from GitHub
3. Select backend folder
4. Add environment variables
5. Deploy

#### Option 2: Both on Render

**Frontend:**
```yaml
# render.yaml
services:
  - type: web
    name: fixhub-frontend
    env: node
    buildCommand: cd frontend && npm install && npm run build
    startCommand: cd frontend && npm start
```

**Backend:**
```yaml
  - type: web
    name: fixhub-backend
    env: node
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
```

#### Option 3: Docker

**Dockerfile (Backend):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/server.js"]
```

**Dockerfile (Frontend):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - JWT_SECRET=${JWT_SECRET}
      - DATABASE_URL=${DATABASE_URL}
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

---

## 17. Troubleshooting

See **TROUBLESHOOTING.md** for detailed debug guide.

### Common Issues:

#### Login/Signup shows "Please wait..." forever
**Cause:** Backend not running  
**Fix:** Start backend server (`cd backend && npm run dev`)

#### "Cannot connect to server" error
**Cause:** Backend not accessible  
**Fix:** Check backend is on port 4000 (`http://localhost:4000/health`)

#### "Unauthorized" error
**Cause:** Invalid/expired JWT token  
**Fix:** Log out and log back in

#### Port already in use
**Cause:** Server already running  
**Fix:** Kill process or use different port

#### Module not found errors
**Cause:** Dependencies not installed  
**Fix:** Run `npm install` in both folders

---

## 18. Future Enhancements

### Phase 1: Core Improvements
- [ ] Real database (PostgreSQL)
- [ ] Email verification
- [ ] Password reset
- [ ] Refresh tokens
- [ ] Profile page
- [ ] Edit user info

### Phase 2: AI Integration
- [ ] OpenAI Vision API integration
- [ ] Actual image analysis
- [ ] Multiple image upload
- [ ] Damage detection confidence score
- [ ] Historical data learning

### Phase 3: Features
- [ ] Ticket history page
- [ ] Real-time notifications
- [ ] Chat support
- [ ] PDF report generation
- [ ] Multi-language support
- [ ] Currency selection

### Phase 4: Zendesk Integration
- [ ] Real Zendesk API connection
- [ ] Ticket status tracking
- [ ] Automatic updates
- [ ] Custom fields mapping
- [ ] Webhook integration

### Phase 5: Admin Panel
- [ ] Admin dashboard
- [ ] User management
- [ ] Analytics and reports
- [ ] Ticket review
- [ ] System settings

### Phase 6: Mobile App
- [ ] React Native app
- [ ] Camera integration
- [ ] Offline mode
- [ ] Push notifications
- [ ] Biometric login

---

## 19. Contributing

### For the Team (Hajar, Estefania, Faouzia)

#### Git Workflow:
```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, commit
git add .
git commit -m "Add feature: description"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

#### Code Standards:
- Use TypeScript for type safety
- Follow existing code style
- Add comments for complex logic
- Test before committing
- Write descriptive commit messages

#### Branch Naming:
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code improvements
- `docs/` - Documentation

#### Commit Messages:
```
Add: New feature
Fix: Bug description
Update: Changed feature
Refactor: Improved code
Docs: Documentation update
```

---

## 📞 Support & Contact

### Team
- **Hajar** - Co-Founder & Developer
- **Estefania** - Co-Founder & Developer  
- **Faouzia** - Co-Founder & Developer

### Project Information
- **GitHub:** https://github.com/AiHackathon2k25/fixhub
- **Email:** support@fixhub.com
- **Website:** http://localhost:3000 (development)

---

## 📄 License

This project is created for AI Hackathon 2025. All rights reserved by the team.

---

## 🎉 Conclusion

You now have a complete understanding of FixHub from zero! This guide covered:

✅ What FixHub is and what problem it solves  
✅ How to install and run the application  
✅ Complete user flow and features  
✅ Detailed code architecture  
✅ API documentation  
✅ Database and storage options  
✅ Authentication system  
✅ Frontend components  
✅ Backend routes  
✅ Styling and design  
✅ Testing strategies  
✅ Deployment options  
✅ Troubleshooting guide  
✅ Future enhancement roadmap  
✅ Contributing guidelines  

**Now go build something amazing!** 🚀

---

**Document Version:** 1.0.0  
**Last Updated:** November 29, 2024  
**Created by:** FixHub Team (Hajar, Estefania, Faouzia)

