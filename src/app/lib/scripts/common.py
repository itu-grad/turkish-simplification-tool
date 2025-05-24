import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../../.env.local'))

conversion_config = { 
  "model": os.getenv("OPENAI_CONFIG_MODEL"),
  "temperature": float(os.getenv("OPENAI_CONFIG_TEMP")),
  "top_p": float(os.getenv("OPENAI_CONFIG_TOP_P")),
  "max_tokens": int(os.getenv("OPENAI_CONFIG_MAX_TOKENS"))
}

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
