# FixHub AI Analysis Setup

## Overview

FixHub now supports **FREE AI-powered damage analysis** using **Google Gemini**! The system automatically falls back to mock analysis if the API key is not configured.

## 🆓 Why Gemini?

- ✅ **Completely FREE** - No credit card required!
- ✅ Generous rate limits (60 requests/minute)
- ✅ High-quality AI analysis
- ✅ Fast responses
- ✅ Easy to set up

## Setup Instructions

### 1. Get a FREE Google Gemini API Key

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the key
5. **No credit card needed!** 🎉

### 2. Configure the Backend

Create a `.env` file in the `backend/` directory with the following content:

```env
# JWT Secret for authentication (change in production!)
JWT_SECRET=fixhub-dev-secret-key-change-in-production

# Google Gemini API Key for FREE AI-powered damage analysis
GEMINI_API_KEY=your-gemini-api-key-here

# Server Port (optional, defaults to 4000)
# PORT=4000
```

**Important:** Replace `your-gemini-api-key-here` with your real Gemini API key from Google AI Studio.

### 3. Restart the Backend

```bash
cd backend
npm run dev
```

You should see:
```
✅ JWT_SECRET loaded from environment
✅ GEMINI_API_KEY loaded from environment
✅ Backend server running on http://localhost:4000
```

## How It Works

### With API Key Configured

When `GEMINI_API_KEY` is set, the system uses Google's **Gemini 1.5 Flash** model (FREE!) to analyze damage descriptions:

1. User submits a description (e.g., "washing machine drum makes loud banging noise")
2. Backend sends the description to Google Gemini with a specialized prompt
3. AI returns structured JSON with:
   - Category (appliance, electronics, plumbing, furniture, other)
   - Sub-category (specific item type)
   - Severity (minor, moderate, severe)
   - Estimated cost in DKK
   - Repair or replace recommendation
   - Professional insurance summary

### Without API Key (Fallback)

When `GEMINI_API_KEY` is not set or the AI call fails:

- System automatically uses `mockAnalysis.ts`
- Keyword-based analysis for common cases
- Still returns valid `AnalysisResult` objects
- No functionality loss, just less intelligent analysis

## Testing the AI

1. Start both backend and frontend
2. Log in to the dashboard at `http://localhost:3000/dashboard`
3. Enter a damage description, for example:
   - "washing machine drum makes loud banging noise"
   - "refrigerator not cooling, compressor is warm"
   - "laptop screen has vertical lines and flickering"
4. Click "Analyze Damage"
5. See the AI-generated analysis card with detailed results

## API Contract

The AI maintains the same API contract as mock analysis:

**Request:**
```json
POST /api/analyze
{
  "description": "string (5-500 characters)"
}
```

**Response:**
```json
{
  "category": "appliance | electronics | plumbing | furniture | other",
  "subCategory": "string",
  "severity": "minor | moderate | severe",
  "estimatedCost": "string (e.g. '600–900 DKK')",
  "repairOrReplace": "repair | replace",
  "insuranceSummary": "string"
}
```

## 💰 Cost Considerations

- Model used: **Gemini 1.5 Flash**
- **Cost: $0.00 - COMPLETELY FREE!** 🎉
- Free tier includes:
  - 15 requests per minute (RPM)
  - 1 million tokens per minute (TPM)
  - 1,500 requests per day (RPD)
- More than enough for FixHub!

## Troubleshooting

### "GEMINI_API_KEY not set" Warning

This is normal if you haven't added your API key yet. The system will use mock analysis as fallback.

### "AI analysis failed, using mockAnalysis"

This can happen if:
- Your API key is invalid
- Google AI API is temporarily down
- Rate limits exceeded (rare with free tier)
- Network connectivity issues

The system automatically falls back to mock analysis, so users won't see errors.

### Backend Crashes on Startup

Make sure:
- `@google/generative-ai` package is installed: `npm install @google/generative-ai`
- `dotenv` package is installed: `npm install dotenv`
- `.env` file exists in `backend/` directory

### Getting Your Free API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Click "Get API Key" or "Create API Key"
3. Copy the key (starts with "AIza...")
4. Paste it in your `.env` file
5. **No payment or credit card required!**

## Security Notes

- ⚠️ Never commit `.env` file to git
- ⚠️ Never share your Gemini API key publicly
- ⚠️ Use environment variables in production
- ⚠️ Change `JWT_SECRET` in production

## 🎉 Benefits of Using Gemini

1. **FREE** - No credit card, no billing, no surprises
2. **Fast** - Gemini 1.5 Flash is optimized for speed
3. **Smart** - High-quality analysis comparable to paid alternatives
4. **Generous Limits** - 1,500 requests per day on free tier
5. **Easy Setup** - Get your key in 30 seconds

## Files Modified

- ✅ `backend/src/aiAnalysis.ts` - Uses Google Gemini API
- ✅ `backend/src/routes/analyze.ts` - Updated to use Gemini with fallback
- ✅ `backend/src/server.ts` - Added dotenv and Gemini environment checks
- ✅ `backend/src/types/analysis.ts` - Updated categories
- ✅ `backend/src/mockAnalysis.ts` - Updated plumbing category
- ✅ `backend/package.json` - Added @google/generative-ai and dotenv dependencies

