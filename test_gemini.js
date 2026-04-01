const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

async function run() {
  const envContent = fs.readFileSync(".env.local", "utf8");
  const keyMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
  const apiKey = keyMatch ? keyMatch[1].trim() : "";
  
  if (!apiKey) return;

  const genAI = new GoogleGenerativeAI(apiKey);
  const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.0-pro", "gemini-pro"];
  
  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hi");
      const text = await result.response.text();
      console.log(`Success with ${modelName}:`, text);
      return; // Stop if successful
    } catch (error) {
      console.error(`Failed with ${modelName}:`, error.status);
    }
  }
}

run();
