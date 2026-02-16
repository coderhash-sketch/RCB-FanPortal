
import { GoogleGenAI, Type } from "@google/genai";

// Always use process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchRCBInsights = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a short, exciting fan insight or historical fact about RCB related to ${topic}. Make it punchy and bold.`
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini insights:", error);
    return "Play Bold! The 12th Man is our strength.";
  }
};

export const fetchStoryCommentary = async (title: string, narrative: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a legendary cricket commentator. Given this story beat: "${title} - ${narrative}", provide a 1-sentence legendary hype-filled commentary for the fans.`
    });
    return response.text;
  } catch (error) {
    return "History in the making! The Chinnaswamy roar echoes!";
  }
};

export const generateTriviaQuestion = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Generate a single hard trivia question about RCB history in JSON format. Include question, 4 options, and the index of the correct answer (0-3).',
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            answer: { type: Type.INTEGER }
          },
          required: ['question', 'options', 'answer']
        }
      }
    });
    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating trivia:", error);
    return {
      question: "Who holds the record for the highest individual score for RCB?",
      options: ["Virat Kohli", "Chris Gayle", "AB de Villiers", "Brendon McCullum"],
      answer: 1
    };
  }
};
