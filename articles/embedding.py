from openai import OpenAI
import sqlite3
from sklearn.metrics.pairwise import cosine_similarity
import os
from dotenv import load_dotenv

load_dotenv()

# OpenAI API 키 설정
api_key = os.environ['OPENAI_API_KEY']
client = OpenAI(api_key=api_key)

# 데이터베이스 연결 및 뉴스 원문 가져오기
def fetch_articles_from_db():
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute("SELECT id, title FROM articles_article")
    articles = cursor.fetchall()
    conn.close()
    return articles

# GPT-3를 사용하여 기사 임베딩 생성
def get_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    return response.data[0].embedding

# 모든 기사 임베딩
def generate_article_embeddings(articles):
    embeddings = {}
    for article in articles:
        article_id, title = article
        embeddings[article_id] = get_embedding(title)
    return embeddings

# 질문에 대한 답변 생성
def answer_question(question, article_embeddings):
    question_embedding = get_embedding(question)
    
    # 코사인 유사도를 계산하여 가장 유사한 기사 선택
    similarities = []
    for article_id, embedding in article_embeddings.items():
        similarity = cosine_similarity(
            [question_embedding], 
            [embedding]
        )[0][0]
        similarities.append((similarity, article_id))
    # 유사도가 가장 높은 기사 선택
    print(similarities)
    most_similar_article = max(similarities, key=lambda x: x[0])
    article_id = most_similar_article[1]
    similar_rate = most_similar_article[0]
    print(similar_rate)
    if(similar_rate < 0.3):
        return "기사와 상관이 없는 질문입니다."
    # 선택된 기사 원문 가져오기
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute("SELECT text FROM articles_article WHERE id=?", (article_id,))
    article_text = cursor.fetchone()[0]
    conn.close()
    # GPT-3를 사용하여 질문에 대한 답변 생성
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role" : "system", "content": f"원본 뉴스는 {article_text}야. 이 글을 참고하여 사용자의 대답에 응답을 주면 돼."},
            {"role": "user", "content": f"{question}"}
            ]
    )
    return response.choices[0].message.content

# 메인 함수
def get_result(user_question):
    articles = fetch_articles_from_db()
    article_embeddings = generate_article_embeddings(articles)
    answer = answer_question(user_question, article_embeddings)
    return answer
# if __name__ == "__main__":
#     main()
