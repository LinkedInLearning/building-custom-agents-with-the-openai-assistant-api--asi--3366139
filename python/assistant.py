import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from IPython.display import display

# Helper function to display JSON
def show_json(obj):
    display(json.loads(obj.model_dump_json()))

# Load the environment variables from the .env file in the root.
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

# Create an OpenAI client
client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key=os.getenv('OPENAI_API_KEY'),
)

# Create an assistant
assistant = client.beta.assistants.create(
    name="Math Tutor",
    instructions="You are a personal math tutor. Answer questions briefly, in a sentence or less.",
    model="gpt-4-1106-preview",
)
show_json(assistant)
print(assistant)