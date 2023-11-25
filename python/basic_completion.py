import os
import json
from dotenv import load_dotenv
import openai

# Load the environment variables from the .env file in the root.
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)
openai.api_key = os.getenv('OPENAI_API_KEY')

# Create a completion
completion = openai.chat.completions.create(
  model="gpt-4-1106-preview",
  messages=[
    {"role": "system", "content": "You are a helpful assistant. Your response should be in JSON format."},
    {"role": "user", "content": "Give me the colors of the rainbow and their HSL values."}
  ],
  response_format={"type": "json_object"}
)

# Print the response
print(completion.choices[0].message.content)

# Check if the OpenAI API response is a valid JSON
def valid_json(response):
  try:
    json.loads(response)
  except ValueError as e:
    return 'Error: The response is not valid JSON.'
  return 'Pass: The response is valid JSON.'

print(is_json(completion.choices[0].message.content))