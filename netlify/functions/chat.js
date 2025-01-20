const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = "AIzaSyBcYbYchVdAN9orLzTdd0HeN07om5enQdc";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

exports.handler = async (event) => {
  try {
    // URL'den prompt'u al
    const path = event.path;
    const prompt = path.split('/').pop();

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Prompt gerekli" })
      };
    }

    // Gemini modelini başlat
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Yanıt al
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: true,
        prompt: prompt,
        model: "Google/Gemini-Pro",
        response: text,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
}; 