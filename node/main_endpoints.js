/**
 * Node.js basic example of how to use the OpenAI API to create:
 * - assistant
 * - thread
 * - message
 * - run.
 * 
 * Examples taken from https://cookbook.openai.com/examples/assistants_api_overview_python
 * Full API documentation: https://platform.openai.com/docs/api-reference/assistants 
 */

const openai = require('openai');
const dotenv = require('dotenv');
dotenv.config();

// Load the environment variables from the.env file in the root.
require('dotenv').config({ path: '../.env' });

// Create an OpenAI client
const client = new openai({
  apiKey: process.env.OPENAI_API_KEY,
});

// Sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function
async function main() {
  // Create an assistant
  const assistant = await client.beta.assistants.create({
    name: "Math Tutor",
    instructions:
      "You are a personal math tutor. Answer questions briefly, in a sentence or less.",
    model: "gpt-4-1106-preview",
  });
  console.log(`The assistant object:\n${JSON.stringify(assistant, null, 2)}\n`);



  // Create a thread
  const thread = await client.beta.threads.create();
  console.log(`The thread object:\n${JSON.stringify(thread, null, 2)}\n`);

  // Create a message
  const message = await client.beta.threads.messages.create(
    thread.id,
    { role: "user", content: "I need to solve the equation `3x + 11 = 14`. Can you help me?" }
  );
  console.log(`The message object:\n${JSON.stringify(message, null, 2)}\n`);

  // Create a run
  const run = await client.beta.threads.runs.create(
    thread.id,
    { assistant_id: assistant.id }
  );
  console.log(`The run object:\n${JSON.stringify(run, null, 2)}\n`);

  // Wait for the run to complete
  let runStatus = run.status;
  let thisRun
  while (runStatus === "queued" || runStatus === "in_progress") {
    thisRun = await client.beta.threads.runs.retrieve(
      thread.id,
      run.id
    );
    runStatus = thisRun.status;
    await sleep(500);
  }

  // Get the response object
  const response = await client.beta.threads.messages.list(
    thread.id,
    { order: "asc" }
  );
  console.log(`The response object:\n${JSON.stringify(response, null, 2)}\n`);

  // Print the assistant's response
  console.log(`Assistant: ${response.data[response.data.length - 1].content[0].text.value}`);

}

main();
