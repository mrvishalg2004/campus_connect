const fs = require("fs");

async function run() {
  const envContent = fs.readFileSync(".env.local", "utf8");
  const keyMatch = envContent.match(/OPENROUTER_API_KEY=(.*)/);
  const apiKey = keyMatch ? keyMatch[1].trim() : "";
  
  if (!apiKey) return;

  const modelsToTest = [
    "meta-llama/llama-3.2-3b-instruct:free",
    "google/gemma-3-12b-it:free",
    "google/gemma-3-27b-it:free"
  ];

  for (const model of modelsToTest) {
    console.log("Testing:", model);
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: "Hi" }]
      })
    });

    if (response.ok) {
      console.log(`✅ Success with ${model}`);
      return;
    } else {
      console.log(`❌ Failed ${model}: ${response.status}`);
    }
  }
}

run();
