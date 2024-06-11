from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

class CreateComment():
    def __init__(self):
        self.client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
        
    def comment_moderation(self, content):
        response = self.client.moderations.create(
            input = content
        )
        flagged = response.results[0].flagged
        print(flagged)

        return flagged
