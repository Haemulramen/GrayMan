import pandas as pd
import numpy as np
import torch
from transformers import BertTokenizer, BertModel

# 1. 뉴스 기사 텍스트 불러오기
# 예를 들어, CSV 파일에 뉴스 기사가 저장되어 있다고 가정합니다.
file_path = 'C:/Users/kmgdd/Documents/2024-1/오픈소스SW프로젝트/Newstrality/articles/news_articles.csv'
news_df = pd.read_csv(file_path)  # CSV 파일에서 기사 데이터를 읽어옴
texts = news_df['article_text'].tolist()  # 기사 텍스트를 리스트로 변환

# 2. 텍스트 전처리 (BERT 토크나이저 사용)
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# 3. 임베딩 모델 불러오기 (BERT 모델 사용)
model = BertModel.from_pretrained('bert-base-uncased')

# 4. 텍스트를 임베딩 벡터로 변환
def embed_text(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze().numpy()  # 문장의 평균 임베딩 벡터 추출

# 모든 텍스트를 임베딩 벡터로 변환하여 리스트에 저장
embeddings = [embed_text(text) for text in texts]

# 5. 임베딩 벡터를 저장
# numpy 배열로 변환하여 npy 파일로 저장
embeddings_array = np.array(embeddings)
np.save('news_embeddings.npy', embeddings_array)

print("임베딩 벡터 저장 완료!")
