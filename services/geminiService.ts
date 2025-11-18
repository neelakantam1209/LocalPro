import { GoogleGenAI } from "@google/genai";

// Per coding guidelines, initialize with process.env.API_KEY directly and assume it's available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCategoryTip(categoryName: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a single, short, and helpful tip for a user looking to hire a ${categoryName}. The tip should be concise and practical. For example, for a plumber, you might say: 'Before they leave, ask them to double-check for any small leaks.'`,
      config: {
        temperature: 0.7,
        // Per coding guidelines, removed maxOutputTokens for gemini-2.5-flash when not using thinkingBudget
        // to avoid potential empty responses. It is not necessary for this short prompt.
      }
    });

    const tip = response.text;
    
    if (!tip) {
      return `When hiring a ${categoryName}, always check their past reviews and ask for a quote upfront.`;
    }

    // Clean up the text, remove quotes if any
    return tip.replace(/["']/g, '');

  } catch (error) {
    console.error(`Error fetching tip from Gemini API:`, error);
    // Provide a sensible fallback
    return `When hiring a ${categoryName}, always check their past reviews and ask for a quote upfront.`;
  }
}
