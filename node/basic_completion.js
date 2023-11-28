// Load the environment variables from the.env file in the root.
require('dotenv').config({ path: '../.env' });

const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const completion = await client.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Your response should be in JSON format.",
      },
      { role: "user", content: "Give me the colors of the rainbow and their HSL values." },
    ],
    response_format: { type: "json_object" },
  });

  console.log(completion.choices[0].message.content);

  // Check if the OpenAI API response is a valid JSON
  const validJSON = (response) => {
    try {
      JSON.parse(response);
      return 'Pass: The response is valid JSON.';
    } catch (e) {
      return 'Error: The response is not valid JSON.';
    }
  };

  console.log(validJSON(completion.choices[0].message.content));
}

main();