import sqlite3
from utils import CreateNews


cn = CreateNews()
con = sqlite3.connect("db.sqlite3")
cur = con.cursor()
string = '''
1. 원본 뉴스의 문장: "안채환 충북대 총학생회장은 '통합 저지가 학생회의 가장 큰 목표'라며 '통합을 막을 수 없더라도, 교명 등 충북대의 정체성을 지키기 위해 강경히 맞설 것'이라고 말했다."
   수정된 부분: 이 문장은 요약 본에서 삭제된 부분이다.
   수정된 이유: 특정 사람의 의견을 인용한 것으로, 이 부분은 청중에게 어느 한 쪽으로 치우치게 만들 수 있다.

2. 원본 뉴스의 문장: "금오공대, 한국교원대-청주교대 등은 글로컬 사업에 참여하기 위해 통합을 시도하다가 학생들의 반발에 부딪혀 계획을 철회했다."
   수정된 부분: "글로컬 대학 30' 사업 참여를 위한 통합이 이야기되는 대학간에는 충북대와 교통대 간만의 문제가 아니라 학생과 대학 간의 견해차와 반발이 지속적으로 나타나고 있습니다."
   수정된 이유: 원문의 문장은 특정 대학들이 통합을 시도하다가 실패했다는 내용을 담고 있어, 부정적인 인상을 줄 수 있다. 수정된 문장은 통합 과정에서 견해차와 반발이 존재한다는 점만을 전달하여, 중립적인 관점을 보여준다.

3. 원본 뉴스의 문장: "일부 충북대 학생들이 교통대를 비하하는 글을 올리기 시작했다"
   수정된 부분: "일부 충북대 학생들이 교통대를 인터넷과 SNS 상에서 비난하였고, 이 점이 교통대 신입생 및 기존 학생들에게 큰 상처를 주었습니다."
   수정된 이유: 원문의 문장은 한 쪽이 다른 쪽을 "비하"했다고 명시적으로 표현하고 있다. 하지만 수정된 문장에서는 그 행동을 "비난"이라고 표현하며, 그 결과에 초점을 맞추어 중립적인 표현을 사용했다.
   
논의가 단편적인 특정 사람이나 그룹을 빼고 뉴스의 주요 내용을 다루는 방식으로 요약 글이 수정되어 중립적인 입장을 유지할 수 있었다. 이렇게 해서 다양한 의견의 여부를 확인하고 갈등을 야기하는 요소를 최소화하는 방안을 강구했다.'''
cur.execute("UPDATE articles_summary SET correction = ? WHERE origin_id = ?", (string, 18))
con.commit()
# cur.execute("SELECT id, text from articles_article")
# rows = cur.fetchall()

# for row in rows:
#     row_id = row[0]
#     if row_id <= 14:
#         continue
#     text = row[1]
#     sum = cn.summarize(text)
#     correction = cn.correction(text, sum)
#     cur.execute("INSERT INTO articles_summary (text, correction, origin_id) VALUES (?, ?, ?)", (sum, correction, row_id))
#     con.commit()
# con.close()