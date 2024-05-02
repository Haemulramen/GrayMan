from openai import OpenAI
from dotenv import load_dotenv
import os
import sqlite3

from articles.models import *

# .env 파일의 api_key load
load_dotenv()

class CreateNews():
    def __init__(self):
        self.client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
        
        self.base_prompt = "너는 뉴스 요약가야. 2개의 뉴스가 너에게 주어질 텐데, 한 쪽은 보수적 성향을 띠는, 다른 한 쪽은 진보적 성향을 띠는 뉴스 기사야. 너는 이 두 기사를 하나의 요약된 기사로 만들어 줘야해. 이것을 고려하여 양 쪽 기사의 편향성, 문체 등을 한 쪽으로 치우치지 않은, 중립적인 기사로 핵심적인 내용은 유지하도록 요약을 해줘 "
        
        self.bias_prompt = '''"이 기사를 읽고 다음 세 단계로 정보를 제공해줘:
        중립적 요약: 기사의 주요 내용을 중립적인 시각에서 요약해줘.
        수정된 내용: 요약을 생성하는 과정에서 제거하거나 수정한 편향적인 문장이나 단어를 나열하고, 각각에 대한 수정된 버전을 함께 제시해줘.
        수정 이유: 각 수정이나 제거를 결정한 이유를 설명해줘. 이 때, 왜 해당 부분이 편향적이라고 판단했는지 구체적인 이유를 포함시켜줘."'''
        
        self.con = sqlite3.connect("db.sqlite3")
        
    def create(self, left_news, right_news):
        prompt = self.base_prompt
        response = self.client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": f" 다음은 진보적 성향을 지닌 기사야. : {left_news}; 그리고 이건 보수적 성향을 띤 기사야. {right_news}"},
        ]
    )
        return response.choices[0].message.content
    
    
    def summarize(self, news):
        prompt = self.bias_prompt
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": f" {news}"},
        ]
    )
        return response.choices[0].message.content

    def bring_origin(self):
        cur = self.con.cursor()
        cur.execute("SELECT text from articles_article")
        return cur.fetchone()
    
    def insert_summarize(self, text):
        Summary.objects.create(
                text = text,
                correction = "test",
                reason = "test",
            ) 
            
# cn = CreateNews()

# left = cn.bring_origin()
# sum = cn.summarize(left)

# cn.insert_summarize(sum)
# 결과 : 
# 1. 뉴스 요약문:
# 제134주년 노동절을 맞은 1일, 각 정당은 노동의 가치를 존중하겠다는 입장을 밝혔다. 정희용 국민의힘 수석대변인은 논평을 통해 모든 노동자의 노고와 헌신에 감사하며, 노동의 가치가 제대로 존중받는 사회를 만들기 위한 노력을 약속했다. 또한 급변하는 국제 정세 속에서 기업의 경쟁력과 노동자 권리를 보장하기 위한 해결 과제에 대해 말하였다. 이에 대해 황정아 더불어민주당 대변인은 노동자의 행복한 삶이 민생이라며 노동자들의 땀과 눈물에 존경과 감사의 말씀을 전했다. 더불어 노동의 가치가 제대로 인정받는 사회를 만들기 위한 다양한 노력을 약속하였다.

# 2. 수정한 부분:
# "윤석열 대통령과 정부·여당은 총선 민의를 받들어 반 노동 정책을 전환하기를 바란다"라는 문장을 "논평을 통해 모든 노동자의 노고와 헌신에 감사하며, 노동의 가치가 제대로 존중받는 사회를 만들기 위한 노력을 약속했다"로 수정하였습니다. 또한 "윤석열 정부는 대한민국의 도약을 이끌어 온 노동자들의 자부심을 무너트리고 있다"라는 문장을 "노동자의 행복한 삶이 민생이라며 노동자들의 땀과 눈물에 존경과 감사의 말씀을 전했다"로 수정하였습니다.

# 3. 수정 이유:
# 기사에서 직접적으로 현재 정부와 대통령에 대한 비판이 담긴 부분은 편향된 시각을 반영하고 있어, 수정하였습니다. 또한, 구체적인 정부의 정책에 대한 비판적으로 판단되는 내용이 제시되지 않았기 때문에, 구체적인 사실을 근거로 한 판단이 아닌 주관적인 시각이 반영된 것으로 보입니다. 이를 수정하여 뉴스의 객관성을 유지하였습니다.


# 뉴스 요약, 수정한 부분, 그리고 그 이유에 대해 하나의 프롬프트로 다 작성을 요청하면 수정하지도 않은 부분에 대해 이유를 말한다. 요약문을 만들고 이를 원본과 비교하여 차이점을 알려달라하는 것이 나을듯?