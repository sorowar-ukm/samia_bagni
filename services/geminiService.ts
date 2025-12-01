
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateScienceResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    throw new Error("API Key is missing. Please configure the environment variable.");
  }

  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a friendly, encouraging, and knowledgeable science assistant for Samia Farhana Zarin's portfolio. You answer questions about science, or questions about Samia based on her portfolio context if provided. Keep answers concise (under 80 words) and inspiring.",
      }
    });

    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to the science assistant.");
  }
};

export const generateScienceImage = async (prompt: string): Promise<string | null> => {
  if (!ai) {
    throw new Error("API Key is missing.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw new Error("Failed to generate image.");
  }
};
