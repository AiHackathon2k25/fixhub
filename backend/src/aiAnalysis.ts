import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisResult } from "./types/analysis";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn(
    "[FixHub] GEMINI_API_KEY is not set. Falling back to mockAnalysis only."
  );
}

let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

/**
 * Uses Google Gemini AI to generate an AnalysisResult
 * from the damage description.
 */
export async function analyzeWithAI(description: string): Promise<AnalysisResult> {
  if (!apiKey || !genAI) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  console.log('🔑 [Gemini] API Key configured:', apiKey.substring(0, 10) + '...');

  const prompt = `
You are an expert insurance damage triage assistant.

You receive a description of damage to a household item.
You must output a JSON object that will be used by an insurance claim system.

Input description:
"${description}"

Your task:
1. Analyze the damage and provide:
   - issueSummary: A clear, user-friendly 1-2 sentence summary of the problem
   - recommendedFix: Specific repair/replacement action recommended (1-2 sentences)
   - difficulty: one of "easy", "medium", "hard" (repair complexity)
   - urgency: one of "low", "normal", "high" (how quickly it should be addressed)
   - category: one of "appliance", "electronics", "plumbing", "furniture", "other"
   - subCategory: a short specific type (e.g. "dishwasher", "smartphone", "pipe leak")
   - severity: one of "minor", "moderate", "severe"
   - estimatedCost: a **DKK cost range string** like "400–800 DKK" or "1200–2000 DKK"
   - repairOrReplace: one of "repair" or "replace"
   - insuranceSummary: 1–3 sentences in formal insurance language summarizing
     what the customer reports, visible damage, and recommended next step.

2. Guidelines:
   - Difficulty: "easy" for simple fixes, "medium" for standard repairs, "hard" for complex/specialized work
   - Urgency: "high" for safety/water damage, "normal" for functional issues, "low" for cosmetic
   - If damage is cosmetic or small and the device is usable, choose "minor" and "repair".
   - If the device is heavily damaged or likely more expensive to fix than replace, choose "severe" and "replace".

3. Output:
Return ONLY a valid JSON object with these exact keys:

{
  "issueSummary": "string",
  "recommendedFix": "string",
  "difficulty": "easy | medium | hard",
  "urgency": "low | normal | high",
  "category": "appliance | electronics | plumbing | furniture | other",
  "subCategory": "string",
  "severity": "minor | moderate | severe",
  "estimatedCost": "string, e.g. '600–900 DKK'",
  "repairOrReplace": "repair | replace",
  "insuranceSummary": "string"
}
  `.trim();

  console.log('🔄 [Gemini] Sending request to Google Gemini API...');

  // 🔴 OLD (invalid for your key)
  // const model = genAI.getGenerativeModel({ 
  //   model: "gemini-1.5-flash",
  // });

  // ✅ NEW: use one of the models your key actually has
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // or "gemini-2.5-pro" if you prefer
  });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const raw = response.text();
  console.log('📥 [Gemini] Received response from Gemini API');

  let jsonStr = raw.trim();
  
  if (jsonStr.startsWith("```json")) {
    jsonStr = jsonStr.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  } else if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/```\n?/g, "").trim();
  }

  let parsed: any;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err) {
    console.error("[FixHub] Failed to parse AI JSON:", err, raw);
    throw new Error("AI response was not valid JSON");
  }

  const requiredKeys: (keyof AnalysisResult)[] = [
    "issueSummary",
    "recommendedFix",
    "difficulty",
    "urgency",
    "category",
    "subCategory",
    "severity",
    "estimatedCost",
    "repairOrReplace",
    "insuranceSummary",
  ];

  for (const key of requiredKeys) {
    if (typeof parsed[key] !== "string") {
      throw new Error(`AI response missing or invalid key: ${key}`);
    }
  }

  return parsed as AnalysisResult;
}
