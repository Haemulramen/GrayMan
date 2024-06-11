from openai import OpenAI
from dotenv import load_dotenv
import os
import sqlite3


# .env 파일의 api_key load
load_dotenv()

class CreateNews():
    def __init__(self):
        self.client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
        
        # self.base_prompt = "너는 뉴스 요약가야. 2개의 뉴스가 너에게 주어질 텐데, 한 쪽은 보수적 성향을 띠는, 다른 한 쪽은 진보적 성향을 띠는 뉴스 기사야. 너는 이 두 기사를 하나의 요약된 기사로 만들어 줘야해. 이것을 고려하여 양 쪽 기사의 편향성, 문체 등을 한 쪽으로 치우치지 않은, 중립적인 기사로 핵심적인 내용은 유지하도록 요약을 해줘 "
        
        self.summarize_prompt = """ 너는 사용자가 주는 뉴스를 읽고 요약을 해야 해. 단, 편향적인 부분을 중립적으로 수정하거나 삭제하여 사용자가 너가 해준 요약본을 읽고 
        어떤 편향적인 생각이 생기면 안되도록 해야해. 이 조건을 지켜서 사용자가 준 뉴스 기사를 요약해줘.
        """
        
        self.correction_prompt = """사용자는 너에게 뉴스 기사 원문과 그 뉴스 기사를 중립적으로 요약한 요약문 두 가지 텍스트를 너에게 줄거야. 너는 그 두 글의 차이를 보고 어느 부분이 어떻게 중립적으로 요약이 되어서 요약문에 수정이나 삭제가 발생했는지 알려줘.
        """
        
        self.reason_prompt = '''"이 기사를 읽고 다음 세 단계로 정보를 제공해줘:
        중립적 요약: 기사의 주요 내용을 중립적인 시각에서 요약해줘.
        수정된 내용: 요약을 생성하는 과정에서 제거하거나 수정한 편향적인 문장이나 단어를 나열하고, 각각에 대한 수정된 버전을 함께 제시해줘.
        수정 이유: 각 수정이나 제거를 결정한 이유를 설명해줘. 이 때, 왜 해당 부분이 편향적이라고 판단했는지 구체적인 이유를 포함시켜줘."'''
        
        self.con = sqlite3.connect("db.sqlite3")
        
    # def create(self, left_news, right_news):
    #     prompt = self.base_prompt
    #     response = self.client.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    #         {"role": "system", "content": prompt},
    #         {"role": "user", "content": f" 다음은 진보적 성향을 지닌 기사야. : {left_news}; 그리고 이건 보수적 성향을 띤 기사야. {right_news}"},
    #     ]
    # )
    #     return response.choices[0].message.content
    
    
    def summarize(self, news):
        prompt = self.summarize_prompt
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": f" {news}"},
        ]
    )
        return response.choices[0].message.content

    def correction(self, origin_news, summarize_news):
        prompt = self.correction_prompt
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": f" 다음은 원본 뉴스야. {origin_news} 그리고 이 두 번째 글은 내가 준 원본 뉴스를 편향성을 제거하거나 수정하여 요약한 요약본이야.{summarize_news}. 이 둘의 차이를 분석하여 어느 부분이 편향성을 띠어서 수정되고 삭제가 되었는지 알려줘. 형식은 1. 원본 뉴스의 문장 2. 수정된 부분 3. 수정된 이유를 나열해줘."},
        ]
    )
        return response.choices[0].message.content