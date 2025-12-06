import { GoogleGenAI } from "@google/genai";
import { ConversionData, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-2.5-flash for speed and tool capability
const MODEL_NAME = 'gemini-2.5-flash';

export const convertCurrency = async (
  amount: number,
  from: string,
  to: string
): Promise<{ data: ConversionData; sources: GroundingSource[] }> => {
  try {
    const prompt = `
      You are a currency exchange expert.
      Task:
      1. Find the current real-time exchange rate for ${amount} ${from} to ${to}.
      2. Find the closing exchange rate for ${from} to ${to} for the last 5 days to establish a trend.
      3. Provide a brief explanation of the current rate and any major market movements affecting it (1-2 sentences).

      Output Format:
      You MUST return a valid JSON object wrapped in a markdown code block (\`\`\`json ... \`\`\`).
      The JSON structure must be:
      {
        "rate": number, // Unit rate 1 FROM = X TO
        "convertedAmount": number, // Total converted amount
        "timestamp": string, // Current ISO timestamp
        "explanation": string,
        "trend": [
          { "date": "YYYY-MM-DD", "rate": number }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseSchema and responseMimeType are NOT compatible with googleSearch in the current SDK version for this specific flow usually,
        // so we rely on the prompt to format the output as JSON within the text.
      },
    });

    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Extract sources
    const sources: GroundingSource[] = groundingChunks.map((chunk: any) => ({
      web: chunk.web
    })).filter((s: any) => s.web?.uri);

    // Extract JSON from the text
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/{[\s\S]*}/);
    
    if (!jsonMatch) {
      throw new Error("Could not parse conversion data from AI response.");
    }

    const jsonString = jsonMatch[1] || jsonMatch[0];
    const data: ConversionData = JSON.parse(jsonString);

    return { data, sources };

  } catch (error) {
    console.error("Gemini Conversion Error:", error);
    throw error;
  }
};
