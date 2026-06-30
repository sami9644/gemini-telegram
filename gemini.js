const { GoogleGenAI } = require("@google/genai"); 
require("dotenv").config();

const ai = new GoogleGenAI({});

async function run(userPrompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt + "\n\nFormat your response using ONLY these basic HTML tags: <b>, <i>, <u>, <code> <a>. Do NOT use any other tags except the one i gave you not even ul or ol or li tags that's it  Use regular newlines for spaces between paragraphs. ",
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    return false;
  }
}

module.exports = { run };